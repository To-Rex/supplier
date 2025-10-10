import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase, TeamMember } from '../../lib/supabase';
import { useTheme } from '../../contexts/ThemeContext';
import { typography, getTextColors } from '../../utils/typography';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';

const TeamManagement: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    expertise: '',
    image_url: '',
    bio: '',
    display_order: 0,
    slug: '',
    meta_title: '',
    meta_description: '',
    keywords: '',
  });
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data) setMembers(data);
    } catch (err) {
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url) {
      alert('Iltimos, rasm yuklang!');
      return;
    }

    try {
      const maxOrderResult = await supabase
        .from('team_members')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);

      const nextOrder = maxOrderResult.data && maxOrderResult.data.length > 0
        ? maxOrderResult.data[0].display_order + 1
        : 1;

      const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const { error } = await supabase.from('team_members').insert([
        {
          ...formData,
          expertise: formData.expertise.split(',').map((s) => s.trim()),
          keywords: formData.keywords.split(',').map((s) => s.trim()).filter(Boolean),
          slug,
          meta_title: formData.meta_title || `${formData.name} - ${formData.role} | Torex`,
          meta_description: formData.meta_description || formData.bio,
          display_order: nextOrder,
          is_active: true,
        },
      ]);

      if (error) throw error;

      setShowAddForm(false);
      setFormData({ name: '', role: '', expertise: '', image_url: '', bio: '', display_order: 0, slug: '', meta_title: '', meta_description: '', keywords: '' });
      fetchMembers();
    } catch (err) {
      console.error('Error adding member:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const member = members.find((m) => m.id === id);
      if (!member) return;

      const expertiseArray = typeof member.expertise === 'string'
        ? member.expertise.split(',').map((s) => s.trim())
        : member.expertise;

      const keywordsArray = typeof member.keywords === 'string'
        ? member.keywords.split(',').map((s) => s.trim()).filter(Boolean)
        : member.keywords;

      const { error } = await supabase
        .from('team_members')
        .update({
          name: member.name,
          role: member.role,
          expertise: expertiseArray,
          image_url: member.image_url,
          bio: member.bio,
          display_order: member.display_order,
          slug: member.slug,
          meta_title: member.meta_title,
          meta_description: member.meta_description,
          keywords: keywordsArray,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      fetchMembers();
    } catch (err) {
      console.error('Error updating member:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Rostdan ham o\'chirmoqchimisiz?')) return;

    try {
      const { error } = await supabase.from('team_members').delete().eq('id', id);

      if (error) throw error;
      fetchMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const handleFieldChange = (id: string, field: keyof TeamMember, value: any) => {
    setMembers(
      members.map((m) =>
        m.id === id
          ? { ...m, [field]: value }
          : m
      )
    );
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
            <h1 className={`${typography.h1} ${textColors.primary} mb-2`}>Jamoa A'zolari</h1>
            <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
              Jamoa a'zolarini boshqarish
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Yangi Qo'shish
          </button>
        </div>

        {showAddForm && (
          <div className={`rounded-xl p-6 shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`${typography.h2} ${textColors.primary} mb-4`}>Yangi A'zo Qo'shish</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    Ism
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    Lavozim
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                    Mutaxassislik (vergul bilan ajrating)
                  </label>
                  <input
                    type="text"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="React, Node.js, TypeScript"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <ImageUpload
                    currentImage={formData.image_url}
                    onImageChange={(url) => setFormData({ ...formData, image_url: url })}
                    label="Jamoa a'zosining rasmi"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    Biografiya
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    rows={3}
                  />
                </div>
                <div>
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="aziz-rahimov (auto-generate from name)"
                  />
                </div>
                <div>
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    SEO Keywords (vergul bilan)
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="developer, react, typescript"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Auto-generate: Name - Role | Torex"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                    SEO Meta Description
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    rows={2}
                    placeholder="Auto-generate from bio"
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
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className={`rounded-xl p-6 shadow-lg ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}
            >
              {editingId === member.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Ism
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleFieldChange(member.id, 'name', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Lavozim
                      </label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleFieldChange(member.id, 'role', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Mutaxassislik (vergul bilan)
                      </label>
                      <input
                        type="text"
                        value={Array.isArray(member.expertise) ? member.expertise.join(', ') : member.expertise}
                        onChange={(e) => handleFieldChange(member.id, 'expertise', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Tartib raqami
                      </label>
                      <input
                        type="number"
                        value={member.display_order}
                        onChange={(e) => handleFieldChange(member.id, 'display_order', parseInt(e.target.value))}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
                        Biografiya
                      </label>
                      <textarea
                        value={member.bio}
                        onChange={(e) => handleFieldChange(member.id, 'bio', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        rows={3}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <ImageUpload
                        currentImage={member.image_url}
                        onImageChange={(url) => handleFieldChange(member.id, 'image_url', url)}
                        label="Jamoa a'zosining rasmi"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(member.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Saqlash
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Bekor qilish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className={`${typography.cardTitle} ${textColors.primary} mb-1`}>
                        {member.name}
                      </h3>
                      <p className={`${typography.cardSubtitle} text-blue-600 mb-2`}>
                        {member.role}
                      </p>
                      <p className={`${typography.bodySmall} ${textColors.secondary}`}>
                        {member.expertise.join(' • ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(member.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

export default TeamManagement;
