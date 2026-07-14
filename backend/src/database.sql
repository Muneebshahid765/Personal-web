-- ========================================================
-- MUNEEB SHAHID - SENIOR FULL-STACK DEVELOPER PORTFOLIO
-- SQL SCHEMA FOR PHPMYADMIN (MySQL / MariaDB)
-- ========================================================

-- Create Database (Uncomment if needed, or import directly to your cPanel database)
-- CREATE DATABASE IF NOT EXISTS `muneebcodes_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `muneebcodes_db`;

-- --------------------------------------------------------
-- 1. Table structure for table `services`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` VARCHAR(50) NOT NULL,
  `features` TEXT NOT NULL, -- Comma-separated features
  `details` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Table structure for table `experiences`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `experiences`;
CREATE TABLE `experiences` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `role` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) NOT NULL,
  `period` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL, -- Split by pipe character (|)
  `skills` TEXT NOT NULL -- Comma-separated skills
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Table structure for table `skills`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `level` INT NOT NULL,
  `category` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Table structure for table `projects`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255) NOT NULL,
  `challenge` TEXT NOT NULL,
  `solution` TEXT NOT NULL,
  `results` TEXT NOT NULL, -- Comma-separated results
  `category` VARCHAR(100) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `technologies` TEXT NOT NULL, -- Comma-separated technologies
  `year` VARCHAR(10) NOT NULL,
  `client` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Table structure for table `blog_articles`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `blog_articles`;
CREATE TABLE `blog_articles` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `readTime` VARCHAR(50) NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `summary` TEXT NOT NULL,
  `content` TEXT NOT NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `author` VARCHAR(100) DEFAULT 'Muneeb Shahid',
  `authorRole` VARCHAR(100) DEFAULT 'Senior Full-Stack Developer',
  `likes` INT DEFAULT 0,
  `views` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 6. Table structure for table `messages`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `budget` VARCHAR(50) NOT NULL,
  `details` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- SEED DATA FOR SERVICES
-- ========================================================
INSERT INTO `services` (`id`, `title`, `description`, `price`, `features`, `details`) VALUES
('backend-arch', 'Robust Backend & API Architecture', 'High-performance server development, secure distributed systems, transactional database schema designs, and fast microservices.', '$6,000+', 'Custom RESTful / GraphQL API Development,PostgreSQL, MongoDB & Redis Caching Setup,Secure Auth (JWT, OAuth 2.0, Multi-Factor),Docker Containerization & GCP Cloud Run Setup,Real-time WebSocket & Event-Driven systems', 'We build ironclad server systems designed to survive extreme user spikes. By configuring smart connection pooling, strict validation schemas, high-throughput caching layers, and decoupled event listeners, we guarantee 99.99% uptime and sub-20ms database queries.'),
('fullstack-dev', 'Elite Full-Stack Engineering', 'Complete end-to-end product development bridging robust backend server clusters with cinematic, responsive user interfaces.', '$9,500+', 'Node.js / Fastify Backends & Vite React Frontends,State-of-the-art Drizzle / Prisma ORM Integration,Real-time state sync & multi-user dashboards,Complete automated CI/CD pipeline configuration,End-to-end security compliance and unit testing', 'Get the absolute best of both worlds. We design secure database schemas and robust server routes, then map that telemetry onto highly artistic, kinetic, fluid React web interfaces. One cohesive mind, absolute architectural alignment.'),
('frontend-dev', 'High-Performance Frontend Systems', 'Lightweight, modern, modular React frontends utilizing cutting-edge styling frameworks, seamless transition libraries, and strict performance metrics.', '$4,000+', 'React 19 / Next.js / Vite Integration,Custom Tailwind CSS v4 design translation,Fluid state management & localized caching,Staggered Framer Motion layout entering,Core Web Vitals diagnostic & remediation', 'We code with surgical precision. Our interfaces are lightweight, modular, and responsive. We treat animations not as decorations, but as functional cues that direct user attention and make the application feel fluid and tactile.'),
('speed-opt', 'Performance & Speed Optimization', 'Auditing and refactoring sluggish full-stack apps to achieve perfect 100/100 Lighthouse metrics and 60 FPS scrolling.', '$2,500+', 'Database Query Tuning & Indexing Optimization,Bundle Size Reduction & Lazy Loading,Web Worker Data Thread Offloading,Image WebP / AVIF Compression & Caching,Stable 60 FPS rendering on older mobile devices', 'A beautiful website is useless if users bounce before it loads. We audit your backend queries, optimize API response payloads, remove render-blocking frontend resources, and fine-tune rendering loops to provide instant, sub-millisecond loading experiences.');

