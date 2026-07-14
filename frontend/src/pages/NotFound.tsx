import { motion } from 'motion/react';
import { RefreshCw, Compass, ArrowLeft } from 'lucide-react';
import { PageId } from '../types';

interface NotFoundProps {
  onPageChange: (page: PageId) => void;
}

export default function NotFound({ onPageChange }: NotFoundProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 relative text-center pt-24 pb-12 select-none">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md mx-auto space-y-8 relative z-10">
        
        {/* Animated Icon */}
        <div className="p-4 rounded-full border border-red-500/20 bg-red-500/5 w-fit mx-auto text-red-400">
          <Compass className="w-12 h-12 stroke-[1.2] animate-spin-slow" />
        </div>

        {/* 404 Error Numbers */}
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 leading-none">
            404
          </h1>
          <span className="text-xs font-mono text-red-400 tracking-widest uppercase block">
            ● ERROR: LOCATION RESOLUTION FAILED
          </span>
        </div>

        <p className="text-sm text-[#a1a1aa] font-sans leading-relaxed">
          The requested navigational coordinate does not match any index inside our developer portfolio directory. It may have been relocated or optimized.
        </p>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={() => onPageChange('home')}
            className="cursor-pointer group inline-flex items-center gap-2 bg-[#00f2fe] hover:bg-[#00d0db] text-black font-mono font-bold text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#00f2fe]/20"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            RETURN TO ENGINE HOME
          </button>
        </div>

      </div>
    </div>
  );
}
