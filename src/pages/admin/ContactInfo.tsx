import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, Github, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ContactInfoData {
  id: string;
  phone: string;
  email: string;
  location: string;
  work_hours: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  github_url: string;
}

const ContactInfo: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfoData>({
    id: '',
    phone: '',
    email: '',
    location: '',
    work_hours: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    linkedin_url: '',
    github_url: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        setContactInfo(data);
      }
    } catch (error: any) {
      console.error('Error fetching contact info:', error);
      setMessage({ type: 'error', text: 'Ma\'lumotlarni yuklashda xatolik yuz berdi' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('contact_info')
        .update({
          phone: contactInfo.phone,
          email: contactInfo.email,
          location: contactInfo.location,
          work_hours: contactInfo.work_hours,
          facebook_url: contactInfo.facebook_url,
          instagram_url: contactInfo.instagram_url,
          twitter_url: contactInfo.twitter_url,
          linkedin_url: contactInfo.linkedin_url,
          github_url: contactInfo.github_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', contactInfo.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Kontakt ma\'lumotlari muvaffaqiyatli yangilandi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating contact info:', error);
      setMessage({ type: 'error', text: 'Yangilashda xatolik: ' + error.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kontakt Ma'lumotlari</h1>
          <p className="text-gray-600">Website'dagi kontakt ma'lumotlarini tahrirlang</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Contact Information */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Asosiy Ma'lumotlar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className={labelClasses}>
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefon Raqam
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="+998 99 534 03 13"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Manzil
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="dev.dilshodjon@gmail.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className={labelClasses}>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Manzil
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={contactInfo.location}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="Toshkent, O'zbekiston"
                  required
                />
              </div>

              <div>
                <label htmlFor="work_hours" className={labelClasses}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Ish Vaqti
                </label>
                <input
                  type="text"
                  id="work_hours"
                  name="work_hours"
                  value={contactInfo.work_hours}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="Dush-Jum 9:00 dan 18:00 gacha"
                  required
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Ijtimoiy Tarmoqlar
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="facebook_url" className={labelClasses}>
                  <Facebook className="w-4 h-4 inline mr-2 text-blue-600" />
                  Facebook URL
                </label>
                <input
                  type="url"
                  id="facebook_url"
                  name="facebook_url"
                  value={contactInfo.facebook_url}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="https://facebook.com/username"
                />
              </div>

              <div>
                <label htmlFor="instagram_url" className={labelClasses}>
                  <Instagram className="w-4 h-4 inline mr-2 text-pink-600" />
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram_url"
                  name="instagram_url"
                  value={contactInfo.instagram_url}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label htmlFor="twitter_url" className={labelClasses}>
                  <Twitter className="w-4 h-4 inline mr-2 text-sky-500" />
                  Twitter/X URL
                </label>
                <input
                  type="url"
                  id="twitter_url"
                  name="twitter_url"
                  value={contactInfo.twitter_url}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label htmlFor="linkedin_url" className={labelClasses}>
                  <Linkedin className="w-4 h-4 inline mr-2 text-blue-700" />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin_url"
                  name="linkedin_url"
                  value={contactInfo.linkedin_url}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label htmlFor="github_url" className={labelClasses}>
                  <Github className="w-4 h-4 inline mr-2 text-gray-800" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="github_url"
                  name="github_url"
                  value={contactInfo.github_url}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
            >
              {isSaving ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>O'zgarishlarni Saqlash</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
