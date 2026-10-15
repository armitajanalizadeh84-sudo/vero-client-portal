import { motion } from 'framer-motion';
import { Moon, Bell, Globe, Shield, LogOut } from 'lucide-react';
import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { profile, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Settings" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Settings
          </h1>
          <div className="divider mt-5" />
        </motion.div>

        {/* Profile */}
        <motion.div
          className="glass-card p-6 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Account
          </p>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: 'rgba(122,0,46,0.2)', border: '1px solid rgba(122,0,46,0.3)' }}
            >
              {(profile?.full_name || profile?.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 300, color: 'white', letterSpacing: '0.04em' }}>
                {profile?.full_name || 'Client'}
              </p>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.15rem' }}>
                {profile?.email}
              </p>
            </div>
            <div
              className="ml-auto px-2.5 py-1 rounded-full flex-shrink-0"
              style={{ background: 'rgba(122,0,46,0.15)', border: '1px solid rgba(122,0,46,0.25)' }}
            >
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(122,0,46,0.8)', textTransform: 'uppercase' }}>
                {profile?.role}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          className="glass-card p-6 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Preferences
          </p>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Dark Mode', icon: Moon, value: true, toggle: false },
              { label: 'Notifications', icon: Bell, value: notifications, toggle: true, onToggle: () => setNotifications(v => !v) },
              { label: 'Language', icon: Globe, extra: 'English' },
            ].map(({ label, icon: Icon, value, toggle, onToggle, extra }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon size={15} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>
                    {label}
                  </span>
                </div>
                {toggle !== undefined ? (
                  <button
                    onClick={onToggle}
                    className="relative w-9 h-5 rounded-full transition-all duration-300 flex-shrink-0"
                    style={{ background: value ? 'rgba(122,0,46,0.8)' : 'rgba(255,255,255,0.1)' }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300"
                      style={{ transform: value ? 'translateX(18px)' : 'translateX(2px)' }}
                    />
                  </button>
                ) : (
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
                    {extra}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          className="glass-card p-6 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <Shield size={15} color="rgba(255,255,255,0.4)" />
            <div>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>
                Privacy &amp; Security
              </p>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.15rem', lineHeight: 1.5 }}>
                Your data is end-to-end encrypted. This portal is accessible only with your project code.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sign out */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(122,0,46,0.08)',
              border: '1px solid rgba(122,0,46,0.2)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(122,0,46,0.7)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(122,0,46,0.15)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(122,0,46,0.9)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(122,0,46,0.08)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(122,0,46,0.7)';
            }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </motion.div>

        <motion.p
          className="text-center mt-8"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.55rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          VERO v1.0 &mdash; Build 2025
        </motion.p>
      </div>
    </div>
  );
}
