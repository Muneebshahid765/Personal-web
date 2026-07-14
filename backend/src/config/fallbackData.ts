export const services = [
  {
    id: 'backend-arch',
    title: 'Robust Backend & API Architecture',
    description: 'High-performance server development, secure distributed systems, transactional database schema designs, and fast microservices.',
    price: '$6,000+',
    features: [
      'Custom RESTful / GraphQL API Development',
      'PostgreSQL, MongoDB & Redis Caching Setup',
      'Secure Auth (JWT, OAuth 2.0, Multi-Factor)',
      'Docker Containerization & GCP Cloud Run Setup',
      'Real-time WebSocket & Event-Driven systems'
    ],
    details: 'We build ironclad server systems designed to survive extreme user spikes. By configuring smart connection pooling, strict validation schemas, high-throughput caching layers, and decoupled event listeners, we guarantee 99.99% uptime and sub-20ms database queries.'
  },
  {
    id: 'fullstack-dev',
    title: 'Elite Full-Stack Engineering',
    description: 'Complete end-to-end product development bridging robust backend server clusters with cinematic, responsive user interfaces.',
    price: '$9,500+',
    features: [
      'Node.js / Fastify Backends & Vite React Frontends',
      'State-of-the-art Drizzle / Prisma ORM Integration',
      'Real-time state sync & multi-user dashboards',
      'Complete automated CI/CD pipeline configuration',
      'End-to-end security compliance and unit testing'
    ],
    details: 'Get the absolute best of both worlds. We design secure database schemas and robust server routes, then map that telemetry onto highly artistic, kinetic, fluid React web interfaces. One cohesive mind, absolute architectural alignment.'
  },
  {
    id: 'frontend-dev',
    title: 'High-Performance Frontend Systems',
    description: 'Lightweight, modern, modular React frontends utilizing cutting-edge styling frameworks, seamless transition libraries, and strict performance metrics.',
    price: '$4,000+',
    features: [
      'React 19 / Next.js / Vite Integration',
      'Custom Tailwind CSS v4 design translation',
      'Fluid state management & localized caching',
      'Staggered Framer Motion layout entering',
      'Core Web Vitals diagnostic & remediation'
    ],
    details: 'We code with surgical precision. Our interfaces are lightweight, modular, and responsive. We treat animations not as decorations, but as functional cues that direct user attention and make the application feel fluid and tactile.'
  },
  {
    id: 'speed-opt',
    title: 'Performance & Speed Optimization',
    description: 'Auditing and refactoring sluggish full-stack apps to achieve perfect 100/100 Lighthouse metrics and 60 FPS scrolling.',
    price: '$2,500+',
    features: [
      'Database Query Tuning & Indexing Optimization',
      'Bundle Size Reduction & Lazy Loading',
      'Web Worker Data Thread Offloading',
      'Image WebP / AVIF Compression & Caching',
      'Stable 60 FPS rendering on older mobile devices'
    ],
    details: 'A beautiful website is useless if users bounce before it loads. We audit your backend queries, optimize API response payloads, remove render-blocking frontend resources, and fine-tune rendering loops to provide instant, sub-millisecond loading experiences.'
  }
];

export const experiences = [
  {
    id: 'exp-1',
    role: 'Lead Full-Stack Architect',
    company: 'Aetheric Interactive Studio',
    period: '2024 - Present',
    description: [
      'Architected highly scalable Node.js microservices, distributed real-time architectures, and custom caching models.',
      'Supervised a team of 6 developers, aligning secure database integrations with immersive 3D WebGL frontends.',
      'Refactored the core spatial rendering API and backend sync pipeline, reducing average query responses to sub-15ms.'
    ],
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'React', 'Three.js', 'GLSL', 'TypeScript']
  },
  {
    id: 'exp-2',
    role: 'Senior Backend & Full-Stack Engineer',
    company: 'Symmetric Digital',
    period: '2022 - 2024',
    description: [
      'Designed high-throughput data pipelines, handling real-time biometric metrics streaming and complex data aggregation.',
      'Implemented robust OAuth 2.0 / security protocols, rate-limiters, and role-based access controls across core APIs.',
      'Collaborated closely with design teams to map optimized server telemetry into glassmorphic dashboards using React and D3.js.'
    ],
    skills: ['Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'React', 'Framer Motion', 'D3.js']
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Developer',
    company: 'Freelance & Agency Solutions',
    period: '2020 - 2022',
    description: [
      'Developed custom e-commerce database engines, custom payment gateway flows, and secure CMS administration portals.',
      'Integrated Stripe APIs, automated mailing services, and performed zero-downtime SQL migrations.',
      'Created smooth interactive client interfaces styled with responsive Tailwind systems and client-side storage.'
    ],
    skills: ['Node.js', 'Express', 'SQL Databases', 'Stripe API', 'React', 'Tailwind CSS']
  }
];

