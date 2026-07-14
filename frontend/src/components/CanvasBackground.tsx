import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CanvasBackgroundProps {
  isDarkMode: boolean;
}

export default function CanvasBackground({ isDarkMode }: CanvasBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x070708 : 0xfafafa, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // 2. Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.1 : 0.4);
    scene.add(ambientLight);

    // Dynamic colored lights for mouse hover glow
    const blueLightColor = isDarkMode ? 0x00f2fe : 0x00a3ad;
    const magentaLightColor = isDarkMode ? 0xff007f : 0xd0006f;

    const blueLight = new THREE.PointLight(blueLightColor, isDarkMode ? 5 : 3, 40);
    blueLight.position.set(-10, 5, 10);
    scene.add(blueLight);

    const magentaLight = new THREE.PointLight(magentaLightColor, isDarkMode ? 5 : 3, 40);
    magentaLight.position.set(10, -5, 10);
    scene.add(magentaLight);

    // 3. Create Particle System (Star Dust)
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randomScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;     // X
      positions[i + 1] = (Math.random() - 0.5) * 60; // Y
      positions[i + 2] = (Math.random() - 0.5) * 50; // Z
      randomScales[i / 3] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom shader material for particles to render beautifully rounded glowing circles
    const particleMaterial = new THREE.PointsMaterial({
      color: isDarkMode ? 0xffffff : 0x0080a0,
      size: 0.15,
      transparent: true,
      opacity: isDarkMode ? 0.4 : 0.3,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const starParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starParticles);

    // 4. Floating Glass Geometries
    const geometries = [
      new THREE.IcosahedronGeometry(3, 1),
      new THREE.TorusGeometry(2, 0.6, 16, 100),
      new THREE.SphereGeometry(1.8, 32, 32),
      new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16),
    ];

    // High-end realistic Physical Materials simulating "Glassmorphism"
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: isDarkMode ? 0xffffff : 0x00a3ad,
      roughness: isDarkMode ? 0.05 : 0.15,
      metalness: isDarkMode ? 0.15 : 0.2,
      transmission: isDarkMode ? 0.95 : 0.8, // high trans to look like glass
      ior: 1.6, // Index of refraction
      thickness: 2.0, // Thickness of the glass
      transparent: true,
      opacity: isDarkMode ? 0.35 : 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      depthWrite: true,
    });

    const meshes: THREE.Mesh[] = [];
    
    // Position floating shapes separately
    const positionsList = [
      new THREE.Vector3(-12, 6, -5),
      new THREE.Vector3(12, -8, -2),
      new THREE.Vector3(4, 10, -8),
      new THREE.Vector3(-6, -10, -10),
    ];

    geometries.forEach((geom, idx) => {
      const mesh = new THREE.Mesh(geom, glassMaterial);
      mesh.position.copy(positionsList[idx] || new THREE.Vector3(0, 0, 0));
      scene.add(mesh);
      meshes.push(mesh);
    });

    // 5. Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 15;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 15;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation (Lerp) for mouse and scroll reactions
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Rotate starfield and float slowly
      starParticles.rotation.y = elapsedTime * 0.02;
      starParticles.rotation.x = elapsedTime * 0.005;

      // Animate the glass objects
      meshes.forEach((mesh, index) => {
        mesh.rotation.x = elapsedTime * 0.15 * (index + 1);
        mesh.rotation.y = elapsedTime * 0.1 * (index + 1);
        // Float up and down gently using sine wave
        mesh.position.y += Math.sin(elapsedTime + index * 10) * 0.005;
      });

      // Mouse responsive lighting position moves slightly
      blueLight.position.x = -10 + targetX * 0.5;
      blueLight.position.y = 5 + targetY * 0.5;

      magentaLight.position.x = 10 - targetX * 0.5;
      magentaLight.position.y = -5 - targetY * 0.5;

      // Scroll controlled camera movement (Parallax)
      // Moving down will slide the camera down and rotate slightly
      camera.position.y = -scrollY * 0.015;
      camera.rotation.y = targetX * 0.003;
      camera.rotation.x = -scrollY * 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Window Resize Handler
    const handleResize = () => {
      if (!rendererRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (rendererRef.current && containerRef.current) {
        // Safe check before child removal
        if (containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      // Dispose materials/geometries
      geometries.forEach(g => g.dispose());
      glassMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      id="3d-canvas-container"
      ref={containerRef}
      className={`fixed inset-0 -z-10 pointer-events-none transition-colors duration-700 ${isDarkMode ? 'bg-[#070708]' : 'bg-[#fafafa]'}`}
    />
  );
}