-- ========================================================
-- SEED DATA FOR EXPERIENCES
-- ========================================================
INSERT INTO `experiences` (`id`, `role`, `company`, `period`, `description`, `skills`) VALUES
('exp-1', 'Lead Full-Stack Architect', 'Aetheric Interactive Studio', '2024 - Present', 'Architected highly scalable Node.js microservices, distributed real-time architectures, and custom caching models.|Supervised a team of 6 developers, aligning secure database integrations with immersive 3D WebGL frontends.|Refactored the core spatial rendering API and backend sync pipeline, reducing average query responses to sub-15ms.', 'Node.js,PostgreSQL,Redis,Docker,React,Three.js,GLSL,TypeScript'),
('exp-2', 'Senior Backend & Full-Stack Engineer', 'Symmetric Digital', '2022 - 2024', 'Designed high-throughput data pipelines, handling real-time biometric metrics streaming and complex data aggregation.|Implemented robust OAuth 2.0 / security protocols, rate-limiters, and role-based access controls across core APIs.|Collaborated closely with design teams to map optimized server telemetry into glassmorphic dashboards using React and D3.js.', 'Express,PostgreSQL,MongoDB,REST APIs,React,Framer Motion,D3.js'),
('exp-3', 'Full-Stack Developer', 'Freelance & Agency Solutions', '2020 - 2022', 'Developed custom e-commerce database engines, custom payment gateway flows, and secure CMS administration portals.|Integrated Stripe APIs, automated mailing services, and performed zero-downtime SQL migrations.|Created smooth interactive client interfaces styled with responsive Tailwind systems and client-side storage.', 'Node.js,Express,SQL Databases,Stripe API,React,Tailwind CSS');

-- ========================================================
-- SEED DATA FOR SKILLS
-- ========================================================
INSERT INTO `skills` (`name`, `level`, `category`) VALUES
('Node.js / Express / Fastify', 98, 'backend'),
('System Architecture & Microservices', 97, 'backend'),
('PostgreSQL / MongoDB / Redis', 95, 'backend'),
('RESTful & GraphQL API Design', 98, 'backend'),
('Docker / Cloud Run / GCP', 92, 'backend'),
('Database Query Tuning & Indexing', 94, 'backend'),
('React 19 / Next.js / Vite', 92, 'frontend'),
('TypeScript', 90, 'frontend'),
('Tailwind CSS v4', 95, 'frontend'),
('HTML5 Semantic Layout', 94, 'frontend'),
('CSS Grid & Flexbox', 95, 'frontend'),
('Three.js / WebGL / GLSL', 85, 'libraries'),
('Framer Motion', 92, 'libraries'),
('GSAP (TweenMax & ScrollTrigger)', 88, 'libraries'),
('D3.js (Data Plotting)', 86, 'libraries'),
('Lenis Smooth Scroll', 88, 'libraries'),
('Git & GitHub Actions', 94, 'tools'),
('Vite & Esbuild Bundling', 92, 'tools'),
('Figma', 88, 'tools'),
('Spline 3D', 75, 'tools'),
('VS Code & Advanced Debugging', 95, 'tools');