export const skills = [
  { name: 'Node.js / Express / Fastify', level: 98, category: 'backend' },
  { name: 'System Architecture & Microservices', level: 97, category: 'backend' },
  { name: 'PostgreSQL / MongoDB / Redis', level: 95, category: 'backend' },
  { name: 'RESTful & GraphQL API Design', level: 98, category: 'backend' },
  { name: 'Docker / Cloud Run / GCP', level: 92, category: 'backend' },
  { name: 'Database Query Tuning & Indexing', level: 94, category: 'backend' },
  { name: 'React 19 / Next.js / Vite', level: 92, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Tailwind CSS v4', level: 95, category: 'frontend' },
  { name: 'HTML5 Semantic Layout', level: 94, category: 'frontend' },
  { name: 'CSS Grid & Flexbox', level: 95, category: 'frontend' },
  { name: 'Three.js / WebGL / GLSL', level: 85, category: 'libraries' },
  { name: 'Framer Motion', level: 92, category: 'libraries' },
  { name: 'GSAP (TweenMax & ScrollTrigger)', level: 88, category: 'libraries' },
  { name: 'D3.js (Data Plotting)', level: 86, category: 'libraries' },
  { name: 'Lenis Smooth Scroll', level: 88, category: 'libraries' },
  { name: 'Git & GitHub Actions', level: 94, category: 'tools' },
  { name: 'Vite & Esbuild Bundling', level: 92, category: 'tools' },
  { name: 'Figma', level: 88, category: 'tools' },
  { name: 'Spline 3D', level: 75, category: 'tools' },
  { name: 'VS Code & Advanced Debugging', level: 95, category: 'tools' }
];

export const projects = [
  {
    id: 'cyber-dashboard',
    title: 'Aether OS Mobile Dashboard',
    subtitle: 'Next-gen mobile experience designed around interactive kinetic typography and real-time biometric analysis.',
    category: 'Mobile UX/UI',
    image: '/src/assets/images/project_cyber_1783958334788.jpg',
    featured: true,
    technologies: ['React Native', 'Skia', 'Tailwind', 'Framer Motion'],
    year: '2026',
    client: 'Aether Technologies',
    challenge: 'Aether wanted to reimagine how biometric metrics could be presented to users without feeling overwhelming or clinically dry. They needed a design language that was fluid, artistic, and responsive to sensory data.',
    solution: 'We constructed a kinetic fluid-grid layout that morphs dynamically. Utilizing React Native Skia, we generated glassmorphic interactive widgets that pulse in sync with the user\'s heartbeat, accompanied by minimalist dark layouts and customizable neon accents.',
    results: [
      'Featured on Awwwards (Site of the Day)',
      '42% increase in daily user engagement',
      'Awarded "Best Mobile UX 2026" by Web Design League'
    ]
  },
  {
    id: 'metaverse-gallery',
    title: 'OmniSphere 3D WebGL Gallery',
    subtitle: 'An immersive, spatial 3D art gallery rendering virtual luxury sculptures on a high-speed custom WebGL canvas.',
    category: '3D Websites',
    image: '/src/assets/images/project_metaverse_1783958356292.jpg',
    featured: true,
    technologies: ['React Three Fiber', 'GSAP', 'GLSL Shaders', 'Vite'],
    year: '2025',
    client: 'OmniSphere Arts',
    challenge: 'Traditional 3D portfolios render slowly and stutter on mobile devices. The client needed a flawless, interactive spatial WebGL environment that could load 40+ high-fidelity digital sculptures seamlessly while maintaining a stable 60 FPS on mobile and desktop alike.',
    solution: 'We built a bespoke asset compression pipeline and combined it with custom vertex and fragment shaders. By offloading complex particle computations to the GPU and utilizing pre-baked lighting maps, we designed a responsive and lightweight virtual gallery.',
    results: [
      'Perfect 100/100 performance score on Lighthouse Mobile',
      'Over 250,000 unique spatial visits in the first week',
      'FWA of the Month award winner'
    ]
  },
  {
    id: 'nexus-wearables',
    title: 'Nexus Holographic Wearables',
    subtitle: 'A high-end tactile wearable application integrating low-latency Bluetooth and real-time kinetic UI overlays.',
    category: 'Mobile UX/UI',
    image: 'https://picsum.photos/seed/wearable/800/600',
    featured: true,
    technologies: ['React Native', 'SwiftUI', 'Tailwind CSS', 'Web Bluetooth'],
    year: '2026',
    client: 'Nexus Labs Inc',
    challenge: 'Connecting raw sensor data to a clean mobile interface historically feels sluggish. The client required instant typography-based reactions that pulse and scale fluidly to match physical gestures.',
    solution: 'We created an advanced spring-mesh engine in TypeScript that maps wrist acceleration coordinates to dynamic visual weights. The typography morphs its font-stretch property in real time, mirroring body kinetics.',
    results: [
      'Voted Top 10 Wearable Interfaces on Behance',
      'Average latency reduced below 8ms on standard hardware',
      '94% user satisfaction rate during active physical beta trials'
    ]
  },
  {
    id: 'aurora-spatial',
    title: 'Aurora Spatial Audio Engine',
    subtitle: 'An immersive web interface that maps real-time 3D audio clusters onto an interactive interactive audio canvas.',
    category: '3D Websites',
    image: 'https://picsum.photos/seed/aurora/800/600',
    featured: false,
    technologies: ['Web Audio API', 'Three.js', 'React', 'Tailwind CSS'],
    year: '2025',
    client: 'Aurora Soundscapes',
    challenge: 'Traditional digital audio workstations feel rigid. The client wanted an abstract, emotional, and intuitive way to position, mix, and analyze spatial sounds.',
    solution: 'We designed an interactive canvas where sound sources are visual celestial bodies. By dragging and resizing these glowing spheres, users modify 3D coordinate gains, panning, and wet-dry reverbs inside a realistic WebGL orbit.',
    results: [
      'Recognized by standard tech publications for interactive design',
      'Increased audio mix efficiency by 35% compared to linear controls',
      'Honored with the CSS Design Innovation Award'
    ]
  },
  {
    id: 'brand-identity',
    title: 'Lumina Minimalist Luxury Brand',
    subtitle: 'High-end branding, premium web design, and digital storefront layout for an eco-luxury sustainable skincare line.',
    category: 'Branding & Web',
    image: 'https://picsum.photos/seed/lumina/800/600',
    featured: false,
    technologies: ['React', 'Lenis Scroll', 'Tailwind CSS', 'CSS Grid'],
    year: '2025',
    client: 'Lumina Skincare',
    challenge: 'The eco-luxury market is heavily saturated with boilerplate designs. Lumina required a visual identity and custom e-commerce web design that expressed high tactile luxury, sustainable ethics, and deep cinematic layout transitions.',
    solution: 'We engineered an elegant typography pairing using editorial serifs and monospace data stamps, set against a warm, high-contrast light theme with rich charcoal accents. Scroll events trigger custom image-reveal masks and micro-animations to enhance tactile feedback.',
    results: [
      'Brand redesign led to a 180% surge in online sales',
      'CSS Design Awards: Best UI/UX and Best Innovation',
      'Acclaimed for eco-minimalist web packaging'
    ]
  },
  {
    id: 'interactive-optimization',
    title: 'Krypton Real-time Analytics Engine',
    subtitle: 'High-performance interactive web application delivering instant sub-millisecond charting for complex data structures.',
    category: 'Website Optimization',
    image: 'https://picsum.photos/seed/krypton/800/600',
    featured: false,
    technologies: ['D3.js', 'Web Workers', 'React Router', 'Tailwind CSS'],
    year: '2025',
    client: 'Krypton Labs',
    challenge: 'The client faced massive rendering bottlenecks, with charts choking when handling over 100,000 live streaming points. They needed instant interactive visual feedback and fluid zooming/panning on mobile.',
    solution: 'We refactored their plotting system to use a hybrid Canvas/SVG engine powered by Web Workers to process streaming data in parallel threads, keeping the React main UI thread completely unblocked.',
    results: [
      'Average chart loading time plummeted from 4.2s to 12ms',
      'CPU usage dropped by 75% on intensive data cycles',
      'Smooth 60 FPS performance on all entry-level smartphones'
    ]
  }
];

export const articles = [
  {
    id: '3d-web-performance',
    title: 'Architecting High-Performance WebGL Environments for the Modern Web',
    category: '3D Websites',
    readTime: '6 min read',
    date: 'Jul 10, 2026',
    image: 'https://picsum.photos/seed/webgl-art/800/600',
    summary: 'Discover key optimization workflows for combining React, Three.js, and custom GLSL shaders without degrading page-load times or causing mobile frame drops.',
    content: 'Creating a modern 3D WebGL experience is exciting, but it often comes with a steep performance penalty. In this deep dive, we explore how to optimize texture loading, implement custom shaders for lightweight vertex processing, and handle state changes smoothly. We detail asset-compression techniques, mesh instantiation, and the smart usage of GPU-bound variables to ensure that your Awwwards-worthy WebGL sites load instantly and achieve a fluid 60 FPS on smartphones.',
    featured: true
  },
  {
    id: 'spatial-audio-web',
    title: 'Web Audio API: Implementing Real-time Spatial Soundscapes',
    category: '3D Websites',
    readTime: '8 min read',
    date: 'Jul 04, 2026',
    image: 'https://picsum.photos/seed/audiobg/800/600',
    summary: 'An advanced breakdown of spatial acoustics, stereo panners, and multi-channel convolver nodes to render true auditory depth inside modern browsers.',
    content: 'Auditory feedback is a highly under-utilized tool for spatial realism. While 3D graphics create stunning vision, matching sound coordinates creates true immersion. This post discusses how to map coordinate models to Web Audio audio panner nodes, integrate custom reverb impulses using convolver nodes, and prevent browser audio thread blocking during rapid spatial shifts.',
    featured: false
  },
  {
    id: 'micro-interactions-ux',
    title: 'The Psychology of Micro-Interactions in Luxury Visual Layouts',
    category: 'UI Design',
    readTime: '4 min read',
    date: 'Jun 28, 2026',
    image: 'https://picsum.photos/seed/ux-art/800/600',
    summary: 'How subtle hover distortions, elastic magnetic elements, and customized scroll reveal transitions shape brand trust and elevate user satisfaction.',
    content: 'Micro-interactions are the heartbeat of high-end digital designs. When a user hovers over a button, they shouldn\'t just see a basic color change. An elegant magnetic pull, a soft wave-like warp, or a staggered reveal animation signals premium quality. This article explores standard easing functions, CSS spring mechanics, and tactical spatial animations that trigger positive emotional responses, making your web interactions feel premium and tangible.',
    featured: false
  },
  {
    id: 'framer-motion-physics',
    title: 'Mastering Spring Physics in Framer Motion for Ultra-fluid UI',
    category: 'UI Design',
    readTime: '5 min read',
    date: 'May 30, 2026',
    image: 'https://picsum.photos/seed/physics/800/600',
    summary: 'A mathematical and tactical guide to tuning stiffness, damping, and mass inside spring configurations to build organic and premium visual feedback.',
    content: 'Linear animations look robotic; spring animations look alive. In this guide, we dive deep into the math behind physical harmonic oscillators and how they translate to stiffness, damping, and mass values in Framer Motion. We demonstrate how to balance bounce behaviors so that UI transitions feel instantly responsive without distracting jitter.',
    featured: false
  },
  {
    id: 'vite-tailwind-v4',
    title: 'Leveraging Tailwind CSS v4 and Vite for Cinematic UI Speed',
    category: 'Web Animation',
    readTime: '5 min read',
    date: 'May 15, 2026',
    image: 'https://picsum.photos/seed/speed-art/800/600',
    summary: 'A developer guide to taking full advantage of the new Tailwind v4 compiler architecture for ultra-fast CSS compiling and instant interactive layout rendering.',
    content: 'Tailwind CSS v4 is a major leap forward for styling velocity. With its modern Rust-powered compiler and seamless Vite plugin integration, build times are almost instant. In this tutorial, we demonstrate how to set up fluid responsive scales, implement complex CSS variables inside @theme definitions, and build custom layout transitions that compile in microseconds. This setup forms the core styling architecture of our portfolio.',
    featured: false
  }
];
