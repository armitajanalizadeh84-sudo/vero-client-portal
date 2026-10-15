import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid, FolderOpen, Users, Upload, Settings,
  Plus, ArrowRight, Layers, Key, ChevronRight,
  TrendingUp, Clock, CheckCircle, Archive
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TopBar from '../../components/layout/TopBar';

const ADMIN_NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'assets', label: 'Assets', icon: Upload },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const MOCK_STATS = [
  { label: 'Active Projects', value: '12', icon: Layers, change: '+2 this month' },
  { label: 'Active Clients', value: '34', icon: Users, change: '+5 this month' },
  { label: 'Files Uploaded', value: '1,247', icon: Upload, change: '+89 this week' },
  { label: 'Completion Rate', value: '78%', icon: TrendingUp, change: '4 completing soon' },
];

const MOCK_PROJECTS = [
  { id: 'p1', name: 'Residence Noir', location: 'Sintra, Portugal', status: 'active', clients: 2, progress: 72, type: 'Private Residence' },
  { id: 'p2', name: 'Casa Lux', location: 'Cascais, Portugal', status: 'active', clients: 1, progress: 45, type: 'Private Residence' },
  { id: 'p3', name: 'Studio Obsidian', location: 'Lisbon, Portugal', status: 'active', clients: 3, progress: 18, type: 'Commercial' },
  { id: 'p4', name: 'Villa Meridian', location: 'Algarve, Portugal', status: 'draft', clients: 0, progress: 0, type: 'Private Residence' },
  { id: 'p5', name: 'Tower One', location: 'Porto, Portugal', status: 'archived', clients: 4, progress: 100, type: 'Commercial' },
];

