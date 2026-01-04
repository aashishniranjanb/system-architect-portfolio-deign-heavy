'use client';

interface ResearchProps {
  id?: string;
}

const publications = [
  {
    title: 'Energy-Efficient Neural Network Accelerator for Edge Devices',
    venue: 'IEEE International Symposium on Low Power Electronics and Design',
    year: '2024',
    type: 'Conference',
    abstract: 'Novel architecture achieving 10x energy efficiency improvement through mixed-precision quantization and hardware-aware neural architecture search.',
    citations: 28,
  },
  {
    title: 'Secure Boot Architecture for Resource-Constrained IoT Devices',
    venue: 'ACM Conference on Computer and Communications Security',
    year: '2023',
    type: 'Conference',
    abstract: 'Lightweight cryptographic chain-of-trust implementation with hardware root of trust for devices with limited computational resources.',
    citations: 45,
  },
  {
    title: 'High-Speed DDR PHY Design for Advanced Process Nodes',
    venue: 'IEEE Journal of Solid-State Circuits',
    year: '2023',
    type: 'Journal',
    abstract: 'Analysis and implementation of DDR5 PHY achieving 6400 MT/s with novel DFE equalization for 5nm process technology.',
    citations: 32,
  },
];

const patents = [
  {
    title: 'Method and Apparatus for Low-Latency Interrupt Handling in Multi-Core Systems',
    number: 'US 11,xxx,xxx',
    status: 'Granted',
    year: '2024',
  },
  {
    title: 'Energy-Aware Task Scheduling for Heterogeneous Computing Platforms',
    number: 'US 11,xxx,xxx',
    status: 'Granted',
    year: '2023',
  },
  {
    title: 'Secure Memory Isolation Technique for Mixed-Criticality Systems',
    number: 'US 2024/xxxxxx',
    status: 'Pending',
    year: '2024',
  },
  {
    title: 'Hardware-Accelerated Protocol Processing for Automotive Networks',
    number: 'US 2023/xxxxxx',
    status: 'Pending',
    year: '2023',
  },
];

export default function Research({ id }: ResearchProps) {
  return (
    <section id={id} className="min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#0a0d10] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="section-title">Research</span>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">
            Publications &<br />
            <span className="text-gradient">intellectual property.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mt-4">
            Contributing to the advancement of embedded systems, hardware security, 
            and low-power computing through peer-reviewed research and patented innovations.
          </p>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <h3 className="text-lg font-mono text-[#00D1FF] mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#00D1FF]" />
            Selected Publications
          </h3>
          <div className="space-y-6">
            {publications.map((pub) => (
              <div 
                key={pub.title}
                className="p-6 bg-[#1B2633] rounded border border-[#1B2633] hover:border-[#00D1FF] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="text-lg font-semibold leading-tight">{pub.title}</h4>
                  <span className="shrink-0 px-2 py-1 text-xs font-mono bg-[#0F1216] text-[#FFB000] rounded">
                    {pub.type}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{pub.abstract}</p>
                <div className="flex items-center gap-6 text-xs font-mono">
                  <span className="text-gray-500">{pub.venue}</span>
                  <span className="text-[#FFB000]">{pub.year}</span>
                  <span className="text-[#00D1FF]">{pub.citations} citations</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patents */}
        <div>
          <h3 className="text-lg font-mono text-[#FFB000] mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FFB000]" />
            Patents
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {patents.map((patent) => (
              <div 
                key={patent.title}
                className="p-4 border border-[#1B2633] rounded hover:border-[#FFB000] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className={`px-2 py-0.5 text-xs font-mono rounded ${
                      patent.status === 'Granted' 
                        ? 'bg-[#00D1FF]/20 text-[#00D1FF]' 
                        : 'bg-[#FFB000]/20 text-[#FFB000]'
                    }`}
                  >
                    {patent.status}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{patent.year}</span>
                </div>
                <h4 className="text-sm font-semibold mb-2">{patent.title}</h4>
                <span className="text-xs font-mono text-gray-500">{patent.number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats summary */}
        <div className="mt-16 pt-8 border-t border-[#1B2633] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {[
            { value: '12', label: 'Publications' },
            { value: '4', label: 'Patents' },
            { value: '150+', label: 'Citations' },
            { value: '3', label: 'Best Paper Awards' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-mono text-[#FFB000] mb-1">{stat.value}</div>
              <div className="text-xs font-mono text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
