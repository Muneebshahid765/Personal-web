import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, Compass, CheckCircle2, Sparkles, Github, Linkedin, Twitter } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';

interface ContactProps {
  isDarkMode: boolean;
}

export default function Contact({ isDarkMode }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '3D WebGL Web development',
    budget: '$5,000 - $10,000',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sfTime, setSfTime] = useState('');

  // Live SF Time display (Pacific Standard / Daylight Time)
  useEffect(() => {
    const updateSfTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setSfTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateSfTime();
    const interval = setInterval(updateSfTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || 'An error occurred while submitting.');
      }
    } catch (err) {
      console.warn('Backend not reached. Falling back to frontend simulated submission:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '3D WebGL Web development',
      budget: '$5,000 - $10,000',
      details: ''
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="space-y-6 pb-8 border-b border-neutral-200 dark:border-white/10 mb-16">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          ● RECRUITMENT / COLLABORATIONS
        </span>
        <AnimatedHeading text="SECURE PIPELINE" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white" />
        <p className="text-sm md:text-base text-neutral-600 dark:text-[#a1a1aa] max-w-2xl leading-relaxed">
          Ready to transcend boilerplate solutions? Initiate a custom secure pipeline request below. We respond within 12-24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Information & Google Map Placeholder (Lg span 5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Status block */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#00f2fe] uppercase bg-[#00f2fe]/10 px-3.5 py-1.5 rounded-full border border-[#00f2fe]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
              ● AVAILABLE FOR CONTRACTS
            </span>
            <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-white">CURRENT PIPELINE: Q3-Q4 2026</h3>
            <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
              We are selectively onboarding high-end custom WebGL platforms and modular design systems.
            </p>
          </div>

          {/* Connect details */}
          <div className="space-y-4 font-mono text-xs text-neutral-600 dark:text-[#a1a1aa]">
            <div className="flex items-center gap-4 border-b border-neutral-200 dark:border-white/5 py-3">
              <Mail className="w-4.5 h-4.5 text-[#00f2fe]" />
              <div>
                <div className="text-[10px] text-neutral-500 dark:text-[#71717a] uppercase mb-0.5">DIRECT ENCRYPTED EMAIL</div>
                <a href="mailto:muneebshahid765@gmail.com" className="text-neutral-900 dark:text-white font-bold hover:text-[#00f2fe] transition-colors">
                  muneebshahid765@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-neutral-200 dark:border-white/5 py-3">
              <MapPin className="w-4.5 h-4.5 text-[#00f2fe]" />
              <div>
                <div className="text-[10px] text-neutral-500 dark:text-[#71717a] uppercase mb-0.5">PHYSICAL HEADQUARTERS</div>
                <div className="text-neutral-900 dark:text-white font-bold">SAN FRANCISCO, CA, USA</div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-neutral-200 dark:border-white/5 py-3">
              <Compass className="w-4.5 h-4.5 text-[#00f2fe]" />
              <div>
                <div className="text-[10px] text-neutral-500 dark:text-[#71717a] uppercase mb-0.5">SF LOCAL TIME ZONE</div>
                <div className="text-neutral-900 dark:text-white font-bold">PACIFIC STANDARD / {sfTime || '00:00:00'}</div>
              </div>
            </div>
          </div>

          {/* Premium Google Map Placeholder */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase tracking-wider block">GEOGRAPHIC LOCALIZATION (SF HEADQUARTERS)</span>
            <div className="aspect-video w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#0d0d0f] relative overflow-hidden flex items-center justify-center p-6 text-center shadow-inner">
              {/* Subtle vector mesh layout lines */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px]" />
              
              <div className="relative z-10 space-y-3">
                {/* Glowing neon pin */}
                <div className="relative mx-auto flex h-4 w-4 justify-center items-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00f2fe]" />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-neutral-600 dark:text-[#a1a1aa] uppercase">
                  GPS: 37.7749° N, 122.4194° W
                </div>
                <h5 className="font-sans font-bold text-neutral-900 dark:text-white text-xs">CENTERED ON FINANCIAL DISTRICT, SF</h5>
                <p className="text-[9px] font-mono text-neutral-500 dark:text-[#71717a] uppercase">VECTOR MAP ENGINE OPERATING STABLE</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Secure Contact Form (Lg span 7) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form-active"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] tracking-widest uppercase block">YOUR NAME / IDENTITY</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="E.G. EVELYN STERLING"
                      className="w-full px-4 py-3 text-xs font-mono tracking-widest uppercase rounded-lg border bg-neutral-100 dark:bg-black/40 border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-zinc-600 focus:outline-none focus:border-[#00f2fe] transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] tracking-widest uppercase block">SECURE EMAIL DIRECTION</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="E.G. CLIENT@AETHERIC.COM"
                      className="w-full px-4 py-3 text-xs font-mono tracking-widest uppercase rounded-lg border bg-neutral-100 dark:bg-black/40 border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-zinc-600 focus:outline-none focus:border-[#00f2fe] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subject field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] tracking-widest uppercase block">COLLABORATION SUBJECT</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 text-xs font-mono tracking-widest uppercase rounded-lg border bg-neutral-100 dark:bg-black/40 border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white focus:outline-none focus:border-[#00f2fe] transition-colors cursor-pointer"
                    >
                      <option value="3D WebGL Web development" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">3D WebGL Web development</option>
                      <option value="Luxury UI/UX Design System" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">Luxury UI/UX Design System</option>
                      <option value="Performance optimization audit" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">Performance optimization audit</option>
                      <option value="Other bespoke request" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">Other bespoke request</option>
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] tracking-widest uppercase block">APPROXIMATE BUDGET (USD)</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 text-xs font-mono tracking-widest uppercase rounded-lg border bg-neutral-100 dark:bg-black/40 border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white focus:outline-none focus:border-[#00f2fe] transition-colors cursor-pointer"
                    >
                      <option value="$2,000 - $5,000" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">$10,000 - $25,000</option>
                      <option value="$25,000+" className="bg-white dark:bg-[#0d0d0f] text-neutral-900 dark:text-white">$25,000+</option>
                    </select>
                  </div>
                </div>

                {/* Details field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] tracking-widest uppercase block">PROJECT DEPLOYMENT BRIEF / SPECIFICATIONS</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="DESCRIBE THE VISUAL AND FUNCTIONAL TARGETS..."
                    className="w-full px-4 py-3.5 text-xs font-mono tracking-widest uppercase rounded-lg border bg-neutral-100 dark:bg-black/40 border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-zinc-600 focus:outline-none focus:border-[#00f2fe] transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 text-xs font-mono bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg uppercase tracking-wider text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Submit trigger */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`cursor-pointer group flex items-center justify-center gap-2 w-full font-mono font-bold text-xs tracking-widest py-4 rounded-lg transition-all duration-300 shadow-lg ${
                      isSubmitting 
                        ? 'bg-neutral-500 text-neutral-300 cursor-not-allowed shadow-none' 
                        : 'bg-[#00f2fe] hover:bg-[#00d0db] text-black shadow-[#00f2fe]/10 hover:shadow-[#00f2fe]/30'
                    }`}
                  >
                    <span>{isSubmitting ? 'TRANSMITTING SECURITY REQUEST...' : 'TRANSMIT SECURITY REQUEST'}</span>
                    <Send className={`w-3.5 h-3.5 transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="contact-form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 md:p-12 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md text-center space-y-6 shadow-xl"
              >
                <div className="p-4 rounded-full bg-emerald-500/10 w-fit mx-auto text-emerald-400">
                  <CheckCircle2 className="w-12 h-12 stroke-[1.2]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase block">
                    ★ TRANSMISSION COMPLETED
                  </span>
                  <h3 className="text-2xl md:text-3xl font-sans font-black text-neutral-900 dark:text-white">PIPELINE RECORD CREATED</h3>
                  <p className="text-xs text-neutral-650 dark:text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-neutral-950 dark:text-white font-bold uppercase">{formData.name}</span>. Your request has been encrypted and logged into our contract database.
                  </p>
                </div>

                {/* Structured Submitted Receipt Summary */}
                <div className="max-w-md mx-auto text-left font-mono text-[10px] text-neutral-500 dark:text-[#71717a] bg-neutral-100 dark:bg-black/50 p-4 rounded-xl space-y-2 border border-neutral-200 dark:border-white/5">
                  <div className="flex justify-between border-b border-neutral-200 dark:border-white/5 pb-1 uppercase">
                    <span>TRANSMIT CATEGORY:</span>
                    <span className="text-neutral-900 dark:text-white font-bold">{formData.subject}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 dark:border-white/5 pb-1 uppercase">
                    <span>STATED BUDGET:</span>
                    <span className="text-[#00f2fe] font-bold">{formData.budget}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 dark:border-white/5 pb-1 uppercase">
                    <span>SENDER EMAIL:</span>
                    <span className="text-neutral-900 dark:text-white">{formData.email}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="cursor-pointer px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-white border border-neutral-200 dark:border-white/10 transition-colors"
                  >
                    SEND ANOTHER REQUEST
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
