import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layout, Code, Wrench, Shield, Zap } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';
import { useQuery } from '@tanstack/react-query';
import { Skill } from '../types';

interface SkillsProps {
  isDarkMode: boolean;
}

export default function Skills({ isDarkMode }: SkillsProps) {
  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await fetch('https://muneebcodes.tech/app/api/skills');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });
  
  // Categorized groups
  const categories = [
    { id: 'backend', label: 'Backend & Database Architecture', icon: <Shield className="w-5 h-5 text-[#00f2fe]" />, desc: 'High-performance server development, microservice systems, secure authentication models, caching algorithms, and complex relational databases.' },
    { id: 'frontend', label: 'Frontend Development', icon: <Layout className="w-5 h-5 text-[#00f2fe]" />, desc: 'Core visual technologies and reactive single page frameworks used to assemble elegant, fluid viewports.' },
    { id: 'libraries', label: 'Libraries & Animation', icon: <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />, desc: 'Specialized 3D rendering engines, spring physics components, and custom data plotting pipelines.' },
    { id: 'tools', label: 'Professional Tools & DevOps', icon: <Wrench className="w-5 h-5 text-orange-400" />, desc: 'Version control, packaging systems, task pipelines, and collaborative staging environments.' }
  ];

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="space-y-6 pb-8 border-b border-neutral-200 dark:border-white/10 mb-16">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          ● STACK / PROFESSIONAL SPECS
        </span>
        <AnimatedHeading text="CORE COMPETENCIES" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white" />
        <p className="text-sm md:text-base text-neutral-600 dark:text-[#a1a1aa] max-w-2xl leading-relaxed">
          Detailed catalog of our software expertise, engineering capabilities, and creative frameworks sorted by category and structured with progress indices.
        </p>
      </div>

      {/* ================= CATEGORY BENTO PANELS ================= */}
      <div className="space-y-16">
        {categories.map((cat, catIdx) => {
          const catSkills = skills.filter(s => s.category === cat.id);
          
          return (
            <div key={cat.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-neutral-200 dark:border-white/5 pb-12 last:border-b-0">
              
              {/* Category Info (Lg span 4) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 w-fit">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-sans font-bold text-neutral-900 dark:text-white tracking-tight">
                    {cat.label}
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Skills Bars & Cards Grid (Lg span 8) */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {catSkills.map((skill, sIdx) => (
                  <div
                    key={skill.name}
                    className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md space-y-3 relative overflow-hidden group hover:border-[#00f2fe]/20 transition-all duration-300 shadow-sm dark:shadow-none"
                  >
                    {/* Hover Glow effect */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f2fe]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex justify-between items-baseline text-xs font-mono">
                      <span className="text-neutral-900 dark:text-white font-bold tracking-tight uppercase">{skill.name}</span>
                      <span className="text-[#00f2fe] font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-neutral-200 dark:bg-[#1a1a1d] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: sIdx * 0.05, duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
