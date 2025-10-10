import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('contact_messages').insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Xabar yuborishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`${typography.h2} ${textColors.primary} mb-4`}>
            Biz Bilan Bog'laning
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-3xl mx-auto`}>
            Savol yoki takliflaringiz bo'lsa, biz bilan bog'laning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className={`flex items-start space-x-4 p-6 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`text-lg font-semibold ${textColors.primary} mb-2`}>Telefon</h3>
                <p className={textColors.secondary}>+998 90 123 45 67</p>
              </div>
            </div>
            <div className={`flex items-start space-x-4 p-6 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`text-lg font-semibold ${textColors.primary} mb-2`}>Email</h3>
                <p className={textColors.secondary}>info@torexdev.uz</p>
              </div>
            </div>
            <div className={`flex items-start space-x-4 p-6 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className={`text-lg font-semibold ${textColors.primary} mb-2`}>Manzil</h3>
                <p className={textColors.secondary}>Toshkent, O'zbekiston</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              required
              placeholder="Ismingiz"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-6 py-4 rounded-xl border-2 transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:border-blue-600 focus:outline-none`}
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-6 py-4 rounded-xl border-2 transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:border-blue-600 focus:outline-none`}
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-6 py-4 rounded-xl border-2 transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:border-blue-600 focus:outline-none`}
            />
            <input
              type="text"
              required
              placeholder="Mavzu"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={`w-full px-6 py-4 rounded-xl border-2 transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:border-blue-600 focus:outline-none`}
            />
            <textarea
              required
              rows={4}
              placeholder="Xabaringiz"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-6 py-4 rounded-xl border-2 transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:border-blue-600 focus:outline-none`}
            />

            {success && (
              <div className="p-4 rounded-xl bg-green-100 text-green-700 text-center">
                Xabaringiz muvaffaqiyatli yuborildi!
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span className="font-semibold">Yuborish</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
