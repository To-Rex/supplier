import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { typography, getTextColors } from '../../utils/typography';
import ThemeToggle from '../ThemeToggle';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/team', icon: Users, label: 'Jamoa A\'zolari' },
    { path: '/admin/users', icon: UserCog, label: 'Adminlar' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`fixed top-0 left-0 right-0 z-50 ${
        isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'
      } shadow-sm`}>
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className={`${typography.h3} ${textColors.primary}`}>Torex IT Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className={`${typography.bodyLarge} ${textColors.primary} font-medium`}>
                {user?.username}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              title="Chiqish"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-[73px]">
        <aside className={`fixed left-0 top-[73px] bottom-0 w-64 transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isDark ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'
        }`}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className={typography.bodyLarge}>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
