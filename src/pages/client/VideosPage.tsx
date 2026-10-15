import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Film } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_VIDEOS } from '../../data/mockData';

function formatDuration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Videos" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Videos
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            {MOCK_VIDEOS.length} Films &mdash; Residence Noir
          </p>
          <div className="divider mt-5" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {MOCK_VIDEOS.map((video) => (
            <motion.div
              key={video.id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {activeVideo === video.id ? (
                <div className="relative">
                  <video
                    src={video.file_url}
                    controls
                    autoPlay
                    className="w-full rounded-t-2xl"
                    style={{ maxHeight: '60vh', background: '#000' }}
                  />
                  <div className="p-5 sm:p-6">
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'white', letterSpacing: '0.05em' }}>
                      {video.title}
                    </h3>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                      {video.description}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActiveVideo(video.id)}
                  className="w-full text-left group"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-72 flex-shrink-0 h-44 sm:h-auto overflow-hidden">
                      <img
                        src={video.thumbnail_url || ''}
                        alt={video.title || ''}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(5,5,5,0.5)' }}
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: 'rgba(122,0,46,0.8)',
                            border: '1px solid rgba(122,0,46,0.9)',
                            boxShadow: '0 0 40px rgba(122,0,46,0.4)',
                          }}
                        >
                          <Play size={20} fill="white" color="white" style={{ marginLeft: 2 }} />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <Film size={12} color="rgba(122,0,46,0.8)" />
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(122,0,46,0.7)', textTransform: 'uppercase' }}>
                          Film
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: 'white', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                        {video.title}
                      </h3>
                      <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {video.description}
                      </p>
                      {video.duration_seconds && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} color="rgba(255,255,255,0.3)" />
                          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                            {formatDuration(video.duration_seconds)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
