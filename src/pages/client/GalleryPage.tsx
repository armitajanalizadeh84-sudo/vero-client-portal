import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_GALLERY } from '../../data/mockData';

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function GalleryPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  function prev() {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + MOCK_GALLERY.length) % MOCK_GALLERY.length);
  }

  function next() {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % MOCK_GALLERY.length);
  }

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Gallery" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Gallery
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            {MOCK_GALLERY.length} Images &mdash; Residence Noir
          </p>
          <div className="divider mt-5" />
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {MOCK_GALLERY.map((item, idx) => (
            <motion.div
              key={item.id}
              className="break-inside-avoid mb-3 sm:mb-4"
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="group relative w-full rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setLightboxIdx(idx)}
                style={{ background: '#0B0B0B' }}
              >
                <img
                  src={item.file_url}
                  alt={item.title || ''}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ display: 'block' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(5,5,5,0.5)' }}
                >
                  <ZoomIn size={24} color="rgba(255,255,255,0.8)" />
                </div>
                {item.title && (
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9), transparent)' }}
                  >
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', color: 'white', fontWeight: 300 }}>
                      {item.title}
                    </p>
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: 'rgba(5,5,5,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-white/10 z-10"
              onClick={() => setLightboxIdx(null)}
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:bg-white/10 z-10"
              onClick={e => { e.stopPropagation(); prev(); }}
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:bg-white/10 z-10"
              onClick={e => { e.stopPropagation(); next(); }}
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full px-16 sm:px-20"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={MOCK_GALLERY[lightboxIdx].file_url}
                alt={MOCK_GALLERY[lightboxIdx].title || ''}
                className="w-full h-auto rounded-xl object-contain max-h-[75vh]"
              />
              <div className="mt-4 text-center">
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'white', fontWeight: 300, letterSpacing: '0.05em' }}>
                  {MOCK_GALLERY[lightboxIdx].title}
                </p>
                {MOCK_GALLERY[lightboxIdx].description && (
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                    {MOCK_GALLERY[lightboxIdx].description}
                  </p>
                )}
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', marginTop: '0.5rem' }}>
                  {lightboxIdx + 1} / {MOCK_GALLERY.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
