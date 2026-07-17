"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

type HoardingImage = {
    id: string;
    src: string;
    location: string;
    mapLink: string;
};

const allHoardings: HoardingImage[] = [
    {
        id: "bhavnagar1",
        src: "/hordingimage/bhavnagar1.jpg?height=400&width=600&text=Bhavnagar-1",
        location: "Bhavnagar Central",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "bhavnagar2",
        src: "/hordingimage/bhavnagar2.jpg?height=400&width=600&text=Bhavnagar-2",
        location: "Bhavnagar Highway",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "bhavnagar4",
        src: "/hordingimage/b2.jpg?height=400&width=600&text=Bhavnagar-2",
        location: "Bhavnagar Highway",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "bhavnagar3",
        src: "/hordingimage/b5.jpg?height=400&width=600&text=Bhavnagar-3",
        location: "Bhavnagar Market",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "surat1",
        src: "/hordingimage/s1.jpg?height=400&width=600&text=Surat-1",
        location: "Surat Ring Road",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "surat2",
        src: "/hordingimage/s2.jpg?height=400&width=600&text=Surat-2",
        location: "Surat Station",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "surat3",
        src: "/hordingimage/s3.jpg?height=400&width=600&text=Surat-3",
        location: "Surat Mall",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "surat4",
        src: "/hordingimage/s4.jpg?height=400&width=600&text=Surat-3",
        location: "Surat Mall",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "ahmedabad1",
        src: "/hordingimage/a1.jpg?height=400&width=600&text=Ahmedabad-1",
        location: "Ahmedabad SG Highway",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
    {
        id: "ahmedabad2",
        src: "/hordingimage/a2.jpg?height=400&width=600&text=Ahmedabad-2",
        location: "Ahmedabad Airport Road",
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"

    },
];

export default function AllHoardingsPage() {
    const [hoveredHoarding, setHoveredHoarding] = useState<string | null>(null);

    return (
        <section className="py-24 bg-theme-cream min-h-screen">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="mb-8">
                    <Link href="/services/hoardings">
                        <Button
                            variant="outline"
                            className="bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-all rounded-xl"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cities
                        </Button>
                    </Link>
                </div>

                <motion.h1
                    className="text-4xl md:text-5xl font-black text-center mb-6 text-theme-navy"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    All Available Hoardings
                </motion.h1>

                <motion.p
                    className="text-center text-theme-navy/70 mb-16 text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Explore our complete collection of premium advertising locations.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {allHoardings.map((hoarding) => (
                        <motion.div
                            key={hoarding.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative bg-white rounded-[2rem] overflow-hidden border border-theme-navy/10 shadow-sm hover:shadow-xl hover:border-theme-navy/30 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="p-0 flex flex-col h-full">
                                <div
                                    className="relative h-64 w-full overflow-hidden"
                                    onMouseEnter={() => setHoveredHoarding(hoarding.id)}
                                    onMouseLeave={() => setHoveredHoarding(null)}
                                >
                                    <Image
                                        src={hoarding.src}
                                        alt={hoarding.location}
                                        fill
                                        className="object-contain transition-transform duration-700 ease-out transform group-hover:scale-110"
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <AnimatePresence>
                                        {hoveredHoarding === hoarding.id && (
                                            <motion.div
                                                className="absolute inset-0 bg-theme-navy/20 backdrop-blur-[2px] flex items-center justify-center z-10"
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
                                    <a
                                        href={hoarding.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-theme-navy focus:ring-opacity-50 z-20"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MapPin className="h-5 w-5 text-theme-navy" />
                                    </a>
                                </div>
                                <div className="p-6 bg-slate-50 flex-grow border-t border-slate-100 flex flex-col justify-between">
                                    <h3 className="text-xl font-bold text-center text-theme-navy mb-6">
                                        {hoarding.location}
                                    </h3>
                                    <div className="flex justify-center w-full">
                                        <Link href={`/services/hoardings/${hoarding.id.split(/\d+/)[0]}`} className="w-full max-w-[200px]">
                                            <Button className="w-full bg-theme-navy text-white hover:bg-theme-navy/90 rounded-xl h-12 shadow-md hover:shadow-lg transition-all duration-300">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

