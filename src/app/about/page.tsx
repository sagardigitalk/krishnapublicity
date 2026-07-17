"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, Award, ChevronLeft, ChevronRight, Zap, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Default static fallbacks
const defaultStats = [
  { icon: Users, value: "10+", label: "Years of Excellence" },
  { icon: CheckCircle, value: "5000+", label: "Clients Served" },
  { icon: Award, value: "3600+", label: "Successful Campaigns" },
  { icon: Zap, value: "98%", label: "Client Satisfaction" },
];

const defaultTeamMembers = [
  {
    name: "Mr. Sanjay Ahir & Vivek Ahir",
    role: "Founding Partners",
    bio: "Visionaries with over 15 years of industry experience, passionate about driving innovation and redefining advertising standards.",
    image: "/main1.jpg",
  },
  {
    name: "Mr. Umesh Zinzala",
    role: "Managing Director",
    bio: "Bringing a wealth of creative expertise, Umesh has led numerous award-winning campaigns across Gujarat.",
    image: "/main2.jpg",
  },
  {
    name: "Harshad Ahir",
    role: "Chief Marketing Officer",
    bio: "Specializing in cutting-edge digital marketing strategies with a proven track record of driving monumental growth.",
    image: "/main3.jpg",
  }
];

export default function About() {
  const [currentMember, setCurrentMember] = useState(0);
  const [aboutData, setAboutData] = useState({
    title: 'Where Creativity Meets Measurable Impact.',
    description: 'Krishna Publicity isn’t just an advertising agency. We are architects of brand experiences, meticulously designing campaigns that resonate and convert.'
  });
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);
  const [stats, setStats] = useState(defaultStats); // Keeping this static or fetch from home api if needed

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/about');
        const data = await res.json();
        if (data) {
          if (data.title) setAboutData(prev => ({ ...prev, title: data.title }));
          if (data.description) setAboutData(prev => ({ ...prev, description: data.description }));
          if (data.team && data.team.length > 0) setTeamMembers(data.team);
          if (data.stats && data.stats.length > 0) {
             // Map icons by string if necessary, but here we can just use the backend data
             // To properly render Lucide icons dynamically from strings, we might need a small mapping.
             // For simplicity, we just keep the data structure compatible.
             const parsedStats = data.stats.map((s: any) => ({
               icon: s.icon === 'check' ? CheckCircle : 
                     s.icon === 'award' ? Award : 
                     s.icon === 'zap' ? Zap : Users, 
               value: s.value,
               label: s.label
             }));
             setStats(parsedStats);
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };
    fetchAboutData();
  }, []);

  const nextMember = () => setCurrentMember((prev) => (prev + 1) % teamMembers.length);
  const prevMember = () => setCurrentMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  return (
    <section id="about" className="relative py-24 bg-theme-cream overflow-hidden w-full">
      <div className="container max-w-7xl px-6 mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-theme-navy/10 text-theme-navy mb-6"
          >
            <Target className="w-3 h-3" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">The Agency</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-theme-navy tracking-tighter leading-tight"
          >
            {aboutData.title.split('Meets').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}{i === 0 && arr.length > 1 && 'Meets '}
                {i === 0 && arr.length > 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: About Text & Stats */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl text-theme-navy/80 font-light leading-relaxed">
                {aboutData.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white border border-theme-navy/10 p-6 md:p-8 rounded-[2rem] group hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-theme-navy/20 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-theme-navy/50 group-hover:text-theme-navy transition-colors" />
                  </div>
                  <h3 className="text-3xl font-bold text-theme-navy mb-2 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold text-theme-navy/50 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Leadership Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-[3rem] overflow-hidden group shadow-lg"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMember}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                {teamMembers.length > 0 && (
                  <>
                    <Image 
                      src={teamMembers[currentMember].image || '/placeholder.jpg'} 
                      alt={teamMembers[currentMember].name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2642]/90 via-[#1B2642]/40 to-transparent" />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <AnimatePresence mode="wait">
                {teamMembers.length > 0 && (
                  <motion.div
                    key={currentMember}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                      {teamMembers[currentMember].role}
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {teamMembers[currentMember].name}
                    </h3>
                    <p className="text-base text-white/80 font-light max-w-md leading-relaxed">
                      &quot;{teamMembers[currentMember].bio}&quot;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center space-x-4 mt-8">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevMember} 
                  className="w-12 h-12 rounded-full border-white/20 bg-white/10 hover:bg-white text-white hover:text-theme-navy backdrop-blur-md transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextMember} 
                  className="w-12 h-12 rounded-full border-white/20 bg-white/10 hover:bg-white text-white hover:text-theme-navy backdrop-blur-md transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <div className="flex-1 flex justify-end space-x-2">
                  {teamMembers.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentMember ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

