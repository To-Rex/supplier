import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEOOptimizer from '../components/SEOOptimizer';
import { ArrowLeft, Mail, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  image_url: string;
  bio: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

const TeamMemberProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setMember(data);
      }
      setLoading(false);
    };

    fetchMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Yuklanmoqda...</div>
      </div>
    );
  }

  if (notFound || !member) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Jamoa a'zosi topilmadi</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOOptimizer
        title={member.meta_title || `${member.name} - ${member.role}`}
        description={member.meta_description || member.bio}
        keywords={member.keywords?.join(', ') || member.expertise.join(', ')}
        ogType="profile"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
          description: member.bio,
          image: member.image_url,
          url: `${window.location.origin}/team/${member.slug}`,
          knowsAbout: member.expertise,
        }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Bosh sahifaga qaytish
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h1>
                <p className="text-xl text-blue-600 dark:text-blue-400 mb-6">
                  {member.role}
                </p>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Mutaxassislik
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {member.bio && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Haqida
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <a
                    href={`mailto:info@torexdev.uz?subject=Contact ${member.name}`}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberProfile;
