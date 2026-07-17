"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

type BrandingType = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const brandingTypes: BrandingType[] = [
  {
    id: "tricycle-ad",
    name: "Tricycle Ad",
    image: "/branndingImage/t1.jpg",
    description: "Mobile advertising on tricycles for maximum visibility",
  },
  {
    id: "rickshaw-ad",
    name: "Rickshaw Ad",
    image: "/branndingImage/r1.jpg",
    description: "Eye-catching ads on rickshaws for local exposure",
  },
  {
    id: "wall-painting",
    name: "Wall Painting",
    image: "/branndingImage/w1.jpg",
    description: "Large-scale artistic advertisements on building walls",
  },
  {
    id: "tempovan-ad",
    name: "Tempovan Ad",
    image: "/branndingImage/te1.jpg",
    description: "Mobile advertising on tempo vans for wider reach",
  },
  {
    id: "canopy",
    name: "Canopy",
    image: "/branndingImage/c1.jpg",
    description: "Branded canopies for events and outdoor promotions",
  },
  {
    id: "gazebo",
    name: "Gazebo",
    image: "/branndingImage/g1.jpg",
    description: "Customized gazebos for trade shows and exhibitions",
  },
  {
    id: "acrylic-boards",
    name: "Acrylic Boards",
    image: "/branndingImage/li1.jpg",
    description: "Sleek and modern acrylic signage for businesses",
  },
  {
    id: "acp-elevation",
    name: "ACP Elevation",
    image: "/branndingImage/ac1.jpg",
    description: "Aluminum Composite Panel elevations for building branding",
  },
  {
    id: "non-woven-bag",
    name: "Non Woven Bag",
    image: "/branndingImage/no2.jpg",
    description: "Eco-friendly and durable promotional bags",
  },
  {
    id: "lighting-board",
    name: "Lighting Board",
    image: "/branndingImage/a1.jpg",
    description: "Illuminated signage for enhanced visibility",
  },
  {
    id: "led-board",
    name: "LED Board",
    image: "/branndingImage/le1.jpg",
    description: "Energy-efficient LED displays for dynamic advertising",
  },
  {
    id: "sunpack-board",
    name: "Sunpack Board",
    image: "/branndingImage/sp1.jpg",
    description: "Durable and weather-resistant signage for outdoor use",
  },
];

export default function BrandingPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const filteredBranding = brandingTypes.filter(
    (type) =>
      (filter === "all" || type.id === filter) &&
      (type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="py-24 lg:py-32 bg-theme-cream min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <Link href="/#services">
          <Button
            variant="outline"
            className="mb-12 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-all duration-300 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Button>
        </Link>
        
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-theme-navy/10 text-theme-navy mb-6">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Our Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-theme-navy tracking-tight mb-6">
            Branding <span className="text-theme-navy">Solutions</span>
          </h1>
          <p className="text-lg text-theme-navy/70 max-w-2xl mx-auto leading-relaxed font-light">
            Discover our comprehensive brand identity services to elevate your business presence and dominate your market.
          </p>
        </motion.div>

        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Search branding solutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white border-theme-navy/10 text-theme-navy rounded-2xl focus:ring-theme-navy shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-navy/40 w-5 h-5" />
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={`h-12 px-6 rounded-xl transition-all duration-300 ${
                  filter === "all"
                    ? "bg-theme-navy text-white shadow-md hover:bg-theme-navy/90"
                    : "bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
                }`}
              >
                All
              </Button>
              {brandingTypes.slice(0, 4).map((type) => (
                <Button
                  key={type.id}
                  variant={filter === type.id ? "default" : "outline"}
                  onClick={() => setFilter(type.id)}
                  className={`h-12 px-6 rounded-xl transition-all duration-300 ${
                    filter === type.id
                      ? "bg-theme-navy text-white shadow-md hover:bg-theme-navy/90"
                      : "bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
                  }`}
                >
                  {type.name}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl bg-white border-theme-navy/10 text-theme-navy/40 cursor-default hover:bg-white"
              >
                + More
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredBranding.map((type) => (
              <motion.div
                key={type.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <Link href={`/services/branding/${type.id}`} className="block h-full">
                  <motion.div 
                    className="h-full bg-white border border-theme-navy/10 rounded-[2rem] flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-500 group-hover:border-theme-navy/30 group-hover:shadow-xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                      <div
                        className="relative h-60 w-full overflow-hidden"
                        onMouseEnter={() => setHoveredType(type.id)}
                        onMouseLeave={() => setHoveredType(null)}
                      >
                        <Image
                          src={type.image}
                          alt={type.name}
                          fill
                          className="object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                        
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-xl font-bold text-white mb-2">{type.name}</h3>
                        </div>

                        <AnimatePresence>
                          {hoveredType === type.id && (
                            <motion.div
                              className="absolute inset-0 bg-theme-navy/20 backdrop-blur-[2px] flex items-center justify-center z-20"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div 
                                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              >
                                <ArrowRight className="text-theme-navy w-6 h-6" />
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="p-6 bg-slate-50 flex-grow border-t border-slate-100">
                        <p className="text-theme-navy/70 text-sm leading-relaxed line-clamp-3">
                          {type.description}
                        </p>
                      </div>
                    </CardContent>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

