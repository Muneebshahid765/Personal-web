import { motion } from 'motion/react';

interface MarqueeProps {
  text: string[];
  speed?: number; // lower is slower
  reverse?: boolean;
}

export default function Marquee({ text, speed = 15, reverse = false }: MarqueeProps) {
  const repeatedText = [...text, ...text, ...text, ...text];

  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-4 border-y border-neutral-200 dark:border-white/5 bg-neutral-100/50 dark:bg-black/20 select-none relative z-10 flex">
      <motion.div
        className="flex gap-12 text-sm md:text-xl font-mono tracking-widest font-bold text-neutral-600 dark:text-[#a1a1aa] uppercase"
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          ease: 'linear',
          duration: speed,
          repeat: Infinity,
        }}
        style={{ display: 'inline-flex' }}
      >
        {repeatedText.map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span>{item}</span>
            <span className="w-2 h-2 rounded-full bg-[#00f2fe] inline-block animate-pulse"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
