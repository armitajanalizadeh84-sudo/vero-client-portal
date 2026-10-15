import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Images, Film, FileText, Map, Download, Calendar, MessageSquare, Cpu } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PROJECT } from '../../data/mockData';

const CARDS = [
  {
    id: 'gallery',
    label: 'Gallery',
    subtitle: 'Photography & renders',
    icon: Images,
    path: '/gallery',
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
    span: 'col-span-2 sm:col-span-1',
    height: 'h-56 sm:h-72',
  },
  {
    id: 'videos',
    label: 'Videos',
    subtitle: 'Cinematic walkthroughs',
    icon: Film,
    path: '/videos',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    span: 'col-span-2 sm:col-span-1',
    height: 'h-56 sm:h-72',
  },
  {
    id: 'plans',
    label: 'Plans',
    subtitle: 'Floor plans & drawings',
    icon: Map,
    path: '/plans',
    image: 'https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg',
    span: 'col-span-2 sm:col-span-1',
    height: 'h-48 sm:h-64',
  },
  {
    id: 'documents',
    label: 'Documents',
    subtitle: 'Reports & specifications',
    icon: FileText,
    path: '/documents',
    image: 'https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg',
    span: 'col-span-2 sm:col-span-1',
    height: 'h-48 sm:h-64',
  },
  {
    id: 'timeline',
    label: 'Timeline',
    subtitle: 'Project milestones',
    icon: Calendar,
    path: '/timeline',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    span: 'col-span-2 sm:col-span-1',
    height: 'h-48 sm:h-60',
  },
  {
    id: 'downloads',
    label: 'Downloads',
    subtitle: 'Files & packages',
    icon: Download,
    path: '/downloads',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    span: 'col-span-2 sm:col-span-1',
    height: 'h-48 sm:h-60',
  },
  {
    id: 'interactive',
    label: 'Interactive',
    subtitle: 'Virtual experience',
    icon: Cpu,
    path: '/interactive',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    span: 'col-span-2 sm:col-span-2',
    height: 'h-52 sm:h-72',
    featured: true,
  },
  {
    id: 'contact',
    label: 'Contact',
    subtitle: 'Reach your team',
    icon: MessageSquare,
    path: '/contact',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
    span: 'col-span-2 sm:col-span-2',
    height: 'h-40 sm:h-56',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function ProjectSpace() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <div className="min-h-dvh page-container" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-5xl mx-auto">

        {/* Hero project header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              height: 'clamp(180px, 30vw, 320px)',
              background: '#0B0B0B',
            }}
          >
            <img
              src={MOCK_PROJECT.cover_image_url || ''}
              alt={MOCK_PROJECT.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.5 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)',
              }}
            />
            {/* Cherry accent line */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(122,0,46,0.5), transparent)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {MOCK_PROJECT.project_type} &mdash; {MOCK_PROJECT.location}
                  </p>
                  <h1
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      color: 'white',
                      lineHeight: 1.1,
                    }}
                  >
                    {MOCK_PROJECT.name}
                  </h1>
                </div>
                <div className="hidden sm:block text-right">
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                    {MOCK_PROJECT.area_sqm} sqm
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                    {MOCK_PROJECT.architect}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome message */}
          <div className="mt-5 flex items-center justify-between">
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.04em',
              }}
            >
              Welcome, {profile?.full_name || profile?.email?.split('@')[0] || 'Client'}
            </p>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(122,0,46,0.15)', border: '1px solid rgba(122,0,46,0.3)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                Live
              </span>
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                className={`${card.span}`}
                variants={cardVariants}
              >
                <button
                  onClick={() => navigate(card.path)}
                  className={`relative w-full ${card.height} rounded-2xl overflow-hidden group cursor-pointer text-left`}
                  style={{
                    background: '#0B0B0B',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(122,0,46,0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* Background image */}
                  <img
                    src={card.image}
                    alt={card.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ opacity: 0.2 }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: card.featured
                        ? 'linear-gradient(135deg, rgba(122,0,46,0.15) 0%, rgba(5,5,5,0.6) 100%)'
                        : 'linear-gradient(to bottom right, rgba(5,5,5,0.4), rgba(5,5,5,0.8))',
                    }}
                  />

                  {/* Glass reflection */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '40%',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Icon size={16} color="rgba(255,255,255,0.6)" />
                    </div>

                    <div>
                      <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                          fontWeight: 400,
                          letterSpacing: '0.05em',
                          color: 'white',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {card.label}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '0.6rem',
                          fontWeight: 400,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Cherry border on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(122,0,46,0.6), transparent)' }}
                  />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
