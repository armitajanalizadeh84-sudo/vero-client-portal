import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_PROJECT } from '../../data/mockData';

export default function ContactPage() {
  const [form, setForm] = useState({ subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Contact" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Contact
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            Reach your project team
          </p>
          <div className="divider mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card p-6 h-full">
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Your Architect
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: 'white', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                {MOCK_PROJECT.architect}
              </h2>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginBottom: '2rem' }}>
                Lead Architect &mdash; {MOCK_PROJECT.name}
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail, label: 'studio@vantablack.com', href: 'mailto:studio@vantablack.com' },
                  { icon: Phone, label: '+351 21 000 0000', href: 'tel:+351210000000' },
                  { icon: MapPin, label: MOCK_PROJECT.location || '', href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 group"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <Icon size={14} color="rgba(255,255,255,0.4)" />
                    </div>
                    <span
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.5)',
                        transition: 'color 0.2s',
                      }}
                      className="group-hover:text-white"
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Message form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 h-full flex flex-col items-center justify-center text-center"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full mb-4"
                  style={{ background: 'rgba(100,200,120,0.1)', border: '1px solid rgba(100,200,120,0.3)' }}
                >
                  <Send size={22} color="rgba(100,200,120,0.8)" />
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'white', marginBottom: '0.5rem' }}>
                  Message Sent
                </h3>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                  Your team will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost mt-6"
                >
                  New Message
                </button>
              </motion.div>
            ) : (
              <form className="glass-card p-6" onSubmit={handleSubmit}>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  Send a Message
                </p>

                <div className="mb-4">
                  <label className="label-vero">Subject</label>
                  <input
                    type="text"
                    className="input-vero"
                    placeholder="What's on your mind?"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="label-vero">Message</label>
                  <textarea
                    className="input-vero"
                    style={{ minHeight: 120, resize: 'vertical' }}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={13} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
