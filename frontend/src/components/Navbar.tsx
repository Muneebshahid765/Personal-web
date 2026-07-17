import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isModalOpen?: boolean;
}

export default function Navbar({ activePage, onPageChange, isDarkMode, onToggleTheme, isModalOpen = false }: NavbarProps) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Live clock on Navbar (Awwwards design staple)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor Admin authentication token
  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem('adminToken');
      setIsAdminLoggedIn(!!token);
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    const interval = setInterval(checkAdmin, 1000);
    return () => {
      window.removeEventListener('storage', checkAdmin);
      clearInterval(interval);
    };
  }, []);

  const navItems: { id: PageId; label: string; index: string }[] = [
    { id: 'home', label: 'Home', index: '01' },
    { id: 'about', label: 'About', index: '02' },
    { id: 'projects', label: 'Projects', index: '03' },
    { id: 'services', label: 'Services', index: '04' },
    { id: 'skills', label: 'Skills', index: '05' },
    { id: 'experience', label: 'Experience', index: '06' },
    { id: 'blog', label: 'Blog', index: '07' },
    { id: 'contact', label: 'Contact', index: '08' },
  ];

  const handleNavClick = (pageId: PageId) => {
    onPageChange(pageId);
    setIsMegaMenuOpen(false);
  };

  return (
    <>
      {/* Primary Floating Header */}
      <motion.header
        id="navbar-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isModalOpen ? -120 : 0, opacity: isModalOpen ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed top-4 left-4 right-4 z-40 mx-auto max-w-7xl ${isModalOpen ? 'pointer-events-none' : ''}`}
      >
        <div className={`flex items-center justify-between px-6 py-3.5 rounded-full border backdrop-blur-lg transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-[#070708]/75 border-white/10 text-white' 
            : 'bg-white/75 border-black/10 text-[#070708]'
        }`}>
          {/* Logo */}
          <button
            id="navbar-logo"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2 cursor-pointer font-sans font-bold tracking-tighter text-lg md:text-xl"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00f2fe]"></span>
            </span>
            <span className="group-hover:text-[#00f2fe] transition-colors duration-300">
              MUNEEB.SH
            </span>
          </button>

          {/* Desktop Direct Links (Home, Projects, Contact) */}
          <nav className="hidden md:flex items-center gap-8">
            {['home', 'projects', 'services', 'contact'].map((item) => {
              const itemData = navItems.find(i => i.id === item);
              if (!itemData) return null;
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item as PageId)}
                  className={`text-xs font-mono tracking-widest uppercase cursor-pointer transition-colors duration-300 hover:text-[#00f2fe] relative py-1 ${
                    activePage === item ? 'text-[#00f2fe]' : ''
                  }`}
                >
                  {itemData.label}
                  {activePage === item && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#00f2fe]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls (Time, Theme Toggle, Menu Trigger) */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Live Clock / Geo Status */}
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-neutral-500 dark:text-[#a1a1aa] uppercase border-r border-neutral-200 dark:border-[#27272a] pr-6">
              <Globe className="w-3.5 h-3.5 text-[#00f2fe] animate-spin-slow" />
              <span>SF UTC: {timeStr || '00:00:00'}</span>
            </div>

            {/* Theme Switcher */}
            <button
              id="theme-switcher-btn"
              onClick={onToggleTheme}
              className={`p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-300 ${
                isDarkMode ? 'text-yellow-400' : 'text-slate-700'
              }`}
              title="Switch Visual Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Avatar Button */}
            {isAdminLoggedIn && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`relative flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#00f2fe] bg-[#0c0c0d] overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00f2fe]/30 cursor-pointer ${
                  activePage === 'admin' ? 'ring-2 ring-[#00f2fe]/40' : ''
                }`}
                title="Go to Admin Dashboard"
              >
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                  alt="Admin Avatar" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-neutral-950 rounded-full" />
              </button>
            )}

            {/* Hamburger Trigger */}
            <button
              id="mega-menu-trigger"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-2 cursor-pointer bg-[#00f2fe] text-black px-4 py-2 rounded-full font-mono text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-[#00f2fe]/30 hover:scale-[1.03]"
            >
              {isMegaMenuOpen ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-3.5 h-3.5" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mega Menu Overlay */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            id="fullscreen-mega-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed inset-0 z-35 flex backdrop-blur-2xl overflow-y-auto ${
              isDarkMode ? 'bg-[#070708]/98' : 'bg-white/98'
            }`}
          >
            {/* Grid container with spacious layouts */}
            <div className="w-full max-w-7xl mx-auto px-6 py-28 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Left Details Panel (Lg span 4) */}
              <div className={`lg:col-span-4 flex flex-col justify-between h-full space-y-8 border-b lg:border-b-0 lg:border-r pb-8 lg:pb-0 lg:pr-12 text-left ${
                isDarkMode ? 'border-[#27272a]' : 'border-neutral-200'
              }`}>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00f2fe] uppercase block mb-2">
                    ● CURRENTLY AVAILABLE
                  </span>
                  <h3 className={`text-xl md:text-2xl font-sans font-bold tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Let's collaborate on immersive 3D digital experiences.
                  </h3>
                  <p className={`text-xs mt-2 font-mono leading-relaxed ${
                    isDarkMode ? 'text-[#a1a1aa]' : 'text-neutral-600'
                  }`}>
                    Developing modern, lightning-fast WebGL interactions and premium design systems for innovative businesses worldwide.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`text-xs font-mono ${isDarkMode ? 'text-[#71717a]' : 'text-neutral-500'}`}>
                    QUICK CONNECT
                  </div>
                  <a
                    href="mailto:muneebshahid765@gmail.com"
                    className={`group flex items-center justify-between text-sm hover:text-[#00f2fe] border-b py-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white border-[#27272a]' : 'text-neutral-900 border-neutral-200'
                    }`}
                  >
                    <span>muneebshahid765@gmail.com</span>
                    <ArrowUpRight className={`w-4 h-4 group-hover:text-[#00f2fe] transition-colors duration-300 ${
                      isDarkMode ? 'text-[#71717a]' : 'text-neutral-400'
                    }`} />
                  </a>
                  <div className={`flex gap-4 text-xs font-mono ${isDarkMode ? 'text-[#a1a1aa]' : 'text-neutral-500'}`}>
                    <a href="https://github.com" target="_blank" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>GITHUB</a>
                    <span>/</span>
                    <a href="https://linkedin.com" target="_blank" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>LINKEDIN</a>
                    <span>/</span>
                    <a href="https://twitter.com" target="_blank" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-neutral-900'}`}>TWITTER</a>
                  </div>
                </div>
              </div>

              {/* Right Navigation List (Lg span 8) */}
              <div className="lg:col-span-8 flex flex-col justify-center text-left">
                <span className={`text-[10px] font-mono tracking-widest uppercase mb-4 block pl-2 ${
                  isDarkMode ? 'text-[#71717a]' : 'text-neutral-500'
                }`}>
                  INDEX / PORTFOLIO DIRECTORY
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                  {navItems.map((item, index) => {
                    const isSelected = activePage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                        onClick={() => handleNavClick(item.id)}
                        className={`group flex items-baseline gap-4 py-3.5 border-b text-left cursor-pointer transition-transform duration-300 hover:translate-x-2 ${
                          isDarkMode ? 'border-[#1f1f23]' : 'border-neutral-200'
                        }`}
                      >
                        <span className={`text-[10px] font-mono group-hover:text-[#00f2fe] transition-colors duration-300 ${
                          isDarkMode ? 'text-[#71717a]' : 'text-neutral-400'
                        }`}>
                          {item.index}
                        </span>
                        <span className={`text-2xl md:text-3.5xl font-sans font-extrabold tracking-tighter transition-colors duration-300 ${
                          isSelected
                            ? 'text-[#00f2fe]'
                            : isDarkMode
                              ? 'text-[#e4e4e7] group-hover:text-white'
                              : 'text-neutral-700 group-hover:text-neutral-900'
                        }`}>
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}