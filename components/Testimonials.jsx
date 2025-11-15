'use client'

import React from 'react'

const testimonials = [
  {
    id: 1,
    quote:
      "The AI automation solutions provided by this team have transformed our business operations. We've seen a 40% increase in efficiency since implementation.",
    author: 'Sarah Johnson',
    position: 'CTO, TechInnovate',
  },
  {
    id: 2,
    quote:
      'Their predictive analytics platform has given us insights we never thought possible. We can now anticipate market trends with remarkable accuracy.',
    author: 'Michael Chen',
    position: 'Data Director, AnalyticsPlus',
  },
  {
    id: 3,
    quote:
      'The custom AI solution they built for our customer service department has reduced response times by 60% and improved customer satisfaction scores.',
    author: 'Emily Rodriguez',
    position: 'Customer Experience Manager, ServiceFirst',
  },
]

export default function Testimonials() {
  // Client statistics
  const stats = [
    { label: 'Clients', value: '200+', icon: '👥' },
    { label: 'Success Rate', value: '98%', icon: '📈' },
    { label: 'ROI Average', value: '320%', icon: '💰' },
    { label: 'Industries', value: '12+', icon: '🏭' },
  ]

  return (
    <section className="py-24 relative bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(56,189,248,0.05)] to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 border border-[rgba(56,189,248,0.1)] rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-20 w-60 h-60 border border-[rgba(56,189,248,0.05)] rounded-full opacity-10"></div>

      <div className="container mx-auto px-6">
        {/* Offset heading */}
        <div className="flex justify-end mb-16 md:pr-24">
          <h2 className="text-4xl font-bold text-white tracking-tight animate-on-scroll max-w-md">
            What Our <span className="text-gradient-primary">Clients Say</span>
          </h2>
        </div>

        {/* Stats infographic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="stats-value">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Asymmetrical grid layout */}
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7 md:row-span-2">
              <div className="glass-card p-8 h-full floating-card">
                <p className="text-gray-200 italic mb-6 text-lg leading-relaxed">
                  "{testimonials[0].quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(56,189,248,0.1)] flex items-center justify-center mr-4">
                    <span className="text-[rgba(56,189,248,0.8)] font-bold">
                      {testimonials[0].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[0].author}</p>
                    <p className="text-gray-400 text-sm">{testimonials[0].position}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 md:mt-12">
              <div className="glass-card p-8 floating-card" style={{ animationDelay: '0.2s' }}>
                <p className="text-gray-200 italic mb-6 text-lg leading-relaxed">
                  "{testimonials[1].quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(56,189,248,0.1)] flex items-center justify-center mr-4">
                    <span className="text-[rgba(56,189,248,0.8)] font-bold">
                      {testimonials[1].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[1].author}</p>
                    <p className="text-gray-400 text-sm">{testimonials[1].position}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 md:mt-[-2rem]">
              <div className="glass-card p-8 floating-card" style={{ animationDelay: '0.4s' }}>
                <p className="text-gray-200 italic mb-6 text-lg leading-relaxed">
                  "{testimonials[2].quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(56,189,248,0.1)] flex items-center justify-center mr-4">
                    <span className="text-[rgba(56,189,248,0.8)] font-bold">
                      {testimonials[2].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[2].author}</p>
                    <p className="text-gray-400 text-sm">{testimonials[2].position}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
