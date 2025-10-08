import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);

    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Noto\'g\'ri login yoki parol');
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
      isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-white'
    }`}>
      <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 transition-colors duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isDark ? 'bg-blue-900/50' : 'bg-blue-100'
          }`}>
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className={`${typography.h2} ${textColors.primary} mb-2`}>Admin Panel</h1>
          <p className={`${typography.bodyLarge} ${textColors.secondary}`}>Tizimga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
              Login
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textColors.secondary}`} />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Loginni kiriting"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={`block ${typography.cardSubtitle} ${textColors.primary} mb-2`}>
              Parol
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textColors.secondary}`} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Parolni kiriting"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Yuklanmoqda...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Kirish
              </>
            )}
          </button>
        </form>

        <div className={`mt-6 text-center ${typography.bodySmall} ${textColors.secondary}`}>
          <p>Asosiy sahifaga qaytish uchun <a href="/" className="text-blue-600 hover:underline">bu yerni bosing</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
