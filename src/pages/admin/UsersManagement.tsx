import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, UserCheck, UserX } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../contexts/ThemeContext';
import { typography, getTextColors } from '../../utils/typography';
import AdminLayout from '../../components/admin/AdminLayout';

interface AdminUser {
  id: string;
  username: string;
  full_name: string;
  email: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
  });
  const [editFormData, setEditFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
  });
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!');
      return;
    }

    try {
      const { error } = await supabase.from('admin_users').insert([
        {
          username: formData.username,
          password_hash: formData.password,
          full_name: formData.full_name,
          email: formData.email,
          is_active: true,
        },
      ]);

      if (error) throw error;

      setShowAddForm(false);
      setFormData({ username: '', password: '', full_name: '', email: '' });
      alert('Admin muvaffaqiyatli qo\'shildi!');
      fetchUsers();
    } catch (err: any) {
      console.error('Error adding user:', err);
      if (err.message?.includes('duplicate')) {
        alert('Bu login yoki email allaqachon mavjud!');
      } else {
        alert('Xatolik yuz berdi!');
      }
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updateData: any = {
        username: editFormData.username,
        full_name: editFormData.full_name,
        email: editFormData.email,
        updated_at: new Date().toISOString(),
      };

      if (editFormData.password) {
        if (editFormData.password.length < 6) {
          alert('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!');
          return;
        }
        updateData.password_hash = editFormData.password;
      }

      const { error } = await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      setEditFormData({ username: '', password: '', full_name: '', email: '' });
      alert('Ma\'lumotlar muvaffaqiyatli yangilandi!');
      fetchUsers();
    } catch (err: any) {
      console.error('Error updating user:', err);
      if (err.message?.includes('duplicate')) {
        alert('Bu login yoki email allaqachon mavjud!');
      } else {
        alert('Xatolik yuz berdi!');
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchUsers();
    } catch (err) {
      console.error('Error toggling user status:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const handleDelete = async (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;

    if (!confirm(`Rostdan ham "${user.full_name}" ni o\'chirmoqchimisiz? Bu amalni bekor qilib bo\'lmaydi!`)) return;

    try {
      const { error } = await supabase.from('admin_users').delete().eq('id', id);

      if (error) throw error;
      alert('Admin muvaffaqiyatli o\'chirildi!');
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const startEditing = (user: AdminUser) => {
    setEditingId(user.id);
    setEditFormData({
      username: user.username,
      password: '',
      full_name: user.full_name,
      email: user.email,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({ username: '', password: '', full_name: '', email: '' });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-4 ${typography.bodyLarge} ${textColors.secondary}`}>Yuklanmoqda...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`${typography.h1} ${textColors.primary} mb-2`}>Adminlar</h1>
            <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
              Admin foydalanuvchilarni boshqarish
            </p>
          </div>
          <button
            onClick={() => {
              setShowAddForm(true);
              setFormData({ username: '', password: '', full_name: '', email: '' });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Yangi Admin
          </button>
        </div>

        {showAddForm && (
          <div className={`rounded-xl p-6 shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`${typography.h2} ${textColors.primary} mb-4`}>Yangi Admin Qo'shish</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    Login
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    Parol
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    To'liq ism
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ username: '', password: '', full_name: '', email: '' });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`rounded-xl p-6 shadow-lg ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}
            >
              {editingId === user.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Login
                      </label>
                      <input
                        type="text"
                        value={editFormData.username}
                        onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Yangi Parol (ixtiyoriy)
                      </label>
                      <input
                        type="password"
                        value={editFormData.password}
                        onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="Bo'sh qoldiring, o'zgarishsiz qoladi"
                      />
                    </div>
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        To'liq ism
                      </label>
                      <input
                        type="text"
                        value={editFormData.full_name}
                        onChange={(e) => setEditFormData({ ...editFormData, full_name: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(user.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Saqlash
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Bekor qilish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className={`${typography.cardTitle} ${textColors.primary}`}>
                          {user.full_name}
                        </h3>
                        <p className={`${typography.cardSubtitle} text-blue-600`}>
                          @{user.username}
                        </p>
                      </div>
                      {user.is_active ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Aktiv
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                          Nofaol
                        </span>
                      )}
                    </div>
                    <p className={`${typography.bodySmall} ${textColors.secondary}`}>
                      Email: {user.email}
                    </p>
                    {user.last_login && (
                      <p className={`${typography.bodySmall} ${textColors.secondary}`}>
                        Oxirgi kirish: {new Date(user.last_login).toLocaleString('uz-UZ')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(user.id, user.is_active)}
                      className={`p-2 rounded-lg transition-colors ${
                        user.is_active
                          ? 'text-orange-600 hover:bg-orange-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={user.is_active ? 'Nofaol qilish' : 'Faollashtirish'}
                    >
                      {user.is_active ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => startEditing(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersManagement;
