'use client';

import { useState } from 'react';

interface ContactProps {
  id?: string;
}

export default function Contact({ id }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id={id} className="min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="section-title">Contact</span>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">
            Let&apos;s build<br />
            <span className="text-gradient">something together.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Interested in collaboration, consulting, or just want to discuss 
            embedded systems and hardware design? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="consulting">Consulting Inquiry</option>
                  <option value="collaboration">Research Collaboration</option>
                  <option value="job">Job Opportunity</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field min-h-[150px] resize-none"
                  placeholder="Tell me about your project or inquiry..."
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            {/* Direct contact */}
            <div className="p-6 bg-[#1B2633] rounded">
              <h3 className="text-lg font-semibold mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:contact@systemarchitect.dev"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#00D1FF] transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-[#0F1216] rounded text-[#00D1FF]">
                    @
                  </span>
                  contact@systemarchitect.dev
                </a>
                <a 
                  href="https://linkedin.com/in/systemarchitect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#00D1FF] transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-[#0F1216] rounded text-[#00D1FF]">
                    in
                  </span>
                  linkedin.com/in/systemarchitect
                </a>
                <a 
                  href="https://github.com/systemarchitect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#00D1FF] transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-[#0F1216] rounded text-[#00D1FF]">
                    gh
                  </span>
                  github.com/systemarchitect
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="p-6 bg-[#1B2633] rounded">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <p className="text-sm text-gray-400 mb-2">Based in San Francisco Bay Area</p>
              <p className="text-xs font-mono text-gray-500">
                Available for remote work and on-site consulting
              </p>
            </div>

            {/* Availability */}
            <div className="p-6 border border-[#FFB000]/30 rounded">
              <div className="flex items-center gap-3 mb-3">
                <span 
                  className="w-3 h-3 rounded-full bg-[#00ff00]"
                  style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}
                />
                <span className="text-sm font-semibold">Currently Available</span>
              </div>
              <p className="text-xs text-gray-400">
                Open to consulting engagements, advisory roles, and select full-time opportunities 
                in embedded systems and hardware architecture.
              </p>
            </div>

            {/* Response time */}
            <div className="text-center py-4 border-t border-[#1B2633]">
              <p className="text-xs font-mono text-gray-500">
                Typical response time: <span className="text-[#FFB000]">24-48 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-[#1B2633] text-center">
        <div className="text-xs font-mono text-gray-500 space-y-2">
          <p>Designed & Built with precision</p>
          <p>&copy; 2024 System Architect. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
