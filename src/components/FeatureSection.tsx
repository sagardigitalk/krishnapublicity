"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

const defaultFeature = {
  badge: "Welcome to Krishna Publicity",
  title: "Creativity That Elevates the Impact of Every Campaign",
  description: "Our design team combines advanced market research, smart placements, and modern aesthetics to refine billboards, transit ads, and every critical branding component. We innovate with one goal in mind—delivering campaigns that perform better, last longer, and create real value for your brand.",
  buttonText: "Discover More",
  buttonLink: "#services",
  image: "/serviceimage/graphicmain1.jpg"
};

const resolveImageUrl = (imgStr?: string) => {
  return apiService.getImageUrl(imgStr, '/serviceimage/graphicmain1.jpg');
};

export default function FeatureSection() {
  const [feature, setFeature] = useState(defaultFeature);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const data = await apiService.get(endPointApi.home);
        if (data && data.feature) {
          setFeature({
            badge: data.feature.badge || defaultFeature.badge,
            title: data.feature.title || defaultFeature.title,
            description: data.feature.description || defaultFeature.description,
            buttonText: data.feature.buttonText || defaultFeature.buttonText,
            buttonLink: data.feature.buttonLink || defaultFeature.buttonLink,
            image: data.feature.image || defaultFeature.image,
          });
        }
      } catch (error) {
        console.error("Error fetching feature section:", error);
      }
    };
    fetchFeature();
  }, []);

  const featureImg = resolveImageUrl(feature.image);

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
            <p className="text-sm text-theme-navy/60 font-medium tracking-wide">
              {feature.badge}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-navy tracking-tight leading-[1.2]">
              {feature.title.includes('Creativity') ? (
                <>
                  <span className="text-sky-500 font-bold">Creativity</span> {feature.title.replace('Creativity', '').trim()}
                </>
              ) : (
                feature.title
              )}
            </h2>

            <p className="text-theme-navy/60 text-base md:text-lg font-light leading-relaxed max-w-lg">
              {feature.description}
            </p>

            <div className="pt-4">
              <a 
                href={feature.buttonLink || '#services'} 
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-sky-500 text-white font-medium hover:bg-sky-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300 group"
              >
                {feature.buttonText || 'Discover More'}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
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
            
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100">
              <img
                src={featureImg}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/serviceimage/graphicmain1.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-theme-navy/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