-- ========================================================
-- SEED DATA FOR PROJECTS
-- ========================================================
INSERT INTO `projects` (`id`, `title`, `subtitle`, `challenge`, `solution`, `results`, `category`, `image`, `featured`, `technologies`, `year`, `client`) VALUES
('cyber-dashboard', 'Aether OS Mobile Dashboard', 'Next-gen mobile experience designed around interactive kinetic typography and real-time biometric analysis.', 'Aether wanted to reimagine how biometric metrics could be presented to users without feeling overwhelming or clinically dry. They needed a design language that was fluid, artistic, and responsive to sensory data.', 'We constructed a kinetic fluid-grid layout that morphs dynamically. Utilizing React Native Skia, we generated glassmorphic interactive widgets that pulse in sync with the user\'s heartbeat, accompanied by minimalist dark layouts and customizable neon accents.', 'Featured on Awwwards (Site of the Day),42% increase in daily user engagement,Awarded "Best Mobile UX 2026" by Web Design League', 'Mobile UX/UI', '/src/assets/images/project_cyber_1783958334788.jpg', 1, 'React Native,Skia,Tailwind,Framer Motion', '2026', 'Aether Technologies'),
('metaverse-gallery', 'OmniSphere 3D WebGL Gallery', 'An immersive, spatial 3D art gallery rendering virtual luxury sculptures on a high-speed custom WebGL canvas.', 'Traditional 3D portfolios render slowly and stutter on mobile devices. The client needed a flawless, interactive spatial WebGL environment that could load 40+ high-fidelity digital sculptures seamlessly while maintaining a stable 60 FPS on mobile and desktop alike.', 'We built a bespoke asset compression pipeline and combined it with custom vertex and fragment shaders. By offloading complex particle computations to the GPU and utilizing pre-baked lighting maps, we designed a responsive and lightweight virtual gallery.', 'Perfect 100/100 performance score on Lighthouse Mobile,Over 250,000 unique spatial visits in the first week,FWA of the Month award winner', '3D Websites', '/src/assets/images/project_metaverse_1783958356292.jpg', 1, 'React Three Fiber,GSAP,GLSL Shaders,Vite', '2025', 'OmniSphere Arts'),
('nexus-wearables', 'Nexus Holographic Wearables', 'A high-end tactile wearable application integrating low-latency Bluetooth and real-time kinetic UI overlays.', 'Connecting raw sensor data to a clean mobile interface historically feels sluggish. The client required instant typography-based reactions that pulse and scale fluidly to match physical gestures.', 'We created an advanced spring-mesh engine in TypeScript that maps wrist acceleration coordinates to dynamic visual weights. The typography morphs its font-stretch property in real time, mirroring body kinetics.', 'Voted Top 10 Wearable Interfaces on Behance,Average latency reduced below 8ms on standard hardware,94% user satisfaction rate during active physical beta trials', 'Mobile UX/UI', 'https://picsum.photos/seed/wearable/800/600', 1, 'React Native,SwiftUI,Tailwind CSS,Web Bluetooth', '2026', 'Nexus Labs Inc'),
('aurora-spatial', 'Aurora Spatial Audio Engine', 'An immersive web interface that maps real-time 3D audio clusters onto an interactive interactive audio canvas.', 'Traditional digital audio workstations feel rigid. The client wanted an abstract, emotional, and intuitive way to position, mix, and analyze spatial sounds.', 'We designed an interactive canvas where sound sources are visual celestial bodies. By dragging and resizing these glowing spheres, users modify 3D coordinate gains, panning, and wet-dry reverbs inside a realistic WebGL orbit.', 'Recognized by standard tech publications for interactive design,Increased audio mix efficiency by 35% compared to linear controls,Honored with the CSS Design Innovation Award', '3D Websites', 'https://picsum.photos/seed/aurora/800/600', 0, 'Web Audio API,Three.js,React,Tailwind CSS', '2025', 'Aurora Soundscapes'),
('brand-identity', 'Lumina Minimalist Luxury Brand', 'High-end branding, premium web design, and digital storefront layout for an eco-luxury sustainable skincare line.', 'The eco-luxury market is heavily saturated with boilerplate designs. Lumina required a visual identity and custom e-commerce web design that expressed high tactile luxury, sustainable ethics, and deep cinematic layout transitions.', 'We engineered an elegant typography pairing using editorial serifs and monospace data stamps, set against a warm, high-contrast light theme with rich charcoal accents. Scroll events trigger custom image-reveal masks and micro-animations to enhance tactile feedback.', 'Brand redesign led to a 180% surge in online sales,CSS Design Awards: Best UI/UX and Best Innovation,Acclaimed for eco-minimalist web packaging', 'Branding & Web', 'https://picsum.photos/seed/lumina/800/600', 0, 'React,Lenis Scroll,Tailwind CSS,CSS Grid', '2025', 'Lumina Skincare'),
('interactive-optimization', 'Krypton Real-time Analytics Engine', 'High-performance interactive web application delivering instant sub-millisecond charting for complex data structures.', 'The client faced massive rendering bottlenecks, with charts choking when handling over 100,000 live streaming points. They needed instant interactive visual feedback and fluid zooming/panning on mobile.', 'We refactored their plotting system to use a hybrid Canvas/SVG engine powered by Web Workers to process streaming data in parallel threads, keeping the React main UI thread completely unblocked.', 'Average chart loading time plummeted from 4.2s to 12ms,CPU usage dropped by 75% on intensive data cycles,Smooth 60 FPS performance on all entry-level smartphones', 'Website Optimization', 'https://picsum.photos/seed/krypton/800/600', 0, 'D3.js,Web Workers,React Router,Tailwind CSS', '2025', 'Krypton Labs');

