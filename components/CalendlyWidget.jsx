"use client"

import { useEffect, useState } from 'react';

export default function CalendlyWidget({ url = "https://calendly.com/your-calendly-url" }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Calendly widget when component mounts
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: url,
        parentElement: document.getElementById('calendly-inline-widget'),
      });
      
      // Add event listener for when Calendly is ready
      const handleCalendlyEvent = (e) => {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
          setIsLoading(false);
        }
      };
      
      window.addEventListener('message', handleCalendlyEvent);
      
      return () => {
        window.removeEventListener('message', handleCalendlyEvent);
      };
    }
  }, [url]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgba(56,189,248,0.5)]"></div>
        </div>
      )}
      <div 
        id="calendly-inline-widget"
        className="calendly-inline-widget w-full"
        style={{ minHeight: '650px' }}
        data-auto-load="false"
      ></div>
    </div>
  );
} 