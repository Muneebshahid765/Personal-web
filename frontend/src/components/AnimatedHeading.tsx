import { motion } from 'motion/react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
}

export default function AnimatedHeading({ text, className = '', tag = 'h2', delay = 0 }: AnimatedHeadingProps) {
  // Split heading into individual characters
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.02, 
        delayChildren: custom,
      },
    }),
  };

  const letterVariants = {
    hidden: { y: '105%', rotateZ: 5 },
    visible: {
      y: 0,
      rotateZ: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1], // Custom cubic-bezier for snappy, elegant slide
      },
    },
  };

  const Tag = tag;

  return (
    <div className="overflow-hidden py-1">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        custom={delay}
        className="inline-block"
      >
        <Tag className={`${className} flex flex-wrap leading-tight`}>
          {letters.map((char, index) => (
            <span key={index} className="overflow-hidden inline-block relative">
              <motion.span
                variants={letterVariants}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </Tag>
      </motion.div>
    </div>
  );
}