function ProjectRow({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  const statusColors: Record<string, string> = {
    active: 'rgba(100,200,120,0.8)',
    draft: 'rgba(200,180,60,0.8)',
    archived: 'rgba(255,255,255,0.25)',
  };

  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer group"
      style={{ border: '1px solid rgba(255,255,255,0.05)' }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(122,0,46,0.1)', border: '1px solid rgba(122,0,46,0.2)' }}
      >
        <FolderOpen size={16} color="rgba(122,0,46,0.8)" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3 }}>
            {project.name}
          </p>
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: statusColors[project.status] }}
          />
        </div>
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
          {project.location} &bull; {project.type}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-6">
        <div className="text-right">
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
            {project.clients} client{project.clients !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="w-20">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${project.progress}%`,
                background: project.progress === 100 ? 'rgba(100,200,120,0.7)' : 'linear-gradient(90deg, #4A001A, #7A002E)',
              }}
            />
          </div>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', marginTop: '0.25rem', textAlign: 'right' }}>
            {project.progress}%
          </p>
        </div>
      </div>
      <ChevronRight size={14} color="rgba(255,255,255,0.2)" className="flex-shrink-0 group-hover:text-white/50 transition-colors" />
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh" style={{ position: 'relative', zIndex: 1 }}>
      <TopBar />

      <div className="pt-14">
        <div className="flex h-[calc(100dvh-56px)]">

          {/* Sidebar */}
          <motion.aside
            className="hidden lg:flex flex-col w-56 flex-shrink-0 border-r"
            style={{
              background: 'rgba(11,11,11,0.95)',
              borderColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ x: -56, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Administrator
              </p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 300, color: 'white', letterSpacing: '0.04em' }}>
                {profile?.full_name || profile?.email?.split('@')[0]}
              </p>
            </div>
            <nav className="flex-1 p-3">
              {ADMIN_NAV.map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 text-left"
                    style={{
                      background: isActive ? 'rgba(122,0,46,0.15)' : 'transparent',
                      border: isActive ? '1px solid rgba(122,0,46,0.25)' : '1px solid transparent',
                    }}
                  >
                    <Icon size={15} color={isActive ? 'rgba(122,0,46,0.9)' : 'rgba(255,255,255,0.35)'} />
                    <span
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.78rem',
                        fontWeight: 400,
                        color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <button
                onClick={() => navigate('/project')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
              >
                <ArrowRight size={13} color="rgba(255,255,255,0.3)" />
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                  Client View
                </span>
              </button>
            </div>
          </motion.aside>

          {/* Mobile nav */}
          <div
            className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 py-2 z-50"
            style={{
              background: 'rgba(5,5,5,0.95)',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))',
            }}
          >
            {ADMIN_NAV.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="flex flex-col items-center gap-1 px-3 py-1.5"
                >
                  <Icon size={18} color={isActive ? 'rgba(122,0,46,0.9)' : 'rgba(255,255,255,0.3)'} />
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.55rem', letterSpacing: '0.08em', color: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 max-w-5xl"
              >
                {activeSection === 'overview' && (
                  <div>
                    <div className="mb-8">
                      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'white', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                        Overview
                      </h1>
                      <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        VERO Administration
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                      {MOCK_STATS.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div
                            key={stat.label}
                            className="glass-card p-5"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Icon size={16} color="rgba(122,0,46,0.7)" />
                            </div>
                            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'white', lineHeight: 1 }}>
                              {stat.value}
                            </p>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.4rem', lineHeight: 1.3 }}>
                              {stat.label}
                            </p>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.55rem', color: 'rgba(122,0,46,0.6)', marginTop: '0.25rem', letterSpacing: '0.05em' }}>
                              {stat.change}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Recent projects */}
                    <div className="glass-card p-6">
                      <div className="flex items-center justify-between mb-5">
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                          Recent Projects
                        </p>
                        <button
                          className="flex items-center gap-1.5"
                          onClick={() => setActiveSection('projects')}
                          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.6rem', color: 'rgba(122,0,46,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                        >
                          View All
                          <ArrowRight size={11} />
                        </button>
                      </div>
                      <div className="flex flex-col gap-2">
                        {MOCK_PROJECTS.slice(0, 4).map(p => <ProjectRow key={p.id} project={p} />)}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'projects' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'white', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                          Projects
                        </h1>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                          {MOCK_PROJECTS.length} Total
                        </p>
                      </div>
                      <button className="btn-primary flex items-center gap-2">
                        <Plus size={13} />
                        New Project
                      </button>
                    </div>
                    <div className="glass-card p-4">
                      <div className="flex flex-col gap-2">
                        {MOCK_PROJECTS.map(p => <ProjectRow key={p.id} project={p} />)}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'clients' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'white', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                          Clients
                        </h1>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                          Access Management
                        </p>
                      </div>
                      <button className="btn-primary flex items-center gap-2">
                        <Plus size={13} />
                        New Client
                      </button>
                    </div>
                    <div className="glass-card p-6">
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div
                          className="w-16 h-16 flex items-center justify-center rounded-full mb-4"
                          style={{ background: 'rgba(122,0,46,0.1)', border: '1px solid rgba(122,0,46,0.2)' }}
                        >
                          <Key size={22} color="rgba(122,0,46,0.6)" />
                        </div>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
                          Client Management
                        </p>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', maxWidth: '28ch', lineHeight: 1.7 }}>
                          Create project codes, invite clients, and manage access permissions from here.
                        </p>
                        <button className="btn-primary mt-6 flex items-center gap-2">
                          <Plus size={13} />
                          Create Project Code
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'assets' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'white', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                          Assets
                        </h1>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                          File Management
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Gallery', count: 47, icon: '🖼️', desc: 'Images and renders', color: 'rgba(122,0,46,0.1)', borderColor: 'rgba(122,0,46,0.2)' },
                        { label: 'Videos', count: 8, icon: '🎬', desc: 'Film and animations', color: 'rgba(60,120,200,0.08)', borderColor: 'rgba(60,120,200,0.2)' },
                        { label: 'Documents', count: 23, icon: '📄', desc: 'PDFs and drawings', color: 'rgba(60,160,80,0.08)', borderColor: 'rgba(60,160,80,0.2)' },
                        { label: 'Plans', count: 12, icon: '📐', desc: 'Floor plans and sections', color: 'rgba(180,120,40,0.08)', borderColor: 'rgba(180,120,40,0.2)' },
                        { label: 'Interactive', count: 3, icon: '💻', desc: 'VR and pixel streaming', color: 'rgba(100,60,200,0.08)', borderColor: 'rgba(100,60,200,0.2)' },
                        { label: 'Downloads', count: 9, icon: '📦', desc: 'Packages and archives', color: 'rgba(60,160,180,0.08)', borderColor: 'rgba(60,160,180,0.2)' },
                      ].map(({ label, count, icon, desc, color, borderColor }) => (
                        <motion.button
                          key={label}
                          className="glass-card p-5 text-left flex items-center gap-4"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-xl text-xl flex-shrink-0"
                            style={{ background: color, border: `1px solid ${borderColor}` }}
                          >
                            {icon}
                          </div>
                          <div className="flex-1">
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                              {label}
                            </p>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.15rem' }}>
                              {desc}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}>
                              {count}
                            </p>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                              files
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-8">
                      <div
                        className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 cursor-pointer transition-all duration-300 hover:border-cherry/40"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(122,0,46,0.3)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                      >
                        <div
                          className="w-14 h-14 flex items-center justify-center rounded-full mb-4"
                          style={{ background: 'rgba(122,0,46,0.1)', border: '1px solid rgba(122,0,46,0.2)' }}
                        >
                          <Upload size={22} color="rgba(122,0,46,0.7)" />
                        </div>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>
                          Upload Files
                        </p>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
                          Drag & drop or click to select
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'settings' && (
                  <div>
                    <div className="mb-8">
                      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'white', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                        Settings
                      </h1>
                      <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        System Configuration
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: 'Branding', desc: 'Logo, colors, and typography', icon: Layers },
                        { label: 'Notifications', desc: 'Email and push notification settings', icon: Clock },
                        { label: 'Access Codes', desc: 'Manage project access codes', icon: Key },
                        { label: 'Archive Projects', desc: 'Move completed projects to archive', icon: Archive },
                      ].map(({ label, desc, icon: Icon }) => (
                        <motion.button
                          key={label}
                          className="glass-card p-5 text-left flex items-center gap-4 group"
                          whileHover={{ scale: 1.005 }}
                        >
                          <div
                            className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                          >
                            <Icon size={16} color="rgba(255,255,255,0.4)" />
                          </div>
                          <div className="flex-1">
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
                              {label}
                            </p>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.15rem' }}>
                              {desc}
                            </p>
                          </div>
                          <ChevronRight size={14} color="rgba(255,255,255,0.2)" className="flex-shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
