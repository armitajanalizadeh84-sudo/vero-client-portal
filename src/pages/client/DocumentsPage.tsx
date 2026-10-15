import { motion } from 'framer-motion';
import { FileText, Download as DlIcon, Tag } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import { MOCK_DOCUMENTS } from '../../data/mockData';

const CATEGORY_COLORS: Record<string, string> = {
  drawings: 'rgba(122,0,46,0.7)',
  engineering: 'rgba(60,80,180,0.7)',
  interiors: 'rgba(60,140,100,0.7)',
  legal: 'rgba(180,120,40,0.7)',
  general: 'rgba(255,255,255,0.3)',
};

function formatBytes(bytes: number | null) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
}

export default function DocumentsPage() {
  const categories = [...new Set(MOCK_DOCUMENTS.map(d => d.category))];

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar title="Documents" showBack backTo="/project" />

      <div className="pt-20 pb-12 px-4 sm:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.08em', color: 'white' }}>
            Documents
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            {MOCK_DOCUMENTS.length} Files &mdash; Secure Downloads
          </p>
          <div className="divider mt-5" />
        </motion.div>

        {categories.map((category, ci) => (
          <motion.div
            key={category}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[category] || CATEGORY_COLORS.general }} />
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                {category}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {MOCK_DOCUMENTS.filter(d => d.category === category).map((doc, idx) => (
                <motion.a
                  key={doc.id}
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl px-4 py-4 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    textDecoration: 'none',
                  }}
                  whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <FileText size={16} color="rgba(255,255,255,0.5)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 400, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>
                      {doc.title}
                    </p>
                    {doc.description && (
                      <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                        {doc.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {doc.file_size && (
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
                        {formatBytes(doc.file_size)}
                      </span>
                    )}
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(122,0,46,0.3)', border: '1px solid rgba(122,0,46,0.4)' }}
                    >
                      <DlIcon size={13} color="rgba(255,255,255,0.8)" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
