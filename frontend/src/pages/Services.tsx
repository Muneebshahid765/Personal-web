import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Minus, CreditCard, Sparkles, Send, Flame, Zap } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';
import { useQuery } from '@tanstack/react-query';
import { ServiceItem, FAQItem } from '../types';

const localFaqs: FAQItem[] = [
  {
    question: 'How long does a typical custom website build take?',
    answer: 'A standard custom website takes about 4 to 8 weeks from the initial research and Figma design phase through coding and optimization. More complex 3D WebGL experiences with high-fidelity custom meshes may take 8 to 12 weeks.'
  },
  {
    question: 'Do you work with agencies or collaborate as a freelancer?',
    answer: 'Yes, we frequently collaborate with creative agencies worldwide as a contract engineer, and we also take on select high-end freelance projects directly for brand owners.'
  },
  {
    question: 'Will the 3D features drain the battery of mobile visitors?',
    answer: 'No. We put a massive emphasis on rendering efficiency. We optimize all 3D assets, apply aggressive texture compression, and use lightweight custom GPU shaders that halt processing when the 3D Canvas scroll-triggers out of view.'
  },
  {
    question: 'Do you offer ongoing updates and security maintenance?',
    answer: 'Absolutely. We provide flexible post-launch support and monthly optimization retainers to ensure your web animations, security patches, and SEO scores remain in peak condition.'
  }
];

interface ServicesProps {
  isDarkMode: boolean;
}

export default function Services({ isDarkMode }: ServicesProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { data: services = [] } = useQuery<ServiceItem[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const processSteps = [
    { num: '01', title: 'Tactile Art Direction & Figma Wireframing', desc: 'We begin with complete research on your target market, establish typography pairings, draft detailed high-end prototypes, and align visual directions.' },
    { num: '02', title: 'Modular Coding & WebGL Assembly', desc: 'Once designs are finalized, we code the layouts using React 19, Tailwind CSS v4, and integrate custom vanilla Three.js interactive scenes.' },
    { num: '03', title: 'Performance Fine-Tuning & Asset Compression', desc: 'We compress textures, bake lighting vectors, offload background metrics using Web Workers, and resolve core bottlenecks to pass strict audits.' },
    { num: '04', title: 'Client Sign-off & Production Deployment', desc: 'Your web experience is securely compiled and deployed to high-speed cloud edge clusters, maintaining optimal rendering speeds globally.' }
  ];

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="space-y-6 pb-8 border-b border-neutral-200 dark:border-white/10 mb-16">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          ● OFFERINGS / CAPABILITIES
        </span>
        <AnimatedHeading text="ELITE DIGITAL SERVICES" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white" />
        <p className="text-sm md:text-base text-neutral-600 dark:text-[#a1a1aa] max-w-2xl leading-relaxed">
          From tactile Figma design systems to complex GPU-bound 3D graphics configurations, we offer specialized frontend engineering and brand packaging that commands premium status.
        </p>
      </div>

      {/* ================= SERVICES PRICING CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            className="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md flex flex-col justify-between h-full space-y-6 hover:border-[#00f2fe]/30 transition-all duration-300 shadow-sm dark:shadow-none"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-500 dark:text-[#71717a]">0{idx + 1}</span>
              <h3 className="text-lg md:text-xl font-sans font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-[#00f2fe] transition-colors">
                {svc.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                {svc.description}
              </p>
              
              <div className="pt-2">
                <span className="text-2xl font-sans font-black text-[#00f2fe]">{svc.price}</span>
                <span className="text-[10px] font-mono text-neutral-550 dark:text-[#71717a] tracking-widest block mt-0.5">ESTIMATED RATE</span>
              </div>

              <div className="w-full h-[1px] bg-neutral-200 dark:bg-white/5 pt-2" />

              <ul className="space-y-2 text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed pt-2">
                {svc.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00f2fe] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase pt-4 leading-relaxed border-t border-neutral-200 dark:border-white/5">
              {svc.details}
            </p>
          </div>
        ))}
      </div>

      {/* ================= PROCESS TIMELINE ================= */}
      <div className="py-20 border-t border-neutral-200 dark:border-white/5 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
              ● PROJECT WORKFLOW
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              A SCIENTIFIC DEVELOPMENT METHOD
            </h3>
            <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed font-mono">
              We guide digital visions from conceptual visual systems down to high-performance micro-interactions.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step) => (
              <div key={step.num} className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 relative overflow-hidden text-left space-y-3 shadow-sm dark:shadow-none">
                <div className="text-4xl font-sans font-black text-neutral-900/5 dark:text-white/5 absolute top-2 right-4 select-none">
                  {step.num}
                </div>
                <div className="text-xs font-mono text-[#00f2fe] uppercase">PHASE {step.num}</div>
                <h4 className="text-base font-sans font-bold text-neutral-900 dark:text-white">{step.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= FAQ ACCORDION ================= */}
      <div className="py-20 border-t border-neutral-200 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
              ● COMMON INQUIRIES
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed font-mono">
              Everything you need to know about setting up contracts, mobile diagnostics, and support retainers.
            </p>
          </div>

          {/* Accordion container */}
          <div className="lg:col-span-8 space-y-4">
            {localFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 overflow-hidden transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 cursor-pointer text-left"
                  >
                    <span className="font-sans font-bold text-neutral-900 dark:text-white text-sm md:text-base">
                      {faq.question}
                    </span>
                    <div className="p-1.5 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-white">
                      {isOpen ? <Minus className="w-4 h-4 text-[#00f2fe]" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-xs md:text-sm text-neutral-650 dark:text-[#a1a1aa] leading-relaxed border-t border-neutral-200 dark:border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
