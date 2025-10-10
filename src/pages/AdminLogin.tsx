import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Lock, Mail, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        setError('Email yoki parol noto\'g\'ri');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Tizimga kirishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all duration-300 ${
            isDark
              ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Asosiy sahifa</span>
        </Link>

        {/* Login Card */}
        <div className={`relative rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 ${
          isDark
            ? 'bg-gray-800/90 border border-gray-700/50'
            : 'bg-white/90 border border-gray-200/50'
        }`}>
          {/* Decorative Elements */}
          <div className="absolute -top-1 -right-1 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-1 -left-1 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>

          <div className="relative p-8 sm:p-10">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Admin Panel
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Boshqaruv paneliga xush kelibsiz
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                      isDark
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-700'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="admin@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Parol
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                      isDark
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-700'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                    }`}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                      isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rish'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className={`rounded-xl px-4 py-3 border ${
                  isDark
                    ? 'bg-red-900/20 border-red-800/50 text-red-300'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Yuklanmoqda...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Kirish</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Info */}
            <div className={`mt-6 pt-6 border-t text-center text-xs ${
              isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}>
              <p>Himoyalangan admin paneli</p>
              <p className="mt-1">© 2024 Torex IT. Barcha huquqlar himoyalangan.</p>
            </div>
          </div>
        </div>

        {/* Additional Security Notice */}
        <div className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            <span>SSL shifrlangan xavfsiz ulanish</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
