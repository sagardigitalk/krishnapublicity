"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming they have a shadcn Button, if not I'll use a normal HTML button
import { ArrowRight } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="py-24 bg-slate-50 font-sans overflow-hidden">
      <div className="container max-w-7xl px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <p className="text-sm text-theme-navy/60 font-medium">
              Welcome to Krishna Publicity
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-navy tracking-tight leading-[1.2]">
              <span className="text-sky-500 font-bold">Creativity</span> That Elevates the Impact of Every Campaign
            </h2>
            <p className="text-theme-navy/60 text-base md:text-lg font-light leading-relaxed max-w-lg">
              Our design team combines advanced market research, smart placements, and modern aesthetics to refine billboards, transit ads, and every critical branding component. We innovate with one goal in mind—delivering campaigns that perform better, last longer, and create real value for your brand.
            </p>
            <div className="pt-4">
              <button className="px-8 py-3 rounded-full bg-sky-500 text-white font-medium hover:bg-sky-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300 flex items-center group">
                Discover More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Image/Illustration Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative"
          >
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-sky-100 rounded-[3rem] transform rotate-3 scale-105 -z-10" />
            
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/serviceimage/graphicmain1.jpg" // Using an existing relevant image
                alt="Creative Advertising Strategy"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-theme-navy/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
