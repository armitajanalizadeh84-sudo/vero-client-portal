import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backTo?: string;
  transparent?: boolean;
}

export default function TopBar({ title, showBack, backTo = '/', transparent = false }: TopBarProps) {
  const navigate = useNavigate();
  const { signOut, isAdmin } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/project';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8"
      style={{
        height: 56,
        background: transparent ? 'transparent' : 'rgba(5,5,5,0.85)',
        backdropFilter: transparent ? 'none' : 'blur(20px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.06)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        <AnimatePresence mode="wait">
          {showBack && !isHome ? (
            <motion.button
              key="back"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              onClick={() => navigate(backTo)}
              className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
              style={{ fontSize: '0.75rem', letterSpacing: '0.08em', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <ChevronLeft size={15} />
              Back
            </motion.button>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  letterSpacing: '0.4em',
                  color: 'white',
                }}
              >
                VERO
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center title */}
      <AnimatePresence mode="wait">
        {title && (
          <motion.div
            key={title}
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right */}
      <div className="flex items-center gap-2">
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="btn-ghost px-3 py-1.5 text-xs hidden sm:block"
            style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}
          >
            Admin
          </button>
        )}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onClick={() => navigate('/settings')}
        >
          <Settings size={16} />
        </button>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onClick={signOut}
        >
          <LogOut size={16} />
        </button>
      </div>
    </motion.header>
  );
}
