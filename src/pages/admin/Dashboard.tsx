import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Calendar } from 'lucide-react';
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

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalTeamMembers, setTotalTeamMembers] = useState(0);
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: statsData } = await supabase
        .from('site_stats_summary')
        .select('*')
        .order('stat_date', { ascending: false })
        .limit(7);

      const { count } = await supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (statsData) setStats(statsData);
      if (count) setTotalTeamMembers(count);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
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
      title: 'Bugungi Tashriflar',
      value: todayStats.visits,
      icon: Eye,
      color: 'blue',
      change: '+12%',
    },
    {
      title: 'Noyob Foydalanuvchilar',
      value: todayStats.visitors,
      icon: Users,
      color: 'green',
      change: '+8%',
    },
    {
      title: 'Haftalik Jami',
      value: weekTotal,
      icon: TrendingUp,
      color: 'purple',
      change: '+15%',
    },
    {
      title: 'Jamoa A\'zolari',
      value: totalTeamMembers,
      icon: Calendar,
      color: 'orange',
      change: '+2',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
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
                <span className="text-green-600 text-sm font-semibold">{card.change}</span>
              </div>
              <h3 className={`${typography.h2} ${textColors.primary} mb-1`}>{card.value.toLocaleString()}</h3>
              <p className={`${typography.cardSubtitle} ${textColors.secondary}`}>{card.title}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-xl p-6 shadow-lg ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <h2 className={`${typography.h2} ${textColors.primary} mb-6`}>So'nggi 7 Kunlik Statistika</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-4 ${typography.cardSubtitle} ${textColors.primary}`}>Sana</th>
                  <th className={`text-right py-3 px-4 ${typography.cardSubtitle} ${textColors.primary}`}>Tashriflar</th>
                  <th className={`text-right py-3 px-4 ${typography.cardSubtitle} ${textColors.primary}`}>Noyob Foydalanuvchilar</th>
                  <th className={`text-right py-3 px-4 ${typography.cardSubtitle} ${textColors.primary}`}>Home</th>
                  <th className={`text-right py-3 px-4 ${typography.cardSubtitle} ${textColors.primary}`}>About</th>
                  <th className={`text-right py-3 px-4 ${typography.cardSubtitle} ${textColors.primary}`}>Services</th>
                  <th className={`text-right py-3 px-4 ${typography.cardSubtitle} ${textColors.primary}`}>Contact</th>
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
                    <td className={`py-3 px-4 ${typography.bodyLarge} ${textColors.primary}`}>
                      {new Date(day.stat_date).toLocaleDateString('uz-UZ')}
                    </td>
                    <td className={`text-right py-3 px-4 ${typography.bodyLarge} ${textColors.primary} font-semibold`}>
                      {day.total_visits.toLocaleString()}
                    </td>
                    <td className={`text-right py-3 px-4 ${typography.bodyLarge} ${textColors.secondary}`}>
                      {day.unique_visitors.toLocaleString()}
                    </td>
                    <td className={`text-right py-3 px-4 ${typography.bodyLarge} ${textColors.secondary}`}>
                      {day.page_views.home || 0}
                    </td>
                    <td className={`text-right py-3 px-4 ${typography.bodyLarge} ${textColors.secondary}`}>
                      {day.page_views.about || 0}
                    </td>
                    <td className={`text-right py-3 px-4 ${typography.bodyLarge} ${textColors.secondary}`}>
                      {day.page_views.services || 0}
                    </td>
                    <td className={`text-right py-3 px-4 ${typography.bodyLarge} ${textColors.secondary}`}>
                      {day.page_views.contact || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
