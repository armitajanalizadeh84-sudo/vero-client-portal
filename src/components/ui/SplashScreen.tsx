import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

type Phase = 'black' | 'line' | 'split' | 'merge' | 'hold' | 'rising' | 'done';

const LOGO_FONT_SIZE = 'clamp(4.5rem, 11vw, 7.5rem)';
const LOGO_LETTER_SPACING = '0.55em';
const LOGO_WEIGHT = 300;

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<Phase>('black');
  const [riseY, setRiseY] = useState(-300);

  useEffect(() => {
    const vh = window.innerHeight;
    // Center of screen → ~88px from top. Delta from center = vh/2 - 88
    setRiseY(-(vh / 2 - 88));
  }, []);

  useEffect(() => {
    const schedule: { p: Phase; t: number }[] = [
      { p: 'line',   t: 180  },
      { p: 'split',  t: 860  },
      { p: 'merge',  t: 1680 },
      { p: 'hold',   t: 2480 },
      { p: 'rising', t: 3540 }, // ~1060ms hold
      { p: 'done',   t: 4700 }, // rising animation ~1100ms
    ];
    const timers = schedule.map(({ p, t }) => setTimeout(() => setPhase(p), t));
    const completeTimer = setTimeout(onComplete, 5020);
    return () => { timers.forEach(clearTimeout); clearTimeout(completeTimer); };
  }, [onComplete]);

  const lineVisible = phase === 'line' || phase === 'split';
  const lettersOut  = phase === 'split';
  const merged      = phase === 'merge'  || phase === 'hold'  || phase === 'rising' || phase === 'done';
  const holdDone    = phase === 'hold'   || phase === 'rising' || phase === 'done';
  const rising      = phase === 'rising' || phase === 'done';

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ background: '#050505', zIndex: 200 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Atmospheric cherry bloom when VERO forms */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={merged ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{
              background: [
                'radial-gradient(ellipse 80% 55% at 78% 12%, rgba(122,0,46,0.22) 0%, transparent 65%)',
                'radial-gradient(ellipse 65% 65% at 12% 88%, rgba(74,0,26,0.18) 0%, transparent 65%)',
              ].join(', '),
            }}
          />

          {/* Logo group — translates to top on "rising" */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={rising
              ? { y: riseY, scale: 0.30 }
              : { y: 0, scale: 1 }
            }
            transition={rising
              ? { duration: 1.05, ease: [0.76, 0, 0.24, 1] }
              : undefined
            }
          >
            {/* Thin vertical line */}
            <motion.div
              style={{
                position: 'absolute',
                width: 1,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                transformOrigin: 'center',
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.55), transparent)',
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={
                lineVisible
                  ? { height: 96, opacity: 1 }
                  : merged
                  ? { height: 0, opacity: 0 }
                  : { height: 0, opacity: 0 }
              }
              transition={
                lineVisible
                  ? { duration: 0.52, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.32, ease: 'easeIn' }
              }
            />

            {/* VE */}
            <motion.span
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: LOGO_FONT_SIZE,
                fontWeight: LOGO_WEIGHT,
                letterSpacing: LOGO_LETTER_SPACING,
                color: 'white',
                lineHeight: 1,
                display: 'block',
                userSelect: 'none',
              }}
              initial={{ x: 0, opacity: 0 }}
              animate={
                lettersOut ? { x: -10, opacity: 1 }
                : merged   ? { x: 0,   opacity: 1 }
                :             { x: 0,   opacity: 0 }
              }
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              VE
            </motion.span>

            {/* RO */}
            <motion.span
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: LOGO_FONT_SIZE,
                fontWeight: LOGO_WEIGHT,
                letterSpacing: LOGO_LETTER_SPACING,
                color: 'white',
                lineHeight: 1,
                display: 'block',
                userSelect: 'none',
              }}
              initial={{ x: 0, opacity: 0 }}
              animate={
                lettersOut ? { x: 10, opacity: 1 }
                : merged   ? { x: 0,  opacity: 1 }
                :             { x: 0,  opacity: 0 }
              }
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              RO
            </motion.span>

            {/* Shimmer pass — fires once on merge */}
            {merged && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.11) 50%, transparent 70%)',
                  backgroundSize: '300% 100%',
                  pointerEvents: 'none',
                }}
                initial={{ backgroundPosition: '-150% 0' }}
                animate={{ backgroundPosition: '250% 0' }}
                transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              />
            )}

            {/* Tagline beneath logo */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-2.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={holdDone ? { opacity: 0.28, y: 0 } : { opacity: 0, y: 5 }}
              transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
            >
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.5rem',
                  fontWeight: 400,
                  letterSpacing: '0.44em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                Architectural Client Portal
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
