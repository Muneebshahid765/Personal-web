import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ExternalLink, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import AnimatedHeading from '../components/AnimatedHeading';
import { useQuery } from '@tanstack/react-query';

interface ProjectsProps {
  selectedProjectId: string | null;
  onSelectProject: (projectId: string | null) => void;
  isDarkMode: boolean;
}

export default function Projects({ selectedProjectId, onSelectProject, isDarkMode }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('All');

  const { data: projectsList = [] } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });

  const categories = ['All', '3D Websites', 'Mobile UX/UI', 'Branding & Web', 'Website Optimization'];

  // Handle Filtering
  const filteredProjects = filter === 'All'
    ? projectsList
    : projectsList.filter(p => p.category === filter);

  // Find currently open project case-study
  const activeProject = projectsList.find(p => p.id === selectedProjectId) || null;

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="space-y-6 pb-8 border-b border-neutral-200 dark:border-white/10 mb-12">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          ● ARCHIVE / CREATIVE PORTFOLIO
        </span>
        <AnimatedHeading text="BESPOKE CASE STUDIES" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white" />
        <p className="text-sm md:text-base text-neutral-600 dark:text-[#a1a1aa] max-w-2xl leading-relaxed">
          Explore our selective gallery of interactive websites, robust data visualization dashboards, and luxury brand identities optimized for high speed and tactical responsive layouts.
        </p>
      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase cursor-pointer border transition-all duration-300 ${
              filter === cat
                ? 'bg-[#00f2fe] text-black border-[#00f2fe] font-bold shadow-lg shadow-[#00f2fe]/20'
                : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-zinc-400 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ================= PORTFOLIO GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => onSelectProject(project.id)}
              className="project-card group cursor-pointer flex flex-col space-y-4"
            >
              {/* Media Container */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-zinc-900 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Visual Glow overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#00f2fe] text-black font-mono font-bold text-[10px] tracking-widest px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-xl scale-95 group-hover:scale-100 transition-transform duration-300 uppercase">
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Left tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[9px] font-mono tracking-widest bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full uppercase border border-white/5">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex justify-between items-baseline pt-2">
                <h3 className="text-xl md:text-2xl font-sans font-black tracking-tight text-neutral-900 dark:text-white group-hover:text-[#00f2fe] transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-neutral-500 dark:text-[#71717a]">{project.year}</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed line-clamp-2">
                {project.subtitle}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono tracking-wider bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-neutral-700 dark:text-zinc-300 px-2 py-0.5 rounded-full uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ================= CASE STUDY DETAIL OVERLAY MODAL ================= */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            id="case-study-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl p-4 md:p-8 overflow-y-auto"
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="w-full max-w-5xl rounded-3xl bg-white/95 dark:bg-[#0d0d0f]/95 border border-neutral-200 dark:border-white/15 overflow-hidden text-left shadow-2xl relative flex flex-col max-h-[90vh] backdrop-blur-2xl"
            >
              
              {/* Sticky Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 md:px-8 border-b border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-[#0d0d0f]/95 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00f2fe] tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>CASE STUDY PORTFOLIO</span>
                </div>
                <button
                  id="close-modal-btn"
                  onClick={() => onSelectProject(null)}
                  className="cursor-pointer p-2 rounded-full hover:bg-neutral-150 dark:hover:bg-white/10 text-neutral-800 dark:text-white transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-10 space-y-8 overflow-y-auto">
                
                {/* Hero Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
                      {activeProject.title}
                    </h2>
                    <p className="text-sm font-sans text-[#00f2fe] tracking-wide font-medium">
                      {activeProject.subtitle}
                    </p>

                    {/* Metadata strip */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-white/5 font-mono text-xs">
                      <div>
                        <div className="text-neutral-500 dark:text-[#71717a] uppercase mb-1">CLIENT</div>
                        <div className="text-neutral-900 dark:text-white font-bold">{activeProject.client}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 dark:text-[#71717a] uppercase mb-1">TIMELINE</div>
                        <div className="text-neutral-900 dark:text-white font-bold">{activeProject.year}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 dark:text-[#71717a] uppercase mb-1">INDUSTRY</div>
                        <div className="text-neutral-900 dark:text-white font-bold uppercase">{activeProject.category}</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-[#121214]">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution (split layout) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200 dark:border-white/5">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">THE CHALLENGE</h4>
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                      {activeProject.challenge}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-emerald-500 dark:text-emerald-400 tracking-widest uppercase">THE SOLUTION</h4>
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Case study Results & Stack */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200 dark:border-white/5">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono text-amber-500 dark:text-yellow-400 tracking-widest uppercase">DELIVERABLES & METRICS</h4>
                    <ul className="space-y-3">
                      {activeProject.results.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-850 dark:text-white">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-mono text-neutral-500 dark:text-[#71717a] tracking-widest uppercase">TECHNOLOGY STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-xl text-xs font-mono bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer Bar */}
              <div className="px-6 py-4 md:px-8 border-t border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-[#0d0d0f]/95 flex justify-end gap-3 sticky bottom-0">
                <button
                  onClick={() => onSelectProject(null)}
                  className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-[#a1a1aa] hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
                >
                  RETURN TO ARCHIVE
                </button>
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="cursor-pointer flex items-center gap-1 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase bg-[#00f2fe] text-black font-bold hover:bg-[#00d0db] transition-colors duration-300"
                  >
                    <span>LAUNCH PROJECT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
