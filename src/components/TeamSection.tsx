"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

  const MemberCard = ({ member, idx }: { member: any; idx: number }) => {
    const memberImg = getMemberImage(member.image, idx);
    return (
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (idx % 5) * 0.1, duration: 0.5 }}
        className="flex flex-col items-center group cursor-pointer text-center w-full"
      >
        <div className="w-full aspect-[3/4] relative overflow-hidden mb-5 bg-[#EFE7DE]">
          <img
            src={memberImg}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/main1.jpg';
            }}
          />
          <div className="absolute inset-0 bg-[#ffffff]/0 group-hover:bg-[#ffffff]/10 transition-all duration-300 pointer-events-none" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 px-2">
          <h3 className="text-lg md:text-xl font-bold text-[#1b2642] group-hover:text-[#1B2642] transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-[#1b2642]/60 text-sm font-medium tracking-wide uppercase text-xs">
            {member.role}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderMembers = () => {
    if (teamMembers.length <= 5) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12 mt-12 max-w-7xl mx-auto justify-center px-4">
          {teamMembers.map((member, idx) => (
            <MemberCard key={idx} member={member} idx={idx} />
          ))}
        </div>
      );
    }

    return (
      <div className="mt-12 max-w-7xl mx-auto px-4 relative team-swiper">
        <style dangerouslySetInnerHTML={{__html: `
          .team-swiper .swiper-button-next,
          .team-swiper .swiper-button-prev {
            color: #1b2642;
            background: #ffffff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .team-swiper .swiper-button-next:after,
          .team-swiper .swiper-button-prev:after {
            font-size: 16px;
            font-weight: bold;
          }
          .team-swiper .swiper-button-next:hover,
          .team-swiper .swiper-button-prev:hover {
            color: #ffffff;
            background: #1B2642;
          }
          .team-swiper .swiper-pagination-bullet {
            background: #1b2642;
          }
          .team-swiper .swiper-pagination-bullet-active {
            background: #1B2642;
          }
        `}} />
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-16 pt-4 px-4"
        >
          {teamMembers.map((member, idx) => (
            <SwiperSlide key={idx}>
              <MemberCard member={member} idx={idx} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <section className="py-24 bg-[#F8F5F0] font-sans overflow-hidden">
      <div className="container max-w-screen-2xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-8 px-6"
        >
          {teamHeader.subtitle && (
            <p className="text-sm text-[#1B2642] font-bold uppercase tracking-[0.2em] mb-4">
              {teamHeader.subtitle}
            </p>
          )}
          {teamHeader.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b2642] tracking-tight mb-6 max-w-3xl leading-[1.2]">
              {teamHeader.title}
            </h2>
          )}
          {teamHeader.description && (
            <p className="text-[#1b2642]/70 text-sm md:text-base max-w-2xl font-light">
              {teamHeader.description}
            </p>
          )}
        </motion.div>

        {renderMembers()}

      </div>
    </section>
  );
}
