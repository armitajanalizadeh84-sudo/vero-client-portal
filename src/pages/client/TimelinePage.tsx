import { motion } from 'framer-motion';
import { CheckCircle, Circle, Loader, Calendar } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_TIMELINE } from '../../data/mockData';

const STATUS_CONFIG = {
  completed: {
    icon: CheckCircle,
    color: 'rgba(100,200,120,0.8)',
    dotColor: '#4ade80',
    label: 'Completed',
  },
  in_progress: {
    icon: Loader,
    color: 'rgba(122,0,46,0.9)',
    dotColor: '#7A002E',
    label: 'In Progress',
  },
  upcoming: {
    icon: Circle,
    color: 'rgba(255,255,255,0.25)',
    dotColor: 'rgba(255,255,255,0.2)',
    label: 'Upcoming',
  },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', day: 'numeric' });
}

export default function TimelinePage() {
  const completedCount = MOCK_TIMELINE.filter(e => e.status === 'completed').length;
  const totalCount = MOCK_TIMELINE.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Timeline" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Timeline
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            {completedCount} of {totalCount} Milestones Complete
          </p>
          <div className="divider mt-5" />

          {/* Progress bar */}
          <div className="mt-6 mb-2 flex items-center justify-between">
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Overall Progress
            </span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
              {progress}%
            </span>
          </div>
          <div className="h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #4A001A, #7A002E)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />

          {MOCK_TIMELINE.map((event, idx) => {
            const cfg = STATUS_CONFIG[event.status];
            const Icon = cfg.icon;

            return (
              <motion.div
                key={event.id}
                className="relative mb-8 last:mb-0"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Dot on line */}
                <div
                  className="absolute -left-6 top-1 w-3 h-3 rounded-full -translate-x-1/2 flex items-center justify-center"
                  style={{
                    background: event.status === 'in_progress' ? '#7A002E' : event.status === 'completed' ? '#4ade80' : '#0B0B0B',
                    border: `1px solid ${cfg.dotColor}`,
                    boxShadow: event.status === 'in_progress' ? '0 0 12px rgba(122,0,46,0.6)' : 'none',
                  }}
                >
                  {event.status === 'in_progress' && (
                    <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: '#7A002E' }} />
                  )}
                </div>

                <div
                  className="rounded-xl p-4 sm:p-5 transition-all duration-300"
                  style={{
                    background: event.status === 'in_progress'
                      ? 'rgba(122,0,46,0.08)'
                      : 'rgba(255,255,255,0.02)',
                    border: event.status === 'in_progress'
                      ? '1px solid rgba(122,0,46,0.2)'
                      : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.1rem',
                          fontWeight: 300,
                          color: event.status === 'upcoming' ? 'rgba(255,255,255,0.45)' : 'white',
                          letterSpacing: '0.04em',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {event.title}
                      </h3>
                      {event.description && (
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                          {event.description}
                        </p>
                      )}
                    </div>
                    <div
                      className="flex items-center gap-1.5 flex-shrink-0 px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <Icon size={10} color={cfg.color} />
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.55rem', letterSpacing: '0.1em', color: cfg.color, textTransform: 'uppercase' }}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <Calendar size={10} color="rgba(255,255,255,0.25)" />
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
                      {formatDate(event.event_date)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
