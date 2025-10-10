import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Torex IT
          </h1>
          <p className="text-lg text-gray-600">
            Professional IT Yechimlar
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-gray-700">
            Loyiha hozir tiklanmoqda. Iltimos, kuting...
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ma'lumotlar ombori tayyor
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="font-semibold text-green-700">Database</div>
              <div className="text-green-600">Supabase ✓</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="font-semibold text-green-700">Tables</div>
              <div className="text-green-600">Blog, Team, Portfolio ✓</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Barcha backend strukturalar ishlayapti</p>
          <p>Frontend komponentlari tiklanishi kerak</p>
        </div>
      </div>
    </div>
  );
}

export default App;