-- ========================================================
-- SEED DATA FOR BLOG ARTICLES
-- ========================================================
INSERT INTO `blog_articles` (`id`, `title`, `category`, `readTime`, `date`, `image`, `summary`, `content`, `featured`) VALUES
('3d-web-performance', 'Architecting High-Performance WebGL Environments for the Modern Web', '3D Websites', '6 min read', 'Jul 10, 2026', 'https://picsum.photos/seed/webgl-art/800/600', 'Discover key optimization workflows for combining React, Three.js, and custom GLSL shaders without degrading page-load times or causing mobile frame drops.', 'Creating a modern 3D WebGL experience is exciting, but it often comes with a steep performance penalty. In this deep dive, we explore how to optimize texture loading, implement custom shaders for lightweight vertex processing, and handle state changes smoothly. We detail asset-compression techniques, mesh instantiation, and the smart usage of GPU-bound variables to ensure that your Awwwards-worthy WebGL sites load instantly and achieve a fluid 60 FPS on smartphones.', 1),
('spatial-audio-web', 'Web Audio API: Implementing Real-time Spatial Soundscapes', '3D Websites', '8 min read', 'Jul 04, 2026', 'https://picsum.photos/seed/audiobg/800/600', 'An advanced breakdown of spatial acoustics, stereo panners, and multi-channel convolver nodes to render true auditory depth inside modern browsers.', 'Auditory feedback is a highly under-utilized tool for spatial realism. While 3D graphics create stunning vision, matching sound coordinates creates true immersion. This post discusses how to map coordinate models to Web Audio audio panner nodes, integrate custom reverb impulses using convolver nodes, and prevent browser audio thread blocking during rapid spatial shifts.', 0),
('micro-interactions-ux', 'The Psychology of Micro-Interactions in Luxury Visual Layouts', 'UI Design', '4 min read', 'Jun 28, 2026', 'https://picsum.photos/seed/ux-art/800/600', 'How subtle hover distortions, elastic magnetic elements, and customized scroll reveal transitions shape brand trust and elevate user satisfaction.', 'Micro-interactions are the heartbeat of high-end digital designs. When a user hovers over a button, they shouldn\'t just see a basic color change. An elegant magnetic pull, a soft wave-like warp, or a staggered reveal animation signals premium quality. This article explores standard easing functions, CSS spring mechanics, and tactical spatial animations that trigger positive emotional responses, making your web interactions feel premium and tangible.', 0),
('framer-motion-physics', 'Mastering Spring Physics in Framer Motion for Ultra-fluid UI', 'UI Design', '5 min read', 'May 30, 2026', 'https://picsum.photos/seed/physics/800/600', 'A mathematical and tactical guide to tuning stiffness, damping, and mass inside spring configurations to build organic and premium visual feedback.', 'Linear animations look robotic; spring animations look alive. In this guide, we dive deep into the math behind physical harmonic oscillators and how they translate to stiffness, damping, and mass values in Framer Motion. We demonstrate how to balance bounce behaviors so that UI transitions feel instantly responsive without distracting jitter.', 0),
('vite-tailwind-v4', 'Leveraging Tailwind CSS v4 and Vite for Cinematic UI Speed', 'Web Animation', '5 min read', 'May 15, 2026', 'https://picsum.photos/seed/speed-art/800/600', 'A developer guide to taking full advantage of the new Tailwind v4 compiler architecture for ultra-fast CSS compiling and instant interactive layout rendering.', 'Tailwind CSS v4 is a major leap forward for styling velocity. With its modern Rust-powered compiler and seamless Vite plugin integration, build times are almost instant. In this tutorial, we demonstrate how to set up fluid responsive scales, implement complex CSS variables inside @theme definitions, and build custom layout transitions that compile in microseconds. This setup forms the core styling architecture of our portfolio.', 0);
