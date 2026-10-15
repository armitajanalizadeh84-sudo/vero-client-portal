import { motion } from 'framer-motion';
import { Monitor, Download, Glasses, ExternalLink, Play, Info } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_INTERACTIVE } from '../../data/mockData';
import type { InteractiveExperience } from '../../types';

const TYPE_CONFIG: Record<string, { icon: typeof Monitor; label: string; color: string; desc: string }> = {
  pixel_streaming: {
    icon: Monitor,
    label: 'Pixel Streaming',
    color: 'rgba(60,140,220,0.8)',
    desc: 'Real-time cloud-rendered interactive experience. No download required.',
  },
  executable: {
    icon: Download,
    label: 'Windows Application',
    color: 'rgba(122,0,46,0.8)',
    desc: 'Full-quality Unreal Engine 5 walkthrough for your PC.',
  },
  vr: {
    icon: Glasses,
    label: 'VR Experience',
    color: 'rgba(100,80,200,0.8)',
    desc: 'Immersive virtual reality experience for headset users.',
  },
};

function VRInfo() {
  return (
    <div
      className="mt-4 rounded-xl p-4"
      style={{ background: 'rgba(100,80,200,0.08)', border: '1px solid rgba(100,80,200,0.2)' }}
    >
      <div className="flex items-start gap-3">
        <Info size={14} color="rgba(160,140,255,0.7)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(160,140,255,0.8)', fontWeight: 500, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
            Compatible Headsets
          </p>
          <div className="flex flex-col gap-1">
            {['Meta Quest 2 / 3 / Pro', 'PC VR (SteamVR)', 'PlayStation VR2'].map(headset => (
              <p key={headset} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                &bull; {headset}
              </p>
            ))}
          </div>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Contact your architect to receive the VR build files and installation instructions.
          </p>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: InteractiveExperience }) {
  const cfg = TYPE_CONFIG[exp.experience_type] || TYPE_CONFIG.pixel_streaming;
  const Icon = cfg.icon;

  return (
    <motion.div
      className="glass-card p-6 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ background: `rgba(${cfg.color})`.replace('rgba(', 'rgba(').replace('0.8)', '0.12)'), border: `1px solid ${cfg.color.replace('0.8', '0.3')}` }}
        >
          <Icon size={22} color={cfg.color} />
        </div>
        <div>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            {cfg.label}
          </p>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: 'white', letterSpacing: '0.04em' }}>
            {exp.title}
          </h3>
        </div>
      </div>

      <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {exp.description || cfg.desc}
      </p>

      {exp.experience_type === 'pixel_streaming' && exp.url && (
        <a
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
          style={{ textDecoration: 'none' }}
        >
          <Play size={13} fill="white" />
          Launch Experience
          <ExternalLink size={11} />
        </a>
      )}

      {exp.experience_type === 'executable' && exp.file_url && (
        <a
          href={exp.file_url}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
          style={{ textDecoration: 'none' }}
        >
          <Download size={13} />
          Download Windows App
        </a>
      )}

      {exp.experience_type === 'vr' && <VRInfo />}
    </motion.div>
  );
}

export default function InteractivePage() {
  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Interactive" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Interactive
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            Immersive Experiences
          </p>
          <div className="divider mt-5" />
        </motion.div>

        {/* Hero visual */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-8"
          style={{ height: 200, background: '#0B0B0B' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Interactive Experience"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.3 }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              Residence Noir
            </p>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
              Live &mdash; Unreal Engine 5
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {MOCK_INTERACTIVE.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
            >
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
