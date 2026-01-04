'use client';

interface SkillsProps {
  id?: string;
}

const skillCategories = [
  {
    name: 'Languages',
    color: '#00D1FF',
    skills: [
      { name: 'C', level: 95 },
      { name: 'C++', level: 85 },
      { name: 'Verilog', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'Rust', level: 70 },
      { name: 'Assembly', level: 75 },
    ],
  },
  {
    name: 'Hardware',
    color: '#FFB000',
    skills: [
      { name: 'RTL Design', level: 85 },
      { name: 'FPGA', level: 80 },
      { name: 'PCB Design', level: 75 },
      { name: 'Signal Integrity', level: 70 },
      { name: 'Power Electronics', level: 65 },
      { name: 'GDSII Layout', level: 60 },
    ],
  },
  {
    name: 'Embedded',
    color: '#00D1FF',
    skills: [
      { name: 'ARM Cortex', level: 90 },
      { name: 'RISC-V', level: 75 },
      { name: 'RTOS', level: 85 },
      { name: 'Linux Kernel', level: 80 },
      { name: 'Device Drivers', level: 85 },
      { name: 'Bootloaders', level: 80 },
    ],
  },
  {
    name: 'Protocols',
    color: '#FFB000',
    skills: [
      { name: 'SPI/I2C/UART', level: 95 },
      { name: 'PCIe', level: 70 },
      { name: 'USB', level: 80 },
      { name: 'Ethernet', level: 75 },
      { name: 'CAN', level: 85 },
      { name: 'DDR', level: 65 },
    ],
  },
];

const tools = [
  'Vivado', 'Quartus', 'Synopsys DC', 'Cadence Virtuoso', 
  'KiCad', 'Altium', 'GDB', 'JTAG', 'OpenOCD', 'Segger',
  'Yosys', 'Verilator', 'QEMU', 'Buildroot', 'Yocto',
  'Git', 'CMake', 'Bazel', 'Docker', 'Jenkins',
];

export default function Skills({ id }: SkillsProps) {
  return (
    <section id={id} className="min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="section-title">Skills</span>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">
            Technical<br />
            <span className="text-gradient">proficiencies.</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category) => (
            <div key={category.name} className="p-6 bg-[#1B2633] rounded">
              <h3 
                className="text-lg font-mono mb-6 pb-2 border-b"
                style={{ borderColor: category.color, color: category.color }}
              >
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-mono">{skill.name}</span>
                      <span className="text-xs font-mono text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-[#0F1216] rounded overflow-hidden">
                      <div 
                        className="h-full rounded transition-all duration-1000"
                        style={{ 
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${category.color}88, ${category.color})`,
                          boxShadow: `0 0 10px ${category.color}44`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools section */}
        <div className="mt-16">
          <h3 className="text-lg font-mono text-[#FFB000] mb-6">Tools & Platforms</h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span 
                key={tool}
                className="px-4 py-2 bg-[#1B2633] border border-[#1B2633] hover:border-[#00D1FF] rounded text-sm font-mono transition-colors duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { name: 'ARM Accredited Engineer', org: 'ARM Holdings', year: '2022' },
            { name: 'Certified Xilinx Developer', org: 'AMD/Xilinx', year: '2021' },
            { name: 'Linux Foundation LFCS', org: 'Linux Foundation', year: '2020' },
          ].map((cert) => (
            <div 
              key={cert.name}
              className="p-4 border border-[#1B2633] rounded hover:border-[#FFB000] transition-colors"
            >
              <div className="text-sm font-semibold mb-1">{cert.name}</div>
              <div className="text-xs font-mono text-gray-500">{cert.org}</div>
              <div className="text-xs font-mono text-[#00D1FF] mt-2">{cert.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none opacity-5"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 209, 255, 0.1) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
