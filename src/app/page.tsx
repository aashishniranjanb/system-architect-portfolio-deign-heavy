'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Stage0Opening from '@/components/Stage0Opening';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Research from '@/components/Research';
import Contact from '@/components/Contact';

// Dynamically import Three.js components to avoid SSR issues
const Stage1Environment = dynamic(() => import('@/components/Stage1Environment'), { 
  ssr: false,
  loading: () => <div className="h-[200vh] bg-[#0F1216]" />
});
const Stage2Binary = dynamic(() => import('@/components/Stage2Binary'), { 
  ssr: false,
  loading: () => <div className="h-[200vh] bg-[#0F1216]" />
});
const Stage3Silicon = dynamic(() => import('@/components/Stage3Silicon'), { 
  ssr: false,
  loading: () => <div className="h-[200vh] bg-[#0F1216]" />
});
const Stage4Architect = dynamic(() => import('@/components/Stage4Architect'), { 
  ssr: false,
  loading: () => <div className="h-[150vh] bg-[#0F1216]" />
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage1Progress, setStage1Progress] = useState(0);
  const [stage2Progress, setStage2Progress] = useState(0);
  const [stage3Progress, setStage3Progress] = useState(0);
  const [stage4Progress, setStage4Progress] = useState(0);

  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateProgress = (element: HTMLElement | null): number => {
      if (!element) return 0;
      
      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the element has been scrolled through
      const scrolledPast = viewportHeight - rect.top;
      const totalScrollDistance = elementHeight;
      
      // Clamp between 0 and 1
      return Math.max(0, Math.min(1, scrolledPast / totalScrollDistance));
    };

    const handleScroll = () => {
      setStage1Progress(calculateProgress(stage1Ref.current));
      setStage2Progress(calculateProgress(stage2Ref.current));
      setStage3Progress(calculateProgress(stage3Ref.current));
      setStage4Progress(calculateProgress(stage4Ref.current));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Navigation />
      
      {/* Stage 0: Opening */}
      <Stage0Opening />
      
      {/* Stage 1: Environment/OS Layer */}
      <div ref={stage1Ref}>
        <Stage1Environment scrollProgress={stage1Progress} />
      </div>
      
      {/* Stage 2: Binary/Instruction Layer */}
      <div ref={stage2Ref}>
        <Stage2Binary scrollProgress={stage2Progress} />
      </div>
      
      {/* Stage 3: Silicon/VLSI Layer */}
      <div ref={stage3Ref}>
        <Stage3Silicon scrollProgress={stage3Progress} />
      </div>
      
      {/* Stage 4: The Architect */}
      <div ref={stage4Ref}>
        <Stage4Architect scrollProgress={stage4Progress} />
      </div>
      
      {/* Portfolio Sections */}
      <About id="about" />
      <Projects id="projects" />
      <Skills id="skills" />
      <Research id="research" />
      <Contact id="contact" />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
    </div>
  );
}

function ScrollProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress((scrolled / scrollHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative h-32 w-[2px] bg-[#1B2633] rounded-full overflow-hidden">
        <div 
          className="absolute bottom-0 w-full bg-gradient-to-t from-[#FFB000] to-[#00D1FF] rounded-full transition-all duration-150"
          style={{ height: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-center">
        <span className="text-[10px] font-mono text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
