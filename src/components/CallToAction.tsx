import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../utils/typography';
import { supabase } from '../lib/supabase';

interface ContactInfoData {
  phone: string;
  email: string;
}

const CallToAction: React.FC = () => {
  const { isDark } = useTheme();
  const [contactInfo, setContactInfo] = useState<ContactInfoData | null>(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('phone, email')
        .single();

      if (error) {
        console.error('Error fetching contact info:', error);
        return;
      }

      if (data) {
        setContactInfo(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="call-to-action"
      className={`py-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
      aria-labelledby="cta-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="cta-title"
          className={`${typography.h2} text-white mb-4`}
        >
          Tayyor g'oyalaringizni amalga oshirishga?
        </h2>
        <p className={`${typography.lead} text-blue-100 mb-8 max-w-2xl mx-auto`}>
          Biz bilan bog'laning va sizning loyihangizni professional darajada amalga oshiramiz.
          Bepul konsultatsiya va taklifnomani olish uchun murojaat qiling!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/contact"
            className={`w-full xs:w-auto sm:w-auto group bg-white text-blue-600 px-8 py-3 rounded-full ${typography.button} hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 min-w-[160px]`}
            aria-label="Contact sahifasiga o'tish"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Bog'lanish
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>

          <a
            href={`tel:${contactInfo?.phone || '+998995340313'}`}
            className={`w-full xs:w-auto sm:w-auto group border-2 border-white text-white px-8 py-3 rounded-full ${typography.button} hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 min-w-[160px]`}
            aria-label="Telefon orqali qo'ng'iroq qilish"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" aria-hidden="true" />
              Qo'ng'iroq qilish
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-100">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" aria-hidden="true" />
            <a
              href={`mailto:${contactInfo?.email || 'dev.dilshodjon@gmail.com'}`}
              className="hover:text-white transition-colors duration-200"
              aria-label="Email yuborish"
            >
              {contactInfo?.email || 'dev.dilshodjon@gmail.com'}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" aria-hidden="true" />
            <a
              href={`tel:${contactInfo?.phone || '+998995340313'}`}
              className="hover:text-white transition-colors duration-200"
              aria-label="Telefon raqami"
            >
              {contactInfo?.phone || '+998 99 534 03 13'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;