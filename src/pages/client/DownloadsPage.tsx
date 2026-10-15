import { motion } from 'framer-motion';
import { Download, Archive, FileText, Cpu, HardDrive } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_DOWNLOADS } from '../../data/mockData';

function formatBytes(bytes: number | null) {
  if (!bytes) return '';
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

const TYPE_ICONS: Record<string, typeof Download> = {
  executable: Cpu,
  pdf: FileText,
  archive: Archive,
};

export default function DownloadsPage() {
  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Downloads" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Downloads
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            {MOCK_DOWNLOADS.length} Available Files
          </p>
          <div className="divider mt-5" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {MOCK_DOWNLOADS.map((item) => {
            const IconComponent = TYPE_ICONS[item.file_type || ''] || Download;
            return (
              <motion.a
                key={item.id}
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
                }}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', y: -1 }}
              >
                <div className="p-5 sm:p-6 flex items-center gap-5">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                      background: 'rgba(122,0,46,0.1)',
                      border: '1px solid rgba(122,0,46,0.2)',
                    }}
                  >
                    <IconComponent size={22} color="rgba(122,0,46,0.8)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 300, color: 'white', letterSpacing: '0.03em', marginBottom: '0.25rem' }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      {item.file_name && (
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
                          {item.file_name}
                        </span>
                      )}
                      {item.file_size && (
                        <span
                          className="flex items-center gap-1"
                          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}
                        >
                          <HardDrive size={9} />
                          {formatBytes(item.file_size)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(122,0,46,0.3)', border: '1px solid rgba(122,0,46,0.4)' }}
                  >
                    <Download size={15} color="rgba(255,255,255,0.8)" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
