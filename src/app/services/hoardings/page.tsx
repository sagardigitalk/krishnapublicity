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

type CitiesType = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const cities: CitiesType[] = [
  {
    id: "bhavnagar",
    name: "Bhavnagar",
    image: "/hordingimage/bhavnagar1.jpg",
    description: "Explore hoardings in the historic city of Bhavnagar",
  },
  {
    id: "surat",
    name: "Surat",
    image: "/hordingimage/s1.jpg",
    description: "Discover advertising opportunities in the Diamond City",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    image: "/hordingimage/a1.jpg",
    description: "Find prime hoarding locations in the largest city of Gujarat",
  },
];

export default function HoardingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Prime Locations</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-theme-navy tracking-tight mb-6">
            Hoarding <span className="text-theme-navy">Networks</span>
          </h1>
          <p className="text-lg text-theme-navy/70 max-w-2xl mx-auto leading-relaxed font-light">
            Explore our extensive hoarding network across major cities in Gujarat to maximize your brand&apos;s reach and impact.
          </p>
        </motion.div>

        <div className="mb-16">
          <div className="flex justify-center">
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white border-theme-navy/10 text-theme-navy rounded-2xl focus:ring-theme-navy shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-navy/40 w-5 h-5" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredCities.map((city) => (
              <motion.div
                key={city.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <Link href={`/services/hoardings/${city.id}`} className="block h-full">
                  <motion.div 
                    className="h-full bg-white border border-theme-navy/10 rounded-[2rem] flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-500 group-hover:border-theme-navy/30 group-hover:shadow-xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                      <div
                        className="relative h-64 w-full overflow-hidden"
                        onMouseEnter={() => setHoveredCity(city.id)}
                        onMouseLeave={() => setHoveredCity(null)}
                      >
                        <Image
                          src={city.image}
                          alt={city.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                        
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                        </div>

                        <AnimatePresence>
                          {hoveredCity === city.id && (
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
                          {city.description}
                        </p>
                      </div>
                    </CardContent>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-16">
          <Link href="/services/hoardings/all">
            <Button className="h-12 px-8 rounded-xl bg-theme-navy hover:bg-theme-navy/90 text-white font-semibold shadow-lg hover:shadow-theme-navy/25 transition-all duration-300">
              View All Hoardings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
