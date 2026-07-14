import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight, ChevronLeft, Star, Heart, Flame, Shield, Compass, Sparkles } from 'lucide-react';
import { PageId, Project, Article } from '../types';
import AnimatedHeading from '../components/AnimatedHeading';
import Marquee from '../components/Marquee';
import { useState } from 'react';

interface HomeProps {
  onPageChange: (page: PageId) => void;
  onSelectProject: (projectId: string) => void;
  isDarkMode: boolean;
}

export default function Home({ onPageChange, onSelectProject, isDarkMode }: HomeProps) {
  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      quote: "Muneeb did not just build our platform—he created a digital artifact. The WebGL interface is incredibly fast, and clients are constantly complimenting our brand's tactile depth on mobile.",
      author: "Evelyn Sterling",
      role: "Design Director, Aetheric Inc.",
      rating: 5,
    },
    {
      quote: "His command of custom shaders and React performance is staggering. We went from dropping frames on older devices to running a heavy 3D scene at a stable 60 FPS across all clients.",
      author: "Dr. Kenji Sato",
      role: "Founder, OmniSphere Arts",
      rating: 5,
    },
    {
      quote: "A masterclass in modern digital design. Muneeb understands branding, copywriting, and raw coding at an elite level. Our skincares storefront sales rose by 180% post-relaunch.",
      author: "Charlotte Dubois",
      role: "Marketing Head, Lumina Luxury",
      rating: 5,
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const { data: projectsList = [] } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });

  const { data: articlesList = [] } = useQuery<Article[]>({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });

  // Featured projects
  const featuredList = projectsList.filter(p => p.featured);

  return (
    <div className={`relative w-full overflow-hidden transition-colors duration-500`}>
      
      {/* ================= HERO SECTION ================= */}
      <section id="hero-section" className="min-h-screen flex flex-col justify-center items-center px-6 relative pt-24 pb-12">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle overlay glow behind the text */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-[#00f2fe]/10 rounded-full blur-[100px] md:blur-[160px]" />
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-current/10 bg-white/5 backdrop-blur-md text-xs font-mono tracking-widest text-[#00f2fe]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AWWWARDS NOMINEE PORTFOLIO
          </motion.div>

          {/* Epic Main Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter leading-[0.95] text-neutral-900 dark:text-white">
              CRAFTING SCALABLE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe]">
                SYSTEMS & UIs
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-lg text-neutral-600 dark:text-[#a1a1aa] font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Senior Full-Stack Architect designing bulletproof database models, high-performance backends, and immersive kinetic React frontends.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-4 pt-4"
          >
            <button
              onClick={() => onPageChange('projects')}
              className="cursor-pointer group relative flex items-center gap-2 bg-[#00f2fe] hover:bg-[#00d0db] text-black font-mono font-bold text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#00f2fe]/20 hover:shadow-[#00f2fe]/40 hover:scale-[1.03]"
            >
              EXPLORE WORKS
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="cursor-pointer group relative flex items-center gap-2 border border-neutral-200 dark:border-white/20 hover:border-neutral-400 dark:hover:border-white/40 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-neutral-800 dark:text-white font-mono font-bold text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
            >
              START COLLAB
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-[#71717a] pointer-events-none"
        >
          <span>SCROLL DOWN</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#00f2fe] to-transparent" />
        </motion.div>
      </section>

      {/* ================= INFINITE MARQUEE ================= */}
      <Marquee speed={22} text={['SYSTEM ARCHITECTURE', 'SCALABLE APIs', 'POSTGRESQL & REDIS', 'NODE.JS & EXPRESS', 'FULL-STACK EXPERTISE', 'INTERACTIVE WEBGL', 'REACT 19']} />

      {/* ================= ABOUT PREVIEW ================= */}
      <section id="about-preview-section" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block (Lg span 5) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
              ● THE SYSTEM ARCHITECT
            </span>
            <AnimatedHeading text="ROBUST BACKEND, FLUID INTERFACES" className="text-3xl md:text-5xl font-sans font-black tracking-tight text-neutral-900 dark:text-white leading-tight" />
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#a1a1aa]' : 'text-slate-600'}`}>
              With backend engineering at the core, we architect high-performance data pipelines, secure user access layers, and optimize database queries to serve millions of requests with sub-millisecond latencies.
            </p>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#71717a]' : 'text-slate-500'}`}>
              But we don't stop at the database. We bridge that raw backend logic with stunning, fluid frontend designs, custom 3D mesh shaders, and responsive UI layouts that execute flawlessly.
            </p>
            <div>
              <button
                onClick={() => onPageChange('about')}
                className="cursor-pointer group inline-flex items-center gap-2 text-xs font-mono text-[#00f2fe] tracking-widest uppercase border-b border-[#00f2fe]/40 pb-1.5 hover:border-[#00f2fe] transition-colors duration-300"
              >
                READ THE JOURNEY
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Bento Grid (Lg span 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            
            {/* Bento Card 1: System Design Focus */}
            <div className={`p-8 rounded-2xl border backdrop-blur-md space-y-4 transition-colors duration-500 ${
              isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-black/5 text-slate-800'
            }`}>
              <Compass className="w-8 h-8 text-[#00f2fe] stroke-[1.5]" />
              <h4 className="text-lg font-sans font-bold tracking-tight">Backend Scalability</h4>
              <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                Robust microservice engines, connection-pool optimization, and structured SQL/NoSQL databases.
              </p>
            </div>

            {/* Bento Card 2: Interactive Dev */}
            <div className={`p-8 rounded-2xl border backdrop-blur-md space-y-4 transition-colors duration-500 ${
              isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-black/5 text-slate-800'
            }`}>
              <Flame className="w-8 h-8 text-orange-400 stroke-[1.5]" />
              <h4 className="text-lg font-sans font-bold tracking-tight">Full-Stack Magic</h4>
              <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                Clean, modern REST & GraphQL APIs tied directly into real-time interactive React client states.
              </p>
            </div>

            {/* Bento Card 3: Brand Crafting */}
            <div className={`p-8 rounded-2xl border backdrop-blur-md space-y-4 transition-colors duration-500 ${
              isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-black/5 text-slate-800'
            }`}>
              <Shield className="w-8 h-8 text-[#00f2fe] stroke-[1.5]" />
              <h4 className="text-lg font-sans font-bold tracking-tight">Luxury Aesthetic</h4>
              <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                Elite visual palettes combining warm off-whites, sleek charcoal shadows, and minimal glass accents.
              </p>
            </div>

            {/* Bento Card 4: WebGL speed */}
            <div className={`p-8 rounded-2xl border backdrop-blur-md space-y-4 transition-colors duration-500 ${
              isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-black/5 text-slate-800'
            }`}>
              <Heart className="w-8 h-8 text-pink-500 stroke-[1.5]" />
              <h4 className="text-lg font-sans font-bold tracking-tight">Speed Optimizations</h4>
              <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                Targeting perfect 100/100 Lighthouse scores and seamless sub-millisecond loading times.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section id="featured-projects-section" className="py-24 border-t border-neutral-200 dark:border-white/5 bg-neutral-50/50 dark:bg-black/30 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-left space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
                ● SELECTED INDEX
              </span>
              <AnimatedHeading text="FEATURED CASE STUDIES" className="text-3xl md:text-5xl font-sans font-black tracking-tight text-neutral-900 dark:text-white" />
            </div>
            <div>
              <button
                onClick={() => onPageChange('projects')}
                className="cursor-pointer group inline-flex items-center gap-2 text-xs font-mono text-[#00f2fe] tracking-widest uppercase border-b border-[#00f2fe]/40 pb-1.5 hover:border-[#00f2fe] transition-colors duration-300"
              >
                VIEW ENTIRE ARCHIVE
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Project List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featuredList.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                onClick={() => onSelectProject(project.id)}
                className="project-card group cursor-pointer flex flex-col space-y-4 text-left"
              >
                {/* Image Wrap */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-[#121214] relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.technologies.slice(0, 2).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full uppercase border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex justify-between items-baseline pt-2">
                  <h3 className="text-xl md:text-2xl font-sans font-black tracking-tight text-neutral-900 dark:text-white group-hover:text-[#00f2fe] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 dark:text-[#71717a]">{project.year}</span>
                </div>
                <p className="text-xs text-neutral-650 dark:text-[#a1a1aa] line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS SLIDER ================= */}
      <section id="testimonials-section" className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
        <div className="text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
              ● CRITIC RESPONSES
            </span>
            <AnimatedHeading text="CLIENT TESTIMONIALS" className="text-3xl md:text-5xl font-sans font-black tracking-tight text-neutral-900 dark:text-white justify-center" />
          </div>

          <div className="relative p-8 md:p-16 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg overflow-hidden text-left space-y-8">
            <div className="absolute top-6 right-8 text-7xl font-serif text-[#00f2fe]/10 select-none">
              “
            </div>

            <div className="flex gap-1">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#00f2fe] text-[#00f2fe]" />
              ))}
            </div>

            <p className="text-lg md:text-2xl font-sans italic text-neutral-900 dark:text-white font-medium leading-relaxed">
              {testimonials[activeTestimonial].quote}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-white/5">
              <div>
                <h4 className="font-sans font-bold text-neutral-900 dark:text-white">{testimonials[activeTestimonial].author}</h4>
                <p className="text-xs font-mono text-neutral-500 dark:text-[#71717a]">{testimonials[activeTestimonial].role}</p>
              </div>

              {/* Slider Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevTestimonial}
                  className="cursor-pointer p-2 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-white hover:border-[#00f2fe] dark:hover:border-[#00f2fe] hover:text-[#00f2fe] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="cursor-pointer p-2 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-white hover:border-[#00f2fe] dark:hover:border-[#00f2fe] hover:text-[#00f2fe] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= RECENT ARTICLES PREVIEW ================= */}
      <section id="recent-articles-section" className="py-24 border-t border-neutral-200 dark:border-white/5 bg-neutral-50/30 dark:bg-black/20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-left space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
                ● WEEKLY EDITORIALS
              </span>
              <AnimatedHeading text="LATEST ARTICLES" className="text-3xl md:text-5xl font-sans font-black tracking-tight text-neutral-900 dark:text-white" />
            </div>
            <div>
              <button
                onClick={() => onPageChange('blog')}
                className="cursor-pointer group inline-flex items-center gap-2 text-xs font-mono text-[#00f2fe] tracking-widest uppercase border-b border-[#00f2fe]/40 pb-1.5 hover:border-[#00f2fe] transition-colors duration-300"
              >
                VISIT THE JOURNAL
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articlesList.slice(0, 3).map((article) => (
              <div
                key={article.id}
                onClick={() => onPageChange('blog')}
                className="group cursor-pointer p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md text-left flex flex-col justify-between h-full space-y-6 hover:border-[#00f2fe]/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-[#121214]">
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h4 className="text-base font-sans font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-[#00f2fe] transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00f2fe] tracking-widest font-bold">
                  <span>READ ARTICLE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section id="cta-section" className="py-28 px-6 relative z-10 text-center max-w-5xl mx-auto">
        <div className="relative p-12 md:p-24 rounded-[32px] border border-neutral-200 dark:border-white/10 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-[#0c0c0e] dark:to-[#040405] overflow-hidden space-y-8 shadow-xl">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-20 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
              ● PROJECT DEPLOYMENT
            </span>
            <AnimatedHeading text="READY TO TRANSCEND?" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white justify-center" />
            <p className="text-sm md:text-lg text-neutral-600 dark:text-[#a1a1aa] font-sans max-w-xl mx-auto leading-relaxed">
              We are currently selecting elite digital collaborations for Q3-Q4 2026. Secure your development pipeline today.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => onPageChange('contact')}
              className="cursor-pointer group inline-flex items-center gap-3 bg-[#00f2fe] hover:bg-[#00d0db] text-black font-mono font-bold text-xs tracking-widest px-10 py-5 rounded-full transition-all duration-300 shadow-xl shadow-[#00f2fe]/10 hover:shadow-[#00f2fe]/30 hover:scale-[1.04]"
            >
              LAUNCH CONVERSATION
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
