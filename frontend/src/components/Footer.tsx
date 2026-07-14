import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Mail, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onPageChange: (page: PageId) => void;
  isDarkMode: boolean;
}

export default function Footer({ onPageChange, isDarkMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t relative z-10 transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-[#070708]/90 border-white/10 text-white' 
        : 'bg-[#fafafa] border-black/5 text-[#070708]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 text-left">
        
        {/* Branding Column (Lg span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center gap-2 cursor-pointer font-sans font-black tracking-tighter text-2xl uppercase"
          >
            <span className="w-4 h-4 rounded-full bg-[#00f2fe] inline-block animate-pulse"></span>
            MUNEEB.SH
          </button>
          <p className={`text-sm leading-relaxed max-w-sm ${isDarkMode ? 'text-[#a1a1aa]' : 'text-slate-600'}`}>
            Senior Creative Developer and UI/UX Designer crafting immersive, high-speed 3D WebGL interfaces and luxury digital solutions for global agencies.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2.5 rounded-full border border-current/10 hover:border-[#00f2fe] hover:text-[#00f2fe] transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2.5 rounded-full border border-current/10 hover:border-[#00f2fe] hover:text-[#00f2fe] transition-colors duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2.5 rounded-full border border-current/10 hover:border-[#00f2fe] hover:text-[#00f2fe] transition-colors duration-300"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Sitemap / Links (Lg span 4) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#71717a] uppercase">STUDIO</h4>
            <ul className="space-y-2.5 text-sm">
              {['home', 'about', 'projects', 'services'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onPageChange(page as PageId)}
                    className="cursor-pointer text-neutral-500 dark:text-[#a1a1aa] hover:text-[#00f2fe] hover:translate-x-1 transition-all duration-300 capitalize"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#71717a] uppercase">DIRECTORY</h4>
            <ul className="space-y-2.5 text-sm">
              {['skills', 'experience', 'blog', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onPageChange(page as PageId)}
                    className="cursor-pointer text-neutral-500 dark:text-[#a1a1aa] hover:text-[#00f2fe] hover:translate-x-1 transition-all duration-300 capitalize"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription (Lg span 4) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-mono tracking-widest text-[#71717a] uppercase">NEWSLETTER</h4>
          <p className={`text-sm ${isDarkMode ? 'text-[#a1a1aa]' : 'text-slate-600'}`}>
            Receive seasonal updates on 3D WebGL workflows, creative coding insights, and premium Figma kits.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                className={`w-full px-4 py-3 text-xs font-mono tracking-widest rounded-lg border focus:outline-none focus:border-[#00f2fe] uppercase transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-black/50 border-white/10 text-white placeholder-zinc-600' 
                    : 'bg-white border-black/10 text-slate-800 placeholder-slate-400'
                }`}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:text-[#00f2fe] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
            {isSubscribed && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-xs text-[#00f2fe] flex items-center gap-1 font-mono uppercase"
              >
                <Sparkles className="w-3.5 h-3.5" />
                SUBSCRIBED SUCCESSFULLY! Welcome.
              </motion.div>
            )}
          </form>
        </div>

      </div>

      {/* Sub-footer Section */}
      <div className={`border-t py-8 px-6 transition-colors duration-500 ${
        isDarkMode ? 'border-white/5 bg-black/40' : 'border-black/5 bg-neutral-100'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono tracking-widest text-[#71717a]">
          <div>
            © {new Date().getFullYear()} MUNEEB SHAHID. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4 items-center">
            <span>TERMS</span>
            <span>•</span>
            <span>PRIVACY</span>
            <span>•</span>
            <button 
              onClick={() => onPageChange('admin')} 
              className="cursor-pointer hover:text-[#00f2fe] uppercase transition-colors font-mono text-[10px] tracking-widest"
            >
              ADMIN ACCESS
            </button>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 cursor-pointer text-white bg-[#00f2fe] px-4 py-2.5 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#00f2fe]/20 transition-all duration-300 font-bold"
          >
            <span className="text-[10px] text-black">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-black group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
