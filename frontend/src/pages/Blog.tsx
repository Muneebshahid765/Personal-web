import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Calendar, Clock, ArrowRight, BookOpen, Sparkles, Send } from 'lucide-react';
import { Article } from '../types';
import AnimatedHeading from '../components/AnimatedHeading';
import { useQuery } from '@tanstack/react-query';

interface BlogProps {
  isDarkMode: boolean;
  selectedArticleId?: string | null;
  onSelectArticle?: (id: string | null) => void;
}

export default function Blog({ isDarkMode, selectedArticleId: propSelectedArticleId, onSelectArticle }: BlogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSelectedArticleId, setLocalSelectedArticleId] = useState<string | null>(null);

  const selectedArticleId = propSelectedArticleId !== undefined ? propSelectedArticleId : localSelectedArticleId;
  const setSelectedArticleId = onSelectArticle || setLocalSelectedArticleId;
  
  const { data: articlesList = [] } = useQuery<Article[]>({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await fetch('https://muneebcodes.tech/app/api/blog');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    }
  });
  
  const [newsEmail, setNewsEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = ['All', '3D Websites', 'UI Design', 'Web Animation'];

  // Handle Search & Filter (Derived state)
  const filteredArticles = (() => {
    let result = articlesList;
    
    if (selectedCategory !== 'All') {
      result = result.filter(a => a.category === selectedCategory);
    }
    
    if (searchTerm.trim() !== '') {
      result = result.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  })();

  const featuredArticle = articlesList.find(a => a.featured) || articlesList[0];
  const listArticles = filteredArticles.filter(a => a.id !== selectedArticleId);

  // Find currently reading article
  const activeArticle = articlesList.find(a => a.id === selectedArticleId) || null;
  // Related articles (articles sharing the same category, excluding the current one)
  const relatedArticles = activeArticle 
    ? articlesList.filter(a => a.category === activeArticle.category && a.id !== activeArticle.id)
    : [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setIsSubscribed(true);
    setNewsEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="space-y-6 pb-8 border-b border-neutral-200 dark:border-white/10 mb-12">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          ● JOURNAL / EDITORIALS
        </span>
        <AnimatedHeading text="CREATIVE THINKING" className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-neutral-900 dark:text-white" />
        <p className="text-sm md:text-base text-neutral-600 dark:text-[#a1a1aa] max-w-2xl leading-relaxed">
          Essays and deep-dives detailing WebGL frame budgets, mathematical layouts, CSS performance metrics, and luxury visual direction methodologies.
        </p>
      </div>

      {/* ================= SEARCH & CATEGORY BAR ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        
        {/* Categories (Left) */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase cursor-pointer border transition-colors duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#00f2fe] text-black border-[#00f2fe] font-bold shadow-lg shadow-[#00f2fe]/20'
                  : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-650 dark:text-[#a1a1aa] hover:border-neutral-400 dark:hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input (Right) */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH JOURNAL..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-mono tracking-widest rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-zinc-500 focus:outline-none focus:border-[#00f2fe] uppercase transition-colors"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* ================= FEATURED ARTICLE BLOCK ================= */}
      {searchTerm === '' && selectedCategory === 'All' && featuredArticle && (
        <div
          onClick={() => setSelectedArticleId(featuredArticle.id)}
          className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md mb-16 hover:border-[#00f2fe]/20 transition-all duration-300"
        >
          {/* Visual Column */}
          <div className="lg:col-span-7">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-[#121214]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-[#00f2fe] tracking-widest uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                <span>FEATURED JOURNAL READ</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-neutral-900 dark:text-white group-hover:text-[#00f2fe] transition-colors duration-300">
                {featuredArticle.title}
              </h3>

              <p className="text-xs md:text-sm text-neutral-600 dark:text-[#a1a1aa] leading-relaxed">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-neutral-200 dark:border-white/5 text-xs font-mono text-neutral-500 dark:text-[#71717a]">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#00f2fe]" />
                  {featuredArticle.readTime}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-[#00f2fe] font-bold tracking-widest group-hover:translate-x-1 transition-transform">
                <span>READ NOW</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ARTICLES LISTING GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedArticleId(article.id)}
              className="group cursor-pointer p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md flex flex-col justify-between h-full space-y-6 hover:border-[#00f2fe]/20 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-[#121214]">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase">
                  <span>{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h4 className="text-base font-sans font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-[#00f2fe] transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-neutral-650 dark:text-[#a1a1aa] line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-550 dark:text-[#71717a] border-t border-neutral-200 dark:border-white/5 pt-4">
                <span>{article.readTime}</span>
                <div className="flex items-center gap-1 text-[#00f2fe] font-bold tracking-widest uppercase">
                  <span>READ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>      {/* ================= INDIVIDUAL BLOG VIEW MODAL ================= */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            id="article-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl p-4 md:p-8 overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="w-full max-w-4xl rounded-3xl bg-white/95 dark:bg-[#0d0d0f]/95 border border-neutral-200 dark:border-white/15 overflow-hidden text-left shadow-2xl relative flex flex-col max-h-[90vh] backdrop-blur-2xl"
            >
              
              {/* Sticky Header */}
              <div className="flex justify-between items-center px-6 py-4 md:px-8 border-b border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-[#0d0d0f]/95 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00f2fe] tracking-widest">
                  <BookOpen className="w-3.5 h-3.5 animate-pulse" />
                  <span>CREATIVE ESSAY READER</span>
                </div>
                <button
                  id="close-article-btn"
                  onClick={() => setSelectedArticleId(null)}
                  className="cursor-pointer p-2 rounded-full hover:bg-neutral-150 dark:hover:bg-white/10 text-neutral-850 dark:text-white transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 md:p-10 space-y-8 overflow-y-auto">
                
                {/* Meta header details */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-[#71717a] uppercase">
                    <span className="text-[#00f2fe] font-bold">{activeArticle.category}</span>
                    <span>•</span>
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-sans font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
                    {activeArticle.title}
                  </h2>
                </div>

                {/* Cover Image */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-[#121214] border border-neutral-200 dark:border-white/10">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Core Essay Content (Markdown style) */}
                <div className="space-y-6 pt-4 text-xs md:text-sm text-neutral-600 dark:text-[#a1a1aa] leading-relaxed font-sans max-w-3xl">
                  <p className="text-sm md:text-base text-neutral-800 dark:text-white font-medium leading-relaxed italic">
                    "{activeArticle.summary}"
                  </p>
                  
                  <p>
                    {activeArticle.content}
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Proin elementum tempus egestas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                  </p>

                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                  </p>
                </div>

                {/* Related Articles listing */}
                {relatedArticles.length > 0 && (
                  <div className="space-y-4 pt-8 border-t border-neutral-200 dark:border-white/5">
                    <h4 className="text-xs font-mono text-neutral-500 dark:text-zinc-500 tracking-widest uppercase">RELATED WRITEUPS</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relatedArticles.map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => setSelectedArticleId(rel.id)}
                          className="group cursor-pointer p-4 rounded-xl border border-neutral-200 dark:border-white/5 bg-white/40 dark:bg-white/5 hover:border-[#00f2fe]/20 transition-colors"
                        >
                          <span className="text-[10px] font-mono text-neutral-500 dark:text-[#71717a] uppercase">{rel.category}</span>
                          <h5 className="font-sans font-bold text-neutral-900 dark:text-white text-xs md:text-sm group-hover:text-[#00f2fe] transition-colors mt-1">
                            {rel.title}
                          </h5>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sticky Footer */}
              <div className="px-6 py-4 md:px-8 border-t border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-[#0d0d0f]/95 flex justify-end sticky bottom-0">
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase border border-neutral-200 dark:border-white/10 text-neutral-750 dark:text-white hover:border-[#00f2fe] dark:hover:border-white/30 transition-colors duration-300"
                >
                  CLOSE JOURNAL READER
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="mt-24 pt-16 border-t border-neutral-200 dark:border-white/5 text-center max-w-4xl mx-auto">
        <div className="p-8 md:p-16 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md relative overflow-hidden space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
              ● STAY IN THE TUNING LOOP
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-black text-neutral-900 dark:text-white uppercase">
              SUBSCRIBE TO DIGITAL JOURNAL
            </h3>
            <p className="text-xs text-neutral-600 dark:text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
              Receive notifications on graphics programming tricks, responsive design systems, and WebGL asset bakes directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="ENTER USER EMAIL ADDRESS..."
                className="w-full px-5 py-3.5 text-xs font-mono tracking-widest rounded-full bg-neutral-100 dark:bg-black/40 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-zinc-600 focus:outline-none focus:border-[#00f2fe] uppercase transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#00f2fe] text-black p-2 rounded-full hover:bg-[#00d0db] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-[#00f2fe] font-mono uppercase"
              >
                ★ EXCELLENT! Check your inbox soon.
              </motion.div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
