"use client";

import React from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-10 mt-16",
        className
      )}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05),transparent_50%)]"></div>
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
      </div>
      
      {/* Floating animation for the lamp */}
      <div className="absolute top-0 z-50 flex flex-col items-center animate-float">
        {/* Ceiling mount - sharper version */}
        <div className="w-[3px] h-[35px] bg-slate-700"></div>
        <div className="w-[14px] h-[7px] bg-slate-600 rounded-none"></div>
        
        {/* Modern design accent */}
        <div className="absolute top-[25px] left-1/2 transform -translate-x-1/2 w-[60px] h-[2px] bg-slate-500"></div>
        
        {/* Lamp housing - wider with sharp edges */}
        <div className="w-[300px] h-[12px] bg-slate-800 rounded-none flex justify-center items-center">
          <div className="w-[280px] h-[4px] bg-slate-900 rounded-none"></div>
        </div>
        
        {/* Light source - wider with sharp edges and enhanced glow */}
        <div className="w-[300px] h-[8px] bg-white rounded-none shadow-lg relative">
          <div className="absolute inset-0 bg-white/30 blur-sm"></div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-[rgba(56,189,248,0.15)] blur-[80px]"></div>
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[rgba(56,189,248,0.05)] blur-[100px]"></div>
        </div>
      </div>
      
      {/* Light beam effect */}
      <div className="absolute top-40 inset-x-0 h-[500px] bg-gradient-to-b from-[rgba(56,189,248,0.05)] to-transparent z-0 pointer-events-none"></div>
      
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mt-10">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "35rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-80 overflow-visible w-[35rem] bg-gradient-conic from-white/30 via-transparent to-transparent text-white [--conic-position:from_65deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "35rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-80 w-[35rem] bg-gradient-conic from-transparent via-transparent to-white/30 text-white [--conic-position:from_295deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[32rem] -translate-y-1/2 rounded-full bg-white/20 opacity-40 blur-2xl"></div>
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "18rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-72 -translate-y-[6rem] rounded-full bg-white/20 blur-xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-white/30"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-6 mt-10">{children}</div>
    </div>
  );
}; 