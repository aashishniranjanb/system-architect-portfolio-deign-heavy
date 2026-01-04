'use client';

interface ProjectsProps {
  id?: string;
}

const projects = [
  {
    title: 'RISC-V SoC Design',
    category: 'Hardware',
    description: 'Custom 5-stage pipelined RISC-V processor with integrated peripherals, designed for low-power IoT applications.',
    technologies: ['Verilog', 'RISC-V', 'FPGA', 'Yosys'],
    metrics: { 'MHz': '200', 'Power': '50mW', 'Area': '0.5mm²' },
    highlight: true,
  },
  {
    title: 'Real-Time Motor Controller',
    category: 'Embedded',
    description: 'Field-oriented control implementation for BLDC motors with sub-microsecond loop timing on Cortex-M4.',
    technologies: ['C', 'ARM', 'DSP', 'CMSIS'],
    metrics: { 'Loop': '10kHz', 'Latency': '100ns', 'Efficiency': '98%' },
    highlight: true,
  },
  {
    title: 'Distributed Sensor Network',
    category: 'Systems',
    description: 'Mesh network of 500+ battery-powered sensors with edge ML inference and 5-year battery life.',
    technologies: ['Zephyr', 'BLE', 'TensorFlow Lite', 'C++'],
    metrics: { 'Nodes': '500+', 'Battery': '5yr', 'Range': '100m' },
    highlight: false,
  },
  {
    title: 'High-Speed ADC Interface',
    category: 'Hardware',
    description: 'DDR interface for 16-bit ADC sampling at 100MSPS with DMA and real-time DSP processing.',
    technologies: ['VHDL', 'DDR', 'DSP', 'Xilinx'],
    metrics: { 'Sample': '100MSPS', 'Bits': '16', 'SNR': '90dB' },
    highlight: false,
  },
  {
    title: 'Secure Bootloader',
    category: 'Security',
    description: 'Cryptographically verified boot chain with secure key storage and anti-rollback protection.',
    technologies: ['C', 'ARM TrustZone', 'ECDSA', 'AES'],
    metrics: { 'Boot': '50ms', 'Keys': 'ECC-256', 'Chain': '3-stage' },
    highlight: true,
  },
  {
    title: 'Power Management IC Driver',
    category: 'Embedded',
    description: 'Linux kernel driver for multi-rail PMIC with dynamic voltage scaling and thermal management.',
    technologies: ['C', 'Linux', 'I2C', 'Device Tree'],
    metrics: { 'Rails': '12', 'Efficiency': '95%', 'DVFS': 'Yes' },
    highlight: false,
  },
];

export default function Projects({ id }: ProjectsProps) {
  return (
    <section id={id} className="min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#0a0d10] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="section-title">Projects</span>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">
            Selected work<br />
            <span className="text-gradient">across the stack.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mt-4">
            A curated selection of projects demonstrating expertise from transistor-level 
            design to system-level architecture.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={`project-card p-6 ${project.highlight ? 'border-[#FFB000]/30' : ''}`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#00D1FF] uppercase tracking-wider">
                  {project.category}
                </span>
                {project.highlight && (
                  <span className="w-2 h-2 rounded-full bg-[#FFB000]" style={{ boxShadow: '0 0 10px rgba(255, 176, 0, 0.5)' }} />
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-[#1B2633]">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm font-mono text-[#FFB000]">{value}</div>
                    <div className="text-xs text-gray-500">{key}</div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="skill-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View more link */}
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm font-mono text-[#FFB000] hover:text-[#00D1FF] transition-colors"
          >
            <span>View all projects</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 209, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 209, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </section>
  );
}
