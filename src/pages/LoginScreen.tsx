import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

/* ─── Validators ─────────────────────────────────────────────────── */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidCode(v: string) {
  return v.trim().length >= 4;
}

/* ─── Easing ─────────────────────────────────────────────────────── */
const CINEMATIC = [0.16, 1, 0.3, 1] as const;
const ENTRY = { y: 100, opacity: 0, scale: 0.9 };
const VISIBLE = { y: 0, opacity: 1, scale: 1 };

/* ─── Floating glass input field ─────────────────────────────────── */
interface FloatInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  autoCapitalize?: string;
  isCode?: boolean;
  delay?: number;
}

function FloatInput({
  label, type, placeholder, value, onChange,
  autoComplete, autoCapitalize, isCode = false, delay = 0,
}: FloatInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="w-full"
      initial={ENTRY}
      animate={VISIBLE}
      transition={{ duration: 1.1, ease: CINEMATIC, delay }}
    >
      <motion.div
        animate={
          focused
            ? {
                borderColor: 'rgba(122,0,46,0.38)',
                boxShadow: [
                  '0 28px 56px rgba(0,0,0,0.5)',
                  '0 0 0 1px rgba(255,255,255,0.04)',
                  'inset 0 1px 0 rgba(255,255,255,0.08)',
                  '0 0 60px rgba(100,0,36,0.14)',
                ].join(', '),
              }
            : {
                borderColor: 'rgba(255,255,255,0.07)',
                boxShadow: [
                  '0 20px 48px rgba(0,0,0,0.45)',
                  '0 0 0 1px rgba(255,255,255,0.03)',
                  'inset 0 1px 0 rgba(255,255,255,0.06)',
                ].join(', '),
              }
        }
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          background: focused
            ? 'rgba(255,255,255,0.052)'
            : 'rgba(255,255,255,0.036)',
          backdropFilter: 'blur(40px) saturate(160%)',
          WebkitBackdropFilter: 'blur(40px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 18,
          padding: '1.15rem 1.6rem 1.1rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s ease',
          cursor: 'text',
        }}
      >
        {/* Top-edge glass highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '8%',
            right: '8%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* Subtle cherry bloom inside when focused */}
        <motion.div
          animate={focused ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '-50%',
            right: '-20%',
            width: '60%',
            height: '140%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(100,0,36,0.18) 0%, transparent 70%)',
            filter: 'blur(24px)',
            pointerEvents: 'none',
          }}
        />

        {/* Label */}
        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.56rem',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: focused ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.24)',
            marginBottom: '0.45rem',
            lineHeight: 1,
            transition: 'color 0.3s',
          }}
        >
          {label}
        </p>

        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          spellCheck={false}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'rgba(255,255,255,0.88)',
            fontFamily: isCode ? 'Space Grotesk, sans-serif' : 'Inter, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 300,
            letterSpacing: isCode ? '0.2em' : '0.02em',
            lineHeight: 1.3,
            WebkitAppearance: 'none',
            caretColor: 'rgba(180,60,80,0.9)',
          }}
        />

        {/* Placeholder color override via CSS */}
        <style>{`
          input::placeholder { color: rgba(255,255,255,0.2); }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

/* ─── Login Screen ───────────────────────────────────────────────── */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bothFilled = email.trim().length > 0 && projectCode.trim().length > 0;
  const canSubmit   = isValidEmail(email) && isValidCode(projectCode);

 async function BrowserWindowgin(e: React.FormEvent) {
  e.preventDefault();

  if (!canSubmit || loading) return;

  setLoading(true);
  setError(null);

  try {
    const { data: codeData, error: codeError } = await supabase
      .from("project_access")
      .select("id, project_code, email")
      .eq("project_code", projectCode.trim().toUpperCase())
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    console.log("codeData:", codeData);
    console.log("codeError:", codeError);

    if (codeError) {
      throw codeError;
    }

    if (!codeData) {
      setError("Invalid project code.");
      return;
    }

    console.log("Login OK");

    if ((window as any).electronAPI?.openPractice) {
      await (window as any).electronAPI.openPractice();
    } else {
      console.error("electronAPI.openPractice not found");
    }
  } catch (err) {
    console.error(err);
    setError("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
      <form
        onSubmit={BrowserWindowgin}
        className="flex flex-col items-center w-full"
        style={{ maxWidth: 380, padding: '0 1.5rem', transform: 'translateY(4%)' }}
      >

        {/* ── Logo ──────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center"
          style={{ position: 'relative' }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: CINEMATIC, delay: 0.05 }}
        >
          {/* Glow behind logo */}
          <div
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -54%)',
              width: '220%', height: '340%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(122,0,46,0.13) 0%, rgba(80,0,30,0.05) 50%, transparent 72%)',
              filter: 'blur(28px)',
              pointerEvents: 'none',
            }}
          />
          <span
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 5.5vw, 3.02rem)',
              fontWeight: 300,
              letterSpacing: '0.7em',
              color: 'rgba(255,255,255,0.93)',
              lineHeight: 1,
              paddingRight: '0.7em',
              position: 'relative',
            }}
          >
            VERO
          </span>

          {/* Cherry underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: CINEMATIC, delay: 0.3 }}
            style={{
              width: '140%',
              height: 1,
              marginTop: '0.75rem',
              background: 'linear-gradient(90deg, transparent, rgba(140,0,52,0.55), rgba(180,20,60,0.3), transparent)',
              transformOrigin: 'center',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.52rem',
              fontWeight: 400,
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginTop: '0.85rem',
            }}
          >
            Architectural Client Portal
          </motion.p>
        </motion.div>

        {/* ── Spacer ────────────────────────────────────────────── */}
        <div style={{ height: 'clamp(2rem, 4vh, 2.8rem)' }} />

        {/* ── Email input ───────────────────────────────────────── */}
        <FloatInput
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          autoCapitalize="none"
          delay={0.12}
        />

        {/* ── Gap ───────────────────────────────────────────────── */}
        <div style={{ height: '0.85rem' }} />

        {/* ── Project code input ────────────────────────────────── */}
        <FloatInput
          label="Project Code"
          type="text"
          placeholder="VR-234"
          value={projectCode}
          onChange={v => setProjectCode(v.toUpperCase())}
          autoComplete="off"
          autoCapitalize="characters"
          isCode
          delay={0.42}
        />

        {/* ── Error ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -8, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto', marginTop: '0.85rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full overflow-hidden"
            >
              <div
                style={{
                  background: 'rgba(122,0,46,0.1)',
                  border: '1px solid rgba(122,0,46,0.22)',
                  borderRadius: 12,
                  padding: '0.75rem 1.25rem',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  color: 'rgba(255,190,190,0.85)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.5,
                }}>
                  {error}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Enter button — emerges when both fields are valid ─── */}
        <AnimatePresence mode="wait">
          {bothFilled && (
            <motion.div
              key="btn"
              className="w-full"
              initial={{ y: 60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.9, ease: CINEMATIC }}
              style={{ marginTop: '1.5rem' }}
            >
              <motion.button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  borderRadius: 9999,
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: loading
                    ? '#12070c'
                    : 'linear-gradient(135deg, #1b0b12, #2a1019, #12070c)',
                  color: 'rgba(255,255,255,0.92)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: [
                    '0 20px 56px rgba(0,0,0,0.72)',
                    '0 8px 24px rgba(12,4,8,0.65)',
                    'inset 0 1px 0 rgba(255,255,255,0.09)',
                    'inset 0 -1px 0 rgba(0,0,0,0.35)',
                  ].join(', '),
                }}
                whileHover={loading ? {} : {
                  background: 'linear-gradient(135deg, #241019, #36121f, #1a0910)',
                  y: -2,
                  boxShadow: [
                    '0 28px 72px rgba(0,0,0,0.80)',
                    '0 10px 32px rgba(18,6,12,0.70)',
                    'inset 0 1px 0 rgba(255,255,255,0.11)',
                    'inset 0 -1px 0 rgba(0,0,0,0.4)',
                  ].join(', '),
                }}
                whileTap={loading ? {} : { scale: 0.975, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                {/* Gloss reflection — top half highlight */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '52%',
                    borderRadius: '9999px 9999px 0 0',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.07) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Shimmer sweep */}
                {!loading && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(100deg, transparent 28%, rgba(255,255,255,0.055) 50%, transparent 72%)',
                      borderRadius: 9999,
                    }}
                    initial={{ x: '-130%' }}
                    animate={{ x: '230%' }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', delay: 1.2 }}
                  />
                )}

                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <svg
                      style={{ animation: 'spin 0.9s linear infinite' }}
                      width="13" height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.22)" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="rgba(255,255,255,0.82)" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Authenticating
                  </span>
                ) : (
                  'Enter Project Space'
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          style={{
            marginTop: canSubmit ? '2rem' : '2.5rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.52rem',
            fontWeight: 400,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.11)',
            textAlign: 'center',
            transition: 'margin 0.4s ease',
          }}
        >
          VERO &mdash; Private Access Only
        </motion.p>

      </form>
    </div>
  );
}
