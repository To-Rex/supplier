import React, { useState, useEffect } from 'react';
import { Mail, Eye, CheckCircle, Archive, Trash2, Search, Filter, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../contexts/ThemeContext';
import { typography, getTextColors } from '../../utils/typography';
import AdminLayout from '../../components/admin/AdminLayout';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (err) {
      console.error('Error updating message status:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const saveAdminNotes = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ admin_notes: adminNotes, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      alert('Izohlar saqlandi!');
      fetchMessages();
      if (selectedMessage) {
        setSelectedMessage({ ...selectedMessage, admin_notes: adminNotes });
      }
    } catch (err) {
      console.error('Error saving admin notes:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Rostdan ham bu xabarni o\'chirmoqchimisiz?')) return;

    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);

      if (error) throw error;

      alert('Xabar o\'chirildi!');
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setAdminNotes(message.admin_notes);

    if (message.status === 'new') {
      await updateMessageStatus(message.id, 'read');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ContactMessage['status']) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    const labels = {
      new: 'Yangi',
      read: 'O\'qilgan',
      replied: 'Javob berilgan',
      archived: 'Arxivlangan',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const stats = {
    total: messages.length,
    new: messages.filter((m) => m.status === 'new').length,
    read: messages.filter((m) => m.status === 'read').length,
    replied: messages.filter((m) => m.status === 'replied').length,
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
            <h1 className={`${typography.h1} ${textColors.primary} mb-2`}>Xabarlar</h1>
            <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
              Foydalanuvchi xabarlarini boshqarish
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Jami', value: stats.total, color: 'blue' },
            { label: 'Yangi', value: stats.new, color: 'green' },
            { label: 'O\'qilgan', value: stats.read, color: 'yellow' },
            { label: 'Javob berilgan', value: stats.replied, color: 'purple' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 shadow-lg ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}
            >
              <p className={`${typography.cardSubtitle} ${textColors.secondary} mb-2`}>{stat.label}</p>
              <p className={`${typography.h2} ${textColors.primary}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className={`rounded-xl p-4 shadow-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">Barchasi</option>
                    <option value="new">Yangi</option>
                    <option value="read">O'qilgan</option>
                    <option value="replied">Javob berilgan</option>
                    <option value="archived">Arxivlangan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg overflow-hidden ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageSquare className={`w-12 h-12 mx-auto mb-3 ${textColors.secondary}`} />
                    <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
                      Xabarlar topilmadi
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => openMessage(msg)}
                      className={`p-4 border-b cursor-pointer transition-colors ${
                        isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'
                      } ${selectedMessage?.id === msg.id ? (isDark ? 'bg-gray-700' : 'bg-blue-50') : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className={`${typography.cardTitle} ${textColors.primary} mb-1`}>
                            {msg.name}
                          </h3>
                          <p className={`${typography.cardSubtitle} text-blue-600 mb-1`}>
                            {msg.subject}
                          </p>
                        </div>
                        {getStatusBadge(msg.status)}
                      </div>
                      <p className={`${typography.bodySmall} ${textColors.secondary} line-clamp-2`}>
                        {msg.message}
                      </p>
                      <p className={`${typography.bodySmall} ${textColors.secondary} mt-2`}>
                        {new Date(msg.created_at).toLocaleString('uz-UZ')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className={`rounded-xl p-6 shadow-lg ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className={`${typography.h2} ${textColors.primary} mb-2`}>
                      {selectedMessage.name}
                    </h2>
                    <p className={`${typography.bodyLarge} text-blue-600 mb-1`}>
                      {selectedMessage.email}
                    </p>
                    {selectedMessage.phone && (
                      <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
                        {selectedMessage.phone}
                      </p>
                    )}
                  </div>
                  {getStatusBadge(selectedMessage.status)}
                </div>

                <div className="mb-6">
                  <h3 className={`${typography.cardTitle} ${textColors.primary} mb-2`}>Mavzu</h3>
                  <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
                    {selectedMessage.subject}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className={`${typography.cardTitle} ${textColors.primary} mb-2`}>Xabar</h3>
                  <p className={`${typography.bodyLarge} ${textColors.secondary} whitespace-pre-wrap`}>
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className={`${typography.cardTitle} ${textColors.primary} mb-2`}>Admin Izohlar</h3>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Ichki izohlaringizni yozing..."
                  />
                  <button
                    onClick={() => saveAdminNotes(selectedMessage.id)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Izohlarni Saqlash
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    O'qilgan
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Javob berilgan
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Archive className="w-4 h-4" />
                    Arxivlash
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    O'chirish
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className={`${typography.bodySmall} ${textColors.secondary}`}>
                    Yaratilgan: {new Date(selectedMessage.created_at).toLocaleString('uz-UZ')}
                  </p>
                  <p className={`${typography.bodySmall} ${textColors.secondary}`}>
                    Yangilangan: {new Date(selectedMessage.updated_at).toLocaleString('uz-UZ')}
                  </p>
                </div>
              </div>
            ) : (
              <div className={`rounded-xl p-12 shadow-lg flex items-center justify-center ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <div className="text-center">
                  <Mail className={`w-16 h-16 mx-auto mb-4 ${textColors.secondary}`} />
                  <p className={`${typography.h3} ${textColors.primary} mb-2`}>
                    Xabar tanlanmagan
                  </p>
                  <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
                    Tafsilotlarini ko'rish uchun chap tomondagi xabarni tanlang
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactMessages;
