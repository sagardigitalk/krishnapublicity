"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const heroImages = [
  "/banner2.jpg",
  "/main1.jpg",
  "/main2.jpg",
  "/main3.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000); // slightly slower for elegant feel
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden flex items-end pb-20 pt-28 font-sans"
    >
      {/* Full-screen Background Carousel */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImage]}
              alt={`Campaign Background ${currentImage + 1}`}
              fill
              className="object-cover"
              priority={currentImage === 0}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Removed heavy dark overlays as requested */}
      </div>

      <div className="relative z-10 mx-auto px-6 lg:px-16 flex flex-col lg:flex-row justify-between items-end gap-12 w-full">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start text-left w-full lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-6 flex items-center gap-4 text-white/90"
          >
            <span className="w-10 h-[1px] bg-white/60"></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase">Est. Since 2012</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="font-serif text-[3.5rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] leading-[1] text-white font-normal"
          >
            Krishna<br />
            Publicity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-8 text-base md:text-lg text-white/80 font-medium max-w-lg leading-relaxed"
          >
            Elevate your market presence with premium outdoor advertising and immersive digital campaigns crafted for impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <button
              className="group flex items-center justify-center w-full sm:w-auto h-14 px-8 rounded-full bg-white/90 backdrop-blur-sm text-black font-semibold text-sm hover:bg-white transition-all duration-300"
            >
              Start Campaign
              <ArrowRight className="ml-3 w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <Button
              size="lg"
              variant="outline"
              className="group w-full sm:w-auto h-14 px-8 rounded-full border-white/30 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 font-semibold text-sm transition-all duration-300"
            >
              Watch Showreel
              <ArrowRight className="ml-3 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="lg:max-w-xs text-right hidden md:flex flex-col items-end pb-4"
        >
          <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-4">
            Uncompromising quality and impact
          </h3>
          <p className="text-white/70 text-sm italic mb-6 leading-relaxed font-serif">
            &quot;Elevate every brand interaction with our signature heritage-fit advertising solutions.&quot;
          </p>
          <div className="flex items-center gap-4 text-white/90">
            <span className="w-12 h-[1px] bg-white/60"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Excellence</span>
          </div>
        </motion.div>

      </div>
      
      {/* Bottom Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-20">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentImage 
                ? "w-8 bg-white" 
                : "w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}