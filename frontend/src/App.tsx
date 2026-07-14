import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';

// Components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activePage]);

  const handlePageChange = (page: PageId) => {
    setActivePage(page);
    setSelectedProjectId(null); // Clear any open case study on navigation
    setSelectedArticleId(null); // Clear any open blog post on navigation
  };

  const handleSelectProject = (projectId: string | null) => {
    setSelectedProjectId(projectId);
    if (projectId) {
      setActivePage('projects'); // Route directly to Projects tab to display the case study modal
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Render subpage content based on selection
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            onPageChange={handlePageChange}
            onSelectProject={handleSelectProject}
            isDarkMode={isDarkMode}
          />
        );
      case 'about':
        return <About isDarkMode={isDarkMode} />;
      case 'projects':
        return (
          <Projects
            selectedProjectId={selectedProjectId}
            onSelectProject={handleSelectProject}
            isDarkMode={isDarkMode}
          />
        );
      case 'services':
        return <Services isDarkMode={isDarkMode} />;
      case 'skills':
        return <Skills isDarkMode={isDarkMode} />;
      case 'experience':
        return <Experience isDarkMode={isDarkMode} />;
      case 'blog':
        return (
          <Blog
            isDarkMode={isDarkMode}
            selectedArticleId={selectedArticleId}
            onSelectArticle={setSelectedArticleId}
          />
        );
      case 'contact':
        return <Contact isDarkMode={isDarkMode} />;
      case 'admin':
        return <Admin isDarkMode={isDarkMode} />;
      default:
        return <NotFound onPageChange={handlePageChange} />;
    }
  };

  return (
    <>
      {/* 1. Introductory Loader */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* 2. Primary layout revealed after loading finishes */}
      {!isLoading && (
        <div
          id="root-layout-wrapper"
          className={`min-h-screen relative flex flex-col justify-between selection:bg-[#00f2fe] selection:text-black transition-colors duration-700 ${
            isDarkMode 
              ? 'dark bg-[#070708] text-white scheme-dark' 
              : 'bg-[#fafafa] text-[#070708] scheme-light'
          }`}
        >
          {/* Custom Trail Cursor */}
          <CustomCursor />

          {/* 3D Particle WebGL Canvas */}
          <CanvasBackground isDarkMode={isDarkMode} />

          {/* Floating Navigation Header */}
          <Navbar
            activePage={activePage}
            onPageChange={handlePageChange}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            isModalOpen={!!selectedProjectId || !!selectedArticleId}
          />

          {/* Interactive Sub-Page Content Container */}
          <main id="main-content" className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                className="w-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Universal Footer */}
          <Footer onPageChange={handlePageChange} isDarkMode={isDarkMode} />
        </div>
      )}
    </>
  );
}
