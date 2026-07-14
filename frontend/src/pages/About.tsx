import { motion } from 'motion/react';
import { Download, Calendar, Award, Trophy, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';
import { useQuery } from '@tanstack/react-query';
import { ExperienceItem } from '../types';

interface AboutProps {
  isDarkMode: boolean;
}

export default function About({ isDarkMode }: AboutProps) {
  const { data: experiences = [] } = useQuery<ExperienceItem[]>({
    queryKey: ['experiences'],
    queryFn: async () => {
      const res = await fetch('/api/experiences');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });

  // Functional CV download generator
  const triggerCVDownload = () => {
    const cvText = `
=========================================
MUNEEB SHAHID - SENIOR FULL-STACK DEVELOPER
=========================================
Email: muneebshahid765@gmail.com
Portfolio: muneebsh.dev

------------ SUMMARY ------------
High-performance Senior Full-Stack Developer & Backend Expert.
Specializing in secure distributed microservices, transactional databases (SQL/NoSQL),
RESTful/GraphQL API architecture, alongside immersive, fast interactive React frontends.

------------ SKILLS ------------
- Backend: Node.js, Express, Fastify, PostgreSQL, MongoDB, Redis, RESTful, GraphQL, Docker
- Frontend: TypeScript, React 19, Next.js, Tailwind CSS v4, Framer Motion, Three.js, D3.js
- Tools & DevOps: Git/GitHub, Docker, Google Cloud Run, Webpack, Figma

------------ PROFESSIONAL EXPERIENCE ------------
Lead Full-Stack Architect | Aetheric Interactive Studio | 2024 - Present
- Architected highly scalable Node.js microservices, distributed real-time architectures, and custom caching models.
- Supervised a team of 6 developers, aligning secure database integrations with immersive 3D WebGL frontends.
- Refactored the core spatial rendering API and backend sync pipeline, reducing average query responses to sub-15ms.

Senior Backend & Full-Stack Engineer | Symmetric Digital | 2022 - 2024
- Designed high-throughput data pipelines, handling real-time biometric metrics streaming and complex data aggregation.
- Implemented robust OAuth 2.0 / security protocols, rate-limiters, and role-based access controls across core APIs.
- Collaborated closely with design teams to map optimized server telemetry into glassmorphic dashboards using React and D3.js.

------------ EDUCATION ------------
M.S. in Software Engineering & Creative Design
Stanford University, Class of 2020
=========================================
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Muneeb_Shahid_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const values = [
    { title: 'Surgical Precision', text: 'We code to the individual byte and pixel. Every database index, API payload, and CSS transition is mathematically optimized.' },
    { title: 'Aesthetic Honesty', text: 'No unrequested system clutter, fake metrics, or fake logs. We deliver raw, purposeful server-side and client-side simplicity.' },
    { title: 'Uncompromising Speed', text: 'Both server responses and UI transitions should feel tactile and instantaneous. If an API request exceeds 50ms, it is not ready.' },
  ];

  const funFacts = [
    { label: 'COFFEE CONSUMPTION', val: '4,200+ Liters' },
    { label: 'DATABASES OPTIMIZED', val: '120+' },
    { label: 'APIs DEPLOYED', val: '240+' },
    { label: 'ACTIVE STREAK', val: '1,450 Days' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      
      {/* ================= BIOGRAPHY HEADER ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-neutral-200 dark:border-white/10">
        
        {/* Left text column (Lg span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
            ● HELLO WORLD / INTRODUCTION
          </span>
          <AnimatedHeading text="MUNEEB SHAHID" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white" />
          <h3 className="text-lg md:text-xl font-mono text-neutral-600 dark:text-[#a1a1aa] tracking-widest uppercase">
            SENIOR FULL-STACK DEVELOPER & BACKEND EXPERT
          </h3>
          <p className={`text-base leading-relaxed ${isDarkMode ? 'text-[#a1a1aa]' : 'text-slate-600'}`}>
            I am a Senior Full-Stack Developer and Backend Systems Expert who possesses elite frontend design and development capabilities. Based in San Francisco, I specialize in building robust server systems, highly scalable microservice architectures, secure API integrations, and ultra-fast fluid frontend interfaces.
          </p>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#71717a]' : 'text-slate-500'}`}>
            My practice focuses on balancing database throughput, caching strategy, ironclad authentication systems, and cloud configurations with visually stunning typography and custom interactive visualizers. Outside of engineering, I optimize heavy query loads, construct scalable databases, and write guides about backend performance.
          </p>

          <div className="pt-4">
            <button
              onClick={triggerCVDownload}
              className="cursor-pointer group inline-flex items-center gap-2 bg-[#00f2fe] hover:bg-[#00d0db] text-black font-mono font-bold text-xs tracking-widest px-6 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#00f2fe]/20 hover:shadow-[#00f2fe]/40"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD PORTFOLIO CV
            </button>
          </div>
        </div>

        {/* Right profile image column (Lg span 5) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative aspect-square w-full max-w-md rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-zinc-900 shadow-2xl">
            <img
              src="/src/assets/images/profile_avatar_1783958373177.jpg"
              alt="Muneeb Shahid Profile Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs font-mono text-neutral-900 dark:text-white bg-white/60 dark:bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-neutral-200 dark:border-white/5">
              <span>● ACTIVE IN SAN FRANCISCO</span>
              <span className="text-[#00f2fe]">60 FPS SHADER</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= EXPERIENCE TIMELINE ================= */}
      <div className="py-20 border-b border-neutral-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
              ● CAREER TIMELINE
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-neutral-900 dark:text-white uppercase">
              PROFESSIONAL JOURNEY
            </h3>
            <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed font-mono">
              Over 6 years of experience working inside creative design agencies and enterprise engineering departments.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12 relative border-l border-neutral-200 dark:border-zinc-800 pl-6 md:pl-10 ml-2">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative space-y-4"
              >
                {/* Dot indicator */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-4 border-neutral-100 dark:border-zinc-950 bg-[#00f2fe]" />
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                  <div>
                    <h4 className="text-lg md:text-xl font-sans font-bold text-neutral-900 dark:text-white">{exp.role}</h4>
                    <span className="text-xs font-mono text-[#00f2fe] uppercase">{exp.company}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-600 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-850 px-3 py-1 rounded-full bg-neutral-100 dark:bg-black/30">
                    <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs md:text-sm text-neutral-600 dark:text-[#a1a1aa] leading-relaxed list-disc list-inside">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((s, sIdx) => (
                    <span key={sIdx} className="text-[10px] font-mono tracking-wider bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-neutral-850 dark:text-zinc-300 px-2 py-0.5 rounded-full uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= VALUES & PHILOSOPHY ================= */}
      <div className="py-20 border-b border-neutral-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
              ● WORK ETHICS & MANDATES
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-neutral-900 dark:text-white uppercase">
              CORE PHILOSOPHY
            </h3>
            <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed font-mono">
              Designing luxury interactive products requires commitment to strong architectural and sensory values.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md space-y-4">
                <div className="p-2.5 rounded-xl bg-[#00f2fe]/10 w-fit">
                  <CheckCircle2 className="w-5 h-5 text-[#00f2fe]" />
                </div>
                <h4 className="font-sans font-bold text-neutral-900 dark:text-white text-base">{v.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= EDUCATION & ACHIEVEMENTS ================= */}
      <div className="py-20 border-b border-neutral-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Education column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#00f2fe]" />
            <h4 className="text-xs font-mono tracking-widest text-[#00f2fe] uppercase">EDUCATION ACCOLADES</h4>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 space-y-4">
            <div className="flex justify-between items-baseline gap-2">
              <h5 className="font-sans font-bold text-neutral-900 dark:text-white text-lg">M.S. in Software Engineering & Creative Design</h5>
              <span className="text-xs font-mono text-neutral-500 dark:text-[#71717a]">2020</span>
            </div>
            <p className="text-xs font-mono text-neutral-600 dark:text-[#a1a1aa] uppercase">Stanford University</p>
            <p className="text-xs text-neutral-500 dark:text-[#71717a] leading-relaxed">
              Specialized coursework combining heavy graphics programming, advanced rendering architecture, and experimental user interface design paradigms.
            </p>
          </div>
        </div>

        {/* Achievements column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-400" />
            <h4 className="text-xs font-mono tracking-widest text-orange-400 uppercase">AWARDS & EXCELLENCE</h4>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 space-y-4">
            <div className="flex items-center gap-4">
              <Trophy className="w-10 h-10 text-yellow-400 stroke-[1.2] shrink-0" />
              <div>
                <h5 className="font-sans font-bold text-neutral-900 dark:text-white text-sm">Awwwards Honorable Mention x4</h5>
                <p className="text-xs font-mono text-neutral-500 dark:text-[#71717a] uppercase">2024 - 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Trophy className="w-10 h-10 text-yellow-400 stroke-[1.2] shrink-0" />
              <div>
                <h5 className="font-sans font-bold text-neutral-900 dark:text-white text-sm">CSS Design Awards: Best UI/UX</h5>
                <p className="text-xs font-mono text-neutral-500 dark:text-[#71717a] uppercase">2025</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= FUN STATS / FACTS ================= */}
      <div className="py-16 text-center space-y-8">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          ● BY THE NUMBERS
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {funFacts.map((f, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md">
              <div className="text-2xl md:text-4xl font-sans font-black text-neutral-900 dark:text-white">{f.val}</div>
              <div className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] tracking-widest mt-1 uppercase">{f.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
