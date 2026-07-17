import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Briefcase, ChevronRight, Award, Compass, Star } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';
import { useQuery } from '@tanstack/react-query';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  isDarkMode: boolean;
}

export default function Experience({ isDarkMode }: ExperienceProps) {
  const { data: experiences = [] } = useQuery<ExperienceItem[]>({
    queryKey: ['experiences'],
    queryFn: async () => {
      const res = await fetch('https://muneebcodes.tech/app/api/experiences');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });
  
  const achievements = [
    { title: 'Project of the Month', org: 'Awwwards Design Board', date: 'March 2026', desc: 'Received high-score honors on a complex full-scale WebGL product launch.' },
    { title: 'UX Innovation Keynote', org: 'Symmetric Digital Forum', date: 'October 2024', desc: 'Conducted a primary talk on the physics of micro-interactions in sustainable brand layouts.' },
    { title: 'Outstanding Developer', org: 'Aetheric Interactive Studio', date: 'Annual Review 2025', desc: 'Voted developer of the year for lead engineering on international high-end applications.' }
  ];

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="space-y-6 pb-8 border-b border-neutral-200 dark:border-white/10 mb-16">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          ● TIMELINE / CAREER CREDENTIALS
        </span>
        <AnimatedHeading text="PROFESSIONAL RECORD" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white" />
        <p className="text-sm md:text-base text-neutral-600 dark:text-[#a1a1aa] max-w-2xl leading-relaxed">
          Detailed historical trace of roles, contract positions, client agreements, and award-winning collaborations since the beginning of our career.
        </p>
      </div>

      {/* ================= TIMELINE MATRIX ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        
        {/* Left Side Labels (Lg span 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
            <Briefcase className="w-4 h-4 text-[#00f2fe]" />
            <span>AGENCY & ENTERPRISE ROLES</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-sans font-black text-neutral-900 dark:text-white leading-tight">
            SELECT WORK HISTORIES
          </h3>
          <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
            Review the specific responsibilities, direct client integrations, and software environments utilized in each historical role.
          </p>
        </div>

        {/* Right Side Cards (Lg span 8) */}
        <div className="lg:col-span-8 space-y-8 relative border-l border-neutral-200 dark:border-white/10 pl-6 md:pl-10 ml-2">
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
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-[#070708] bg-[#00f2fe]" />
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                <div>
                  <h4 className="text-xl md:text-2xl font-sans font-black text-neutral-900 dark:text-white">{exp.role}</h4>
                  <span className="text-sm font-mono text-[#00f2fe] uppercase font-bold">{exp.company}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-[#71717a] border border-neutral-200 dark:border-[#27272a] px-3 py-1 rounded-full bg-neutral-50 dark:bg-black/30 w-fit shadow-sm dark:shadow-none">
                  <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
                  {exp.period}
                </span>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase tracking-wider block">KEY RESPONSIBILITIES & PROJECTS</span>
                <ul className="space-y-3">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs md:text-sm text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-[#00f2fe] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies strip */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase tracking-wider block">SOFTWARE ENVIRONMENT</span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((s, sIdx) => (
                    <span key={sIdx} className="text-[10px] font-mono tracking-wider bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-neutral-800 dark:text-white px-3 py-1 rounded-full uppercase shadow-sm dark:shadow-none">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ================= RECENT HONORS / ACCOMPLISHMENTS ================= */}
      <div className="py-16 border-t border-neutral-200 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 tracking-widest uppercase">
              <Award className="w-4 h-4 text-orange-400" />
              <span>ACCOLADES & MERITS</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-sans font-black text-neutral-900 dark:text-white leading-tight">
              PROMINENT CAREER MILESTONES
            </h3>
            <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
              These milestones mark our contribution to visual aesthetics, technical lectures, and development quality across the design community.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md space-y-3 text-left shadow-sm dark:shadow-none">
                <div className="flex justify-between items-baseline text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase">
                  <span>{item.org}</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="font-sans font-bold text-neutral-900 dark:text-white text-base tracking-tight">{item.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
