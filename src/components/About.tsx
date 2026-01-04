'use client';

interface AboutProps {
  id?: string;
}

export default function About({ id }: AboutProps) {
  return (
    <section id={id} className="min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="section-title">About</span>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">
            Engineering at the<br />
            <span className="text-gradient">intersection of layers.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left column - Bio */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-300">
              I&apos;m a full-stack embedded systems engineer with deep expertise spanning 
              from silicon design to user-facing applications. My approach combines 
              rigorous hardware understanding with modern software practices.
            </p>
            <p className="text-base leading-relaxed text-gray-400">
              With experience in VLSI design, firmware development, and system architecture, 
              I bridge the gap between physical implementation and abstract software layers. 
              This cross-domain perspective enables me to optimize systems holistically, 
              understanding the trade-offs at every level.
            </p>
            <p className="text-base leading-relaxed text-gray-400">
              My work focuses on building robust, efficient systems where performance matters — 
              from bare-metal microcontroller code to complex distributed architectures.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-[#1B2633]">
              {[
                { value: '8+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Shipped' },
                { value: '4', label: 'Patents Filed' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-mono text-[#FFB000] mb-1">{stat.value}</div>
                  <div className="text-xs font-mono text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Expertise areas */}
          <div className="space-y-6">
            {[
              {
                title: 'System Architecture',
                description: 'Designing end-to-end systems with clear interfaces and optimal resource utilization.',
                icon: '◇'
              },
              {
                title: 'Embedded Development',
                description: 'Building reliable firmware for resource-constrained environments with real-time requirements.',
                icon: '◈'
              },
              {
                title: 'Hardware Design',
                description: 'From schematic capture to VLSI layout, understanding the silicon that runs the code.',
                icon: '◆'
              },
              {
                title: 'Performance Optimization',
                description: 'Profiling and optimizing across the stack — from cache behavior to algorithm complexity.',
                icon: '◊'
              },
            ].map((area) => (
              <div 
                key={area.title}
                className="p-6 bg-[#1B2633] rounded border border-[#1B2633] hover:border-[#FFB000] transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl text-[#00D1FF]">{area.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
                    <p className="text-sm text-gray-400">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-5"
        style={{
          background: 'radial-gradient(circle at 80% 30%, rgba(255, 176, 0, 0.3) 0%, transparent 50%)',
        }}
      />
    </section>
  );
}
