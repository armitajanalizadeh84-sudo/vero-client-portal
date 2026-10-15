import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, ZoomIn, X } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_PLANS } from '../../data/mockData';

export default function PlansPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Plans" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Plans
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            {MOCK_PLANS.length} Drawings &mdash; Residence Noir
          </p>
          <div className="divider mt-5" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {MOCK_PLANS.map((plan, idx) => (
            <motion.button
              key={plan.id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              onClick={() => setSelected(idx)}
              className="group relative rounded-2xl overflow-hidden text-left"
              style={{ background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.07)', height: 240 }}
              whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <img
                src={plan.file_url}
                alt={plan.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ opacity: 0.45, filter: 'grayscale(30%)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.9) 100%)' }} />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full"
                  style={{ background: 'rgba(122,0,46,0.7)', border: '1px solid rgba(122,0,46,0.8)' }}
                >
                  <ZoomIn size={18} color="white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(122,0,46,0.8)' }} />
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    {plan.floor_level} Level
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 300, color: 'white', letterSpacing: '0.05em' }}>
                  {plan.title}
                </h3>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.2rem' }}>
                  {plan.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,5,5,0.97)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 z-10"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>
          <motion.div
            className="max-w-3xl w-full"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={MOCK_PLANS[selected].file_url}
              alt={MOCK_PLANS[selected].title}
              className="w-full rounded-xl"
              style={{ maxHeight: '75vh', objectFit: 'contain' }}
            />
            <div className="text-center mt-4">
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'white', fontWeight: 300, letterSpacing: '0.05em' }}>
                {MOCK_PLANS[selected].title}
              </p>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem', letterSpacing: '0.1em' }}>
                {MOCK_PLANS[selected].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
