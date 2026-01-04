'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0F1216]/95 backdrop-blur-md border-b border-[#1B2633]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <div 
                className="w-3 h-3 rounded-full bg-[#FFB000] group-hover:scale-110 transition-transform"
                style={{ boxShadow: '0 0 10px rgba(255, 176, 0, 0.5)' }}
              />
              <span className="font-mono text-xs sm:text-sm tracking-wider">
                SYSTEM<span className="text-[#FFB000]">.</span>ARCHITECT
              </span>
            </button>

            {/* Desktop Nav links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs lg:text-sm font-mono uppercase tracking-wider transition-colors ${
                    activeSection === item.id 
                      ? 'text-[#FFB000]' 
                      : 'text-gray-400 hover:text-[#00D1FF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-[#00D1FF] transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-[#00D1FF] transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-[#00D1FF] transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Status indicator - desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <span 
                className="w-2 h-2 rounded-full bg-[#00ff00]"
                style={{ boxShadow: '0 0 8px rgba(0, 255, 0, 0.5)' }}
              />
              <span className="text-xs font-mono text-gray-500">
                Available
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0F1216]/98 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-2xl font-mono uppercase tracking-widest transition-all duration-300 ${
                activeSection === item.id 
                  ? 'text-[#FFB000]' 
                  : 'text-gray-400 hover:text-[#00D1FF]'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              <span className="text-xs text-[#00D1FF] mr-3">0{index + 1}</span>
              {item.label}
            </button>
          ))}
          
          {/* Mobile status */}
          <div className="flex items-center gap-2 mt-8">
            <span 
              className="w-2 h-2 rounded-full bg-[#00ff00]"
              style={{ boxShadow: '0 0 8px rgba(0, 255, 0, 0.5)' }}
            />
            <span className="text-xs font-mono text-gray-500">
              Available for work
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
