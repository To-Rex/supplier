import React from 'react';
import { MessageSquare, FileText, Code, TestTube, Rocket } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../utils/typography';

const OurProcess: React.FC = () => {
  const { isDark } = useTheme();

  const steps = [
    {
      icon: MessageSquare,
      title: "Konsultatsiya",
      description: "Sizning g'oyalaringizni tinglaymiz va eng yaxshi yechimlarni taklif qilamiz"
    },
    {
      icon: FileText,
      title: "Rejalashtirish",
      description: "Loyihani batafsil rejalashtiramiz va texnik topshiriq tayyorlaymiz"
    },
    {
      icon: Code,
      title: "Dasturlash",
      description: "Professional jamoamiz bilan kod yozamiz va dastur yaratamiz"
    },
    {
      icon: TestTube,
      title: "Sinovdan o'tkazish",
      description: "Har bir funksiyani sinab ko'ramiz va xatolarni tuzatamiz"
    },
    {
      icon: Rocket,
      title: "Ishga tushirish",
      description: "Loyihani muvaffaqiyatli ishga tushiramiz va qo'llab-quvvatlaymiz"
    }
  ];

  return (
    <section
      id="our-process"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      aria-labelledby="our-process-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="our-process-title"
            className={`text-blue-600 text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up`}
          >
            Bizning ish jarayoni
          </h2>
          <p className={`${typography.lead} ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto animate-fade-in-up animation-delay-200`}>
            Har bir loyihani professional va tizimli yondashuv bilan amalga oshiramiz
          </p>
        </div>

        <div className="relative">
          {/* Animated Timeline line */}
          <div className={`hidden md:block absolute top-32 left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full z-5 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} animate-pulse-glow`}></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`stagger-item flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div
                  className={`group flex-1 p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    index % 2 === 0 ? 'md:pr-12 md:mr-8' : 'md:pl-12 md:ml-8'
                  } ${
                    isDark
                      ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50'
                      : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-300/50 shadow-lg'
                  }`}
                >
                  <div className="text-center md:text-left">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                        isDark
                          ? 'bg-blue-600 shadow-lg shadow-blue-500/25'
                          : 'bg-blue-500 shadow-lg shadow-blue-500/25'
                      }`}
                    >
                      <step.icon className="w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                    </div>
                    <h3 className={`text-blue-600 text-2xl font-bold mb-3 transition-all duration-300 group-hover:scale-105`}>
                      {step.title}
                    </h3>
                    <p className={`${typography.body} ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Animated Timeline dot */}
                <div className={`hidden md:flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-500 hover:scale-125 hover:rotate-12 z-10 ${
                  isDark
                    ? 'bg-gray-900 border-gray-700 shadow-lg shadow-blue-500/20'
                    : 'bg-white border-gray-300 shadow-lg shadow-blue-500/20'
                }`}>
                  <span className={`text-xl font-bold transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600`}>
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;