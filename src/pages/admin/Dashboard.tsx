import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Calendar, Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, Github, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../contexts/ThemeContext';
import { typography, getTextColors } from '../../utils/typography';
import AdminLayout from '../../components/admin/AdminLayout';

interface StatsSummary {
  stat_date: string;
  total_visits: number;
  unique_visitors: number;
  page_views: Record<string, number>;
}

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

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalTeamMembers, setTotalTeamMembers] = useState(0);
  const [totalPortfolio, setTotalPortfolio] = useState(0);
  const [totalBlogPosts, setTotalBlogPosts] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
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
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [statsResult, teamResult, portfolioResult, blogResult, messagesResult, contactResult] = await Promise.all([
        supabase
          .from('site_stats_summary')
          .select('*')
          .order('stat_date', { ascending: false })
          .limit(7),
        supabase
          .from('team_members')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true),
        supabase
          .from('portfolio')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true),
        supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('contact_info')
          .select('*')
          .maybeSingle()
      ]);

      if (statsResult.data) setStats(statsResult.data);
      if (teamResult.count !== null) setTotalTeamMembers(teamResult.count);
      if (portfolioResult.count !== null) setTotalPortfolio(portfolioResult.count);
      if (blogResult.count !== null) setTotalBlogPosts(blogResult.count);
      if (messagesResult.count !== null) setTotalMessages(messagesResult.count);
      if (contactResult.data) {
        setContactInfo(contactResult.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (contactInfo.id) {
        const updateData = {
          phone: contactInfo.phone,
          email: contactInfo.email,
          location: contactInfo.location,
          work_hours: contactInfo.work_hours,
          facebook_url: contactInfo.facebook_url || '',
          instagram_url: contactInfo.instagram_url || '',
          twitter_url: contactInfo.twitter_url || '',
          linkedin_url: contactInfo.linkedin_url || '',
          github_url: contactInfo.github_url || '',
          updated_at: new Date().toISOString(),
          updated_by: user?.id || null
        };

        console.log('Updating contact info:', updateData);

        const { data, error } = await supabase
          .from('contact_info')
          .update(updateData)
          .eq('id', contactInfo.id)
          .select();

        console.log('Update result:', { data, error });

        if (error) throw error;
        if (data && data.length > 0) setContactInfo(data[0]);
      } else {
        const insertData = {
          phone: contactInfo.phone,
          email: contactInfo.email,
          location: contactInfo.location,
          work_hours: contactInfo.work_hours,
          facebook_url: contactInfo.facebook_url || '',
          instagram_url: contactInfo.instagram_url || '',
          twitter_url: contactInfo.twitter_url || '',
          linkedin_url: contactInfo.linkedin_url || '',
          github_url: contactInfo.github_url || '',
          updated_by: user?.id || null
        };

        console.log('Inserting contact info:', insertData);

        const { data, error } = await supabase
          .from('contact_info')
          .insert(insertData)
          .select()
          .single();

        console.log('Insert result:', { data, error });

        if (error) throw error;
        if (data) setContactInfo(data);
      }

      setMessage({ type: 'success', text: 'Kontakt ma\'lumotlari muvaffaqiyatli saqlandi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error saving contact info:', error);
      setMessage({ type: 'error', text: 'Saqlashda xatolik: ' + error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const getTodayStats = () => {
    if (stats.length === 0) return { visits: 0, visitors: 0 };
    return {
      visits: stats[0].total_visits,
      visitors: stats[0].unique_visitors,
    };
  };

  const getWeekTotal = () => {
    return stats.reduce((sum, day) => sum + day.total_visits, 0);
  };

  const todayStats = getTodayStats();
  const weekTotal = getWeekTotal();

  const summaryCards = [
    {
      title: 'Jamoa A\'zolari',
      value: totalTeamMembers,
      icon: Users,
      color: 'blue',
      description: 'Faol a\'zolar',
    },
    {
      title: 'Portfolio Loyihalar',
      value: totalPortfolio,
      icon: TrendingUp,
      color: 'green',
      description: 'Jami loyihalar',
    },
    {
      title: 'Blog Postlari',
      value: totalBlogPosts,
      icon: Calendar,
      color: 'teal',
      description: 'Nashr etilgan',
    },
    {
      title: 'Xabarlar',
      value: totalMessages,
      icon: Eye,
      color: 'orange',
      description: 'Kelgan xabarlar',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      teal: 'from-teal-500 to-teal-600',
      orange: 'from-orange-500 to-orange-600',
    };
    return colors[color] || colors.blue;
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
        <div>
          <h1 className={`${typography.h1} ${textColors.primary} mb-2`}>Dashboard</h1>
          <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
            Sayt statistikasi va umumiy ma'lumotlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getColorClasses(card.color)}`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className={`${typography.h2} ${textColors.primary} mb-1`}>{card.value.toLocaleString()}</h3>
              <p className={`${typography.cardSubtitle} ${textColors.primary} font-semibold`}>{card.title}</p>
              <p className={`${typography.bodySmall} ${textColors.secondary} mt-1`}>{card.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-xl p-6 shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`${typography.h2} ${textColors.primary} mb-6`}>So'nggi 7 Kunlik Statistika</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-2 ${typography.cardSubtitle} ${textColors.primary}`}>Sana</th>
                    <th className={`text-right py-3 px-2 ${typography.cardSubtitle} ${textColors.primary}`}>Tashriflar</th>
                    <th className={`text-right py-3 px-2 ${typography.cardSubtitle} ${textColors.primary}`}>Foydalanuvchilar</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((day, index) => (
                    <tr
                      key={index}
                      className={`border-b transition-colors ${
                        isDark
                          ? 'border-gray-700 hover:bg-gray-700/50'
                          : 'border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <td className={`py-3 px-2 ${typography.bodyLarge} ${textColors.primary}`}>
                        {new Date(day.stat_date).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className={`text-right py-3 px-2 ${typography.bodyLarge} ${textColors.primary} font-semibold`}>
                        {day.total_visits.toLocaleString()}
                      </td>
                      <td className={`text-right py-3 px-2 ${typography.bodyLarge} ${textColors.secondary}`}>
                        {day.unique_visitors.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`${typography.h2} ${textColors.primary} mb-6`}>Kontakt Ma'lumotlari</h2>

            {message && (
              <div className={`mb-4 p-3 rounded-lg flex items-start space-x-2 text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>{message.text}</p>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={`block text-sm font-semibold ${textColors.primary} mb-1`}>
                    <Phone className="w-3 h-3 inline mr-1" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactInputChange}
                    className={`w-full px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                        : 'bg-white border-gray-200 focus:border-blue-500'
                    } focus:ring-2 focus:ring-blue-500/20`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold ${textColors.primary} mb-1`}>
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleContactInputChange}
                    className={`w-full px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                        : 'bg-white border-gray-200 focus:border-blue-500'
                    } focus:ring-2 focus:ring-blue-500/20`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold ${textColors.primary} mb-1`}>
                    <MapPin className="w-3 h-3 inline mr-1" />
                    Manzil
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={contactInfo.location}
                    onChange={handleContactInputChange}
                    className={`w-full px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                        : 'bg-white border-gray-200 focus:border-blue-500'
                    } focus:ring-2 focus:ring-blue-500/20`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold ${textColors.primary} mb-1`}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    Ish Vaqti
                  </label>
                  <input
                    type="text"
                    name="work_hours"
                    value={contactInfo.work_hours}
                    onChange={handleContactInputChange}
                    className={`w-full px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                        : 'bg-white border-gray-200 focus:border-blue-500'
                    } focus:ring-2 focus:ring-blue-500/20`}
                    required
                  />
                </div>

                <div className={`pt-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-xs font-semibold ${textColors.secondary} mb-3`}>Ijtimoiy Tarmoqlar</p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Facebook className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <input
                        type="url"
                        name="facebook_url"
                        value={contactInfo.facebook_url}
                        onChange={handleContactInputChange}
                        placeholder="Facebook URL"
                        className={`flex-1 px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-200 focus:border-blue-500'
                        } focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                      <input
                        type="url"
                        name="instagram_url"
                        value={contactInfo.instagram_url}
                        onChange={handleContactInputChange}
                        placeholder="Instagram URL"
                        className={`flex-1 px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-200 focus:border-blue-500'
                        } focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Twitter className="w-4 h-4 text-sky-500 flex-shrink-0" />
                      <input
                        type="url"
                        name="twitter_url"
                        value={contactInfo.twitter_url}
                        onChange={handleContactInputChange}
                        placeholder="X (Twitter) URL"
                        className={`flex-1 px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-200 focus:border-blue-500'
                        } focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Linkedin className="w-4 h-4 text-blue-700 flex-shrink-0" />
                      <input
                        type="url"
                        name="linkedin_url"
                        value={contactInfo.linkedin_url}
                        onChange={handleContactInputChange}
                        placeholder="LinkedIn URL"
                        className={`flex-1 px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-200 focus:border-blue-500'
                        } focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Github className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-300' : 'text-gray-800'}`} />
                      <input
                        type="url"
                        name="github_url"
                        value={contactInfo.github_url}
                        onChange={handleContactInputChange}
                        placeholder="GitHub URL"
                        className={`flex-1 px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-200 focus:border-blue-500'
                        } focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Saqlash</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
