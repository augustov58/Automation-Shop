"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export function LampDemo() {
  const containerRef = useRef(null);
  
  // Add magnetic button effect
  useEffect(() => {
    const container = containerRef.current;
    const buttons = container?.querySelectorAll('.magnetic-btn');
    
    if (!buttons) return;
    
    const handleMouseMove = (e, button) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate distance from center (0-1)
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
      const strength = 0.5; // Adjust this for stronger/weaker effect
      
      // Only apply effect if mouse is close enough
      if (distance < maxDistance) {
        const moveX = (x / rect.width) * 20 * strength;
        const moveY = (y / rect.height) * 20 * strength;
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };
    
    const handleMouseLeave = (button) => {
      button.style.transform = 'translate(0, 0)';
    };
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => handleMouseMove(e, button));
      button.addEventListener('mouseleave', () => handleMouseLeave(button));
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mousemove', (e) => handleMouseMove(e, button));
        button.removeEventListener('mouseleave', () => handleMouseLeave(button));
      });
    };
  }, []);
  
  return (
    <LampContainer>
      {/* Add floating particles behind the text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
      
      {/* Add a subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-24 text-gradient-primary py-4 text-center text-6xl font-bold tracking-tight text-transparent md:text-7xl"
      >
        <span className="block leading-tight">Intelligent AI</span>
        <span className="block mt-2 leading-tight">Transforming Business</span>
      </motion.h1>
      
      {/* Add a decorative line */}
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[rgba(56,189,248,0.5)] to-transparent my-8"></div>
      
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-10 text-center text-gray-300 max-w-2xl mx-auto mb-16 text-xl leading-relaxed font-light"
      >
        Elevate your operations with cutting-edge AI solutions that drive innovation, 
        reduce costs, and accelerate growth in today's digital landscape.
      </motion.p>
      
      {/* Add a visual indicator for scrolling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 1.5,
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 12L12 19L5 12" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col sm:flex-row justify-center gap-6 mt-8 mb-16"
      >
        <a 
          href="#contact" 
          className="btn-primary btn-pulse magnetic-btn"
        >
          <span className="relative z-10">Get Started</span>
        </a>
        <a 
          href="#services" 
          className="btn-secondary magnetic-btn"
        >
          Explore Solutions
        </a>
      </motion.div>
      
      {/* Enhanced lamp with glow effect */}
      <div className="w-[200px] h-[8px] bg-slate-800 rounded-t-full flex justify-center items-center">
        <div className="w-[180px] h-[3px] bg-slate-900 rounded-full"></div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(56,189,248,0.3)] to-transparent"></div>
    </LampContainer>
  );
} 