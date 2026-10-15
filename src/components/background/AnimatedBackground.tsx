import { motion } from 'framer-motion';

/* ── Dust particles — tiny warm motes, no stars ── */
const DUST = [
  { x: '12%',  y: '18%', s: 1.2, o: 0.18, dur: 28, delay: 0,    dx: 12,  dy: -18 },
  { x: '78%',  y: '8%',  s: 1.0, o: 0.14, dur: 34, delay: 3.5,  dx: -8,  dy: 22  },
  { x: '34%',  y: '72%', s: 1.5, o: 0.20, dur: 22, delay: 7,    dx: 16,  dy: -12 },
  { x: '88%',  y: '55%', s: 1.0, o: 0.15, dur: 38, delay: 1.5,  dx: -14, dy: -20 },
  { x: '55%',  y: '25%', s: 1.3, o: 0.16, dur: 26, delay: 9,    dx: -10, dy: 18  },
  { x: '22%',  y: '45%', s: 1.0, o: 0.13, dur: 42, delay: 4,    dx: 20,  dy: -10 },
  { x: '66%',  y: '82%', s: 1.2, o: 0.17, dur: 30, delay: 12,   dx: -16, dy: -22 },
  { x: '8%',   y: '65%', s: 1.0, o: 0.12, dur: 36, delay: 6,    dx: 14,  dy: 16  },
  { x: '92%',  y: '30%', s: 1.4, o: 0.19, dur: 24, delay: 2,    dx: -12, dy: 20  },
  { x: '44%',  y: '90%', s: 1.1, o: 0.14, dur: 32, delay: 15,   dx: 10,  dy: -24 },
  { x: '72%',  y: '40%', s: 1.0, o: 0.16, dur: 40, delay: 8,    dx: -18, dy: -14 },
  { x: '18%',  y: '88%', s: 1.3, o: 0.13, dur: 28, delay: 11,   dx: 22,  dy: -18 },
  { x: '50%',  y: '15%', s: 1.0, o: 0.15, dur: 46, delay: 5,    dx: -8,  dy: 24  },
  { x: '82%',  y: '72%', s: 1.2, o: 0.14, dur: 34, delay: 17,   dx: -20, dy: -16 },
  { x: '38%',  y: '50%', s: 1.0, o: 0.12, dur: 38, delay: 13,   dx: 16,  dy: -20 },
  { x: '60%',  y: '62%', s: 1.1, o: 0.16, dur: 26, delay: 19,   dx: -10, dy: 18  },
  { x: '28%',  y: '30%', s: 1.0, o: 0.13, dur: 44, delay: 22,   dx: 12,  dy: -14 },
  { x: '95%',  y: '85%', s: 1.3, o: 0.15, dur: 30, delay: 9,    dx: -16, dy: -10 },
] as const;

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        background: "#050505",
      }}
    >
      {/* ── 1. Top-right cherry — primary light source ─────────────── */}
      <motion.div
        className="absolute"
        style={{
          top: '-25%', right: '-15%',
          width: '85vw', height: '85vw',
          maxWidth: 1060, maxHeight: 1060,
          borderRadius: '50%',
          background: [
            'radial-gradient(ellipse at 38% 38%,',
            '  rgba(138,0,50,0.52) 0%,',
            '  rgba(108,0,40,0.28) 30%,',
            '  rgba(72,0,24,0.12) 56%,',
            '  transparent 72%)',
          ].join(''),
          filter: 'blur(34px)',
        }}
        animate={{ scale: [1, 1.06, 1], x: [0, 16, 0], y: [0, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── 2. Top-center soft cherry — distributes light upward ────── */}
      <motion.div
        className="absolute"
        style={{
          top: '-18%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw', height: '55vw',
          maxWidth: 780, maxHeight: 680,
          borderRadius: '50%',
          background: [
            'radial-gradient(ellipse at center,',
            '  rgba(110,0,40,0.20) 0%,',
            '  rgba(80,0,28,0.09) 42%,',
            '  transparent 66%)',
          ].join(''),
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.65, 1, 0.65], scaleX: [1, 1.12, 1], y: [0, 14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ── 3. Bottom-left burgundy — floor reflection ──────────────── */}
      <motion.div
        className="absolute"
        style={{
          bottom: '-28%', left: '-22%',
          width: '88vw', height: '88vw',
          maxWidth: 1140, maxHeight: 1140,
          borderRadius: '50%',
          background: [
            'radial-gradient(ellipse at 52% 44%,',
            '  rgba(72,0,24,0.50) 0%,',
            '  rgba(50,0,16,0.24) 36%,',
            '  rgba(28,0,8,0.09) 60%,',
            '  transparent 76%)',
          ].join(''),
          filter: 'blur(42px)',
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, -20, 0], y: [0, 16, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* ── 4. Behind-form wine glow — illuminates login area ───────── */}
      <motion.div
        className="absolute"
        style={{
          top: '28%', left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw', height: '70vh',
          maxWidth: 860,
          borderRadius: '50%',
          background: [
            'radial-gradient(ellipse at center,',
            '  rgba(130,14,52,0.16) 0%,',
            '  rgba(100,6,40,0.07) 46%,',
            '  transparent 70%)',
          ].join(''),
          filter: 'blur(52px)',
        }}
        animate={{
          scaleX: [1, 1.16, 1], scaleY: [1, 0.9, 1],
          y: [0, 26, 0], opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />

      {/* ── 5. Bottom-right burgundy accent ────────────────────────── */}
      <motion.div
        className="absolute"
        style={{
          bottom: '-12%', right: '-8%',
          width: '48vw', height: '48vw',
          maxWidth: 580, maxHeight: 580,
          borderRadius: '50%',
          background: [
            'radial-gradient(ellipse at center,',
            '  rgba(78,0,26,0.32) 0%,',
            '  rgba(48,0,16,0.11) 52%,',
            '  transparent 72%)',
          ].join(''),
          filter: 'blur(58px)',
        }}
        animate={{ opacity: [0.55, 0.88, 0.55], scale: [1, 1.11, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
      />

      {/* ── 6. Fog layer — slow vertical drift ─────────────────────── */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: '20%', height: '62%',
          background: [
            'linear-gradient(180deg,',
            '  transparent 0%,',
            '  rgba(55,0,20,0.065) 28%,',
            '  rgba(80,0,30,0.05) 50%,',
            '  rgba(55,0,20,0.055) 72%,',
            '  transparent 100%)',
          ].join(''),
          filter: 'blur(24px)',
        }}
        animate={{ y: [-24, 24, -24], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── 7. Second fog pass — offset drift for depth ─────────────── */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: '35%', height: '40%',
          background: [
            'linear-gradient(180deg,',
            '  transparent 0%,',
            '  rgba(100,0,36,0.04) 40%,',
            '  rgba(70,0,24,0.03) 60%,',
            '  transparent 100%)',
          ].join(''),
          filter: 'blur(40px)',
        }}
        animate={{ y: [18, -18, 18], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* ── 8. Diagonal cinematic streak ────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{
          top: '-18%', right: '8%',
          width: '32vw', height: '138%',
          background: 'linear-gradient(168deg, rgba(118,0,44,0.07) 0%, transparent 52%)',
          filter: 'blur(64px)',
          transformOrigin: 'top center',
        }}
        animate={{ rotate: [-2, 2, -2], opacity: [0.45, 0.82, 0.45] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ── 9. Horizontal glass reflection shimmer ───────────────────── */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: '47%', height: 2,
          background: 'linear-gradient(90deg, transparent 4%, rgba(170,55,75,0.10) 33%, rgba(240,90,90,0.05) 50%, rgba(170,55,75,0.10) 67%, transparent 96%)',
          filter: 'blur(3px)',
        }}
        animate={{ x: ['-6%', '6%', '-6%'], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── 10. Floating dust — warm motes in the light ─────────────── */}
      {DUST.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.s, height: p.s,
            background: 'rgba(255, 230, 220, 1)',
            opacity: p.o,
          }}
          animate={{
            x: [0, p.dx, p.dx * 0.4, 0],
            y: [0, p.dy, p.dy * 0.6, 0],
            opacity: [p.o * 0.4, p.o, p.o * 0.6, p.o * 0.4],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* ── 11. Noise grain ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.026,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />

      {/* ── 12. Vignette ────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 46%, transparent 26%, rgba(4,1,3,0.52) 70%, rgba(3,0,2,0.80) 100%)',
        }}
      />

      {/* ── 13. Bottom dark floor ───────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, rgba(3,0,2,0.72) 0%, transparent 100%)',
        }}
      />

      {/* ── 14. Top fade ────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '18%',
          background: 'linear-gradient(to bottom, rgba(3,0,2,0.58) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
