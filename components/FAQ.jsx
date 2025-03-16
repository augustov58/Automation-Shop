"use client"

import React, { useState } from 'react'

const faqItems = [
  {
    id: 'item-1',
    question: 'What types of businesses can benefit from AI automation?',
    answer: 'Businesses of all sizes and across various industries can benefit from AI automation. This includes manufacturing, healthcare, finance, retail, logistics, customer service, and more. Any process that involves repetitive tasks, data analysis, or decision-making based on patterns can be enhanced with AI automation.'
  },
  {
    id: 'item-2',
    question: 'How long does it take to implement an AI automation solution?',
    answer: 'Implementation timelines vary depending on the complexity of the solution and the specific needs of your business. Simple automation projects can be implemented in a few weeks, while more complex enterprise-wide solutions may take several months. We work closely with you to establish realistic timelines and ensure minimal disruption to your operations.'
  },
  {
    id: 'item-3',
    question: 'Do I need technical expertise to use your AI solutions?',
    answer: 'No, our solutions are designed with user-friendliness in mind. While having technical staff can be beneficial, we provide comprehensive training and ongoing support to ensure your team can effectively use our AI tools regardless of their technical background. Our interfaces are intuitive and designed for business users.'
  },
  {
    id: 'item-4',
    question: 'How do you ensure the security of our data?',
    answer: 'Data security is our top priority. We implement industry-standard encryption, secure access controls, and regular security audits. All our solutions comply with relevant data protection regulations. We can also work within your existing security infrastructure and policies to ensure that your data remains protected at all times.'
  },
  {
    id: 'item-5',
    question: 'Can your AI solutions integrate with our existing systems?',
    answer: 'Yes, our AI solutions are designed to integrate seamlessly with most common business systems and software. We have experience integrating with ERP systems, CRMs, databases, and custom applications. During the initial assessment, we\'ll evaluate your current technology stack and develop an integration plan tailored to your needs.'
  }
]

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-16 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="border-b border-slate-700 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left text-lg font-medium text-white hover:text-white/80 py-2"
                  onClick={() => toggleItem(item.id)}
                >
                  {item.question}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${openItem === item.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItem === item.id && (
                  <div className="mt-2 text-slate-300">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 