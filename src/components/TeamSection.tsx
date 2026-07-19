"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

const getMemberImage = (imagePath?: string, index: number = 0) => {
  const defaultImages = ['/main1.jpg', '/main2.jpg', '/main3.jpg'];
  return apiService.getImageUrl(imagePath, defaultImages[index % defaultImages.length]);
};

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamHeader, setTeamHeader] = useState({
    subtitle: 'Welcome to Krishna Publicity',
    title: "Gujarat's Most Reliable Advertising Family for Outdoor Campaigns",
    description: 'Our experienced Team members handle Strategy, Marketing, Design, and Execution — so you get premium service, every time.'
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await apiService.get(endPointApi.team);
        if (data) {
          if (data.teamHeader) {
            setTeamHeader(data.teamHeader);
          }
          if (Array.isArray(data.team) && data.team.length > 0) {
            setTeamMembers(data.team);
          }
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="container max-w-7xl px-6 mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          {teamHeader.subtitle && (
            <p className="text-sm text-theme-navy/60 font-medium mb-4">
              {teamHeader.subtitle}
            </p>
          )}
          {teamHeader.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-navy tracking-tight mb-6 max-w-3xl leading-[1.2]">
              {teamHeader.title}
            </h2>
          )}
          {teamHeader.description && (
            <p className="text-theme-navy/50 text-sm md:text-base max-w-2xl font-light">
              {teamHeader.description}
            </p>
          )}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 mt-12 max-w-4xl mx-auto">
          {teamMembers.map((member, idx) => {
            const memberImg = getMemberImage(member.image, idx);
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="flex flex-col items-center group cursor-pointer text-center"
              >
                
                {/* Image Container */}
                <div className="w-full aspect-[3/4] relative overflow-hidden mb-6 rounded-2xl shadow-md transition-all duration-500 group-hover:shadow-2xl bg-gray-100">
                  <img
                    src={memberImg}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/main1.jpg';
                    }}
                  />
                </div>

              {/* Name with Brush Stroke Hover */}
              <div className="relative mb-2 px-8 py-2 w-full flex justify-center">
                {/* Custom SVG Brush Stroke Background (Shows on Hover) */}
                <svg 
                  className="absolute inset-0 w-full h-full text-theme-navy opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 z-0"
                  preserveAspectRatio="none" 
                  viewBox="0 0 100 100" 
                  fill="currentColor"
                >
                  <path d="M3,50 C3,30 15,25 30,35 C50,50 70,25 85,35 C97,45 97,70 85,80 C70,90 50,70 30,85 C15,95 3,70 3,50 Z" />
                </svg>
                
                <h3 className="relative z-10 text-lg md:text-xl font-bold text-theme-navy group-hover:text-white transition-colors duration-300">
                  {member.name}
                </h3>
              </div>

              {/* Role */}
              <p className="text-theme-navy/60 text-sm font-medium tracking-wide">
                {member.role}
              </p>

            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
