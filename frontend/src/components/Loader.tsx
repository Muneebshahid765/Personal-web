import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1600; // 1.6s loading duration
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600); // Allow fade-out animation to complete
          }, 300);
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const greetings = [
    'HELLO',      // English
    'BONJOUR',    // French
    'HOLA',       // Spanish
    'HALLO',      // German
    'CIAO',       // Italian
    'KONNICHIWA', // Japanese
    'ANNYEONG',   // Korean
    'NAMASTE'     // Hindi
  ];

  // Pick greeting based on loading step
  const currentGreeting = greetings[Math.floor((progress / 100) * greetings.length)] || 'HELLO';

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="custom-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#070708] p-8 md:p-16 select-none"
        >
          {/* Top header */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#a1a1aa]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse"></span>
              PORTFOLIO / ENGINE ONLINE
            </div>
            <div>STABLE v1.9.3</div>
          </div>

          {/* Central Animated Greeting */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="overflow-hidden">
              <motion.h1
                id="loader-greeting"
                key={currentGreeting}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="text-4xl md:text-7xl font-sans font-bold tracking-tighter text-white"
              >
                {currentGreeting}
              </motion.h1>
            </div>
            <p className="text-xs font-mono text-[#71717a] mt-4 tracking-widest">
              INITIALIZING CREATIVE SYSTEMS
            </p>
          </div>

          {/* Bottom status and percentage */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <div className="flex flex-col gap-1 w-full max-w-xs">
              <div className="flex justify-between text-[10px] font-mono text-[#71717a]">
                <span>LOADING ASSETS</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-[1px] bg-[#27272a] overflow-hidden">
                <motion.div
                  className="h-full bg-[#00f2fe]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="text-right">
              <div className="text-6xl md:text-8xl font-sans font-extrabold tracking-tight text-white leading-none">
                {String(progress).padStart(3, '0')}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
