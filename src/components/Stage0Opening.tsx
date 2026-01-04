'use client';

import { useEffect, useRef, useState } from 'react';

const bootMessages = [
  '[    0.000000] Linux version 6.5.0-arch1 (gcc 13.2.1)',
  '[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-linux',
  '[    0.000000] KERNEL supported cpus:',
  '[    0.000000]   Intel GenuineIntel',
  '[    0.000000]   AMD AuthenticAMD',
  '[    0.004000] BIOS-provided physical RAM map:',
  '[    0.004000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff]',
  '[    0.008000] NX (Execute Disable) protection: active',
  '[    0.012000] DMI: System Architect Workstation v1.0',
  '[    0.016000] Hypervisor detected: KVM',
  '[    0.020000] CPU: Intel Core i9-13900K @ 5.80GHz',
  '[    0.024000] x86/cpu: SGX disabled by BIOS',
  '[    0.028000] Memory: 65536MB DDR5-6400',
  '[    0.032000] ACPI: RSDP 0x00000000000F0000',
  '[    0.036000] Initializing cgroup subsys cpuset',
  '[    0.040000] Initializing cgroup subsys cpu',
  '[    0.044000] Initializing cgroup subsys memory',
  '[    0.048000] Mounting root filesystem...',
  '[    0.052000] Loading kernel modules...',
  '[    0.056000] Starting system services...',
  '[    0.060000] System ready.',
  '',
  'architect@silicon:~$ _',
];

export default function Stage0Opening() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < bootMessages.length) {
        setVisibleLines(prev => [...prev, bootMessages[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setBootComplete(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <section className="min-h-screen relative flex flex-col lg:flex-row">
      {/* Left side - Title */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10 min-h-[50vh] lg:min-h-screen">
        <div className="max-w-lg">
          <div className="mb-8">
            <div 
              className="w-2 h-2 rounded-full bg-[#FFB000] mb-4"
              style={{ boxShadow: '0 0 20px rgba(255, 176, 0, 0.5)' }}
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light font-sans leading-tight mb-4">
              Full Stack
              <br />
              <span className="font-semibold">Embedded Engineer</span>
            </h1>
            <p className="text-lg text-[#00D1FF] font-mono tracking-wide">
              System Architecture Mindset
            </p>
          </div>
          
          <div className="space-y-4 text-sm font-mono text-gray-400">
            <p>Designing systems by understanding every layer.</p>
            <p className="text-xs">From user interface to transistor-level physics.</p>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#FFB000] to-transparent" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      {/* Right side - CRT Terminal */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 relative min-h-[50vh] lg:min-h-screen">
        {/* CRT Monitor Frame */}
        <div 
          className="relative w-full max-w-2xl aspect-[4/3] rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
            boxShadow: `
              inset 0 0 60px rgba(0, 0, 0, 0.8),
              0 0 40px rgba(0, 209, 255, 0.1),
              0 20px 60px rgba(0, 0, 0, 0.5)
            `,
          }}
        >
          {/* Monitor bezel */}
          <div className="absolute inset-4 rounded overflow-hidden">
            {/* Screen glass effect */}
            <div 
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                borderRadius: '8px',
              }}
            />
            
            {/* Scanlines */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
              }}
            />

            {/* Phosphor glow */}
            <div 
              className="absolute inset-0 z-5"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0, 209, 255, 0.05) 0%, transparent 70%)',
              }}
            />
            
            {/* Terminal content */}
            <div 
              ref={containerRef}
              className="absolute inset-0 p-6 overflow-y-auto bg-[#0a0d10] crt-effect"
              style={{
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div className="text-[#00D1FF] text-xs leading-relaxed">
                {visibleLines.map((line, index) => (
                  <div 
                    key={index} 
                    className="whitespace-pre-wrap"
                    style={{
                      textShadow: '0 0 8px rgba(0, 209, 255, 0.5)',
                    }}
                  >
                    {line}
                    {index === visibleLines.length - 1 && line && line.endsWith('_') && (
                      <span 
                        className={`inline-block w-2 h-4 bg-[#00D1FF] ml-0 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          verticalAlign: 'text-bottom',
                          boxShadow: '0 0 10px rgba(0, 209, 255, 0.8)'
                        }}
                      />
                    )}
                  </div>
                ))}
                {bootComplete && (
                  <span 
                    className={`inline-block w-2 h-4 bg-[#00D1FF] ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      boxShadow: '0 0 10px rgba(0, 209, 255, 0.8)'
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Monitor LED */}
          <div 
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-[#00ff00]"
            style={{
              boxShadow: '0 0 8px rgba(0, 255, 0, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 209, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 209, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  );
}
