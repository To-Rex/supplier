import React from 'react';
import { Bot } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50 will-change-transform">
      <div className="text-center" role="status" aria-label="Yuklanmoqda">
        <div className="animate-bounce mb-4 will-change-transform">
          <Bot 
            className="w-16 h-16 text-blue-500 mx-auto" 
            aria-hidden="true"
            focusable="false"
          />
        </div>
        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse will-change-transform"></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium" aria-live="polite">
          Torex yuklanmoqda...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
