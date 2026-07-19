"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

interface GraphicsType {
  slug: string;
  name: string;
  image: string;
  description: string;
}

const fallbackGraphicsTypes: GraphicsType[] = [
  {
    slug: "board-banner",
    name: "Board Banner",
    image: "/graphicsimage/bordbanner.jpg",
    description: "Large format printed banners for outdoor display",
  },
  {
    slug: "business-card",
    name: "Business Card",
    image: "/graphicsimage/bussineshcard.jpg",
    description: "Professional business cards for networking",
  },
  {
    slug: "bill-books",
    name: "Bill Books",
    image: "/graphicsimage/billbook.jpg",
    description: "Custom bill books for businesses",
  },
  {
    slug: "pamphlet",
    name: "Pamphlet",
    image: "/graphicsimage/paplate.jpg",
    description: "Informative pamphlets for marketing",
  },
  {
    slug: "brochure",
    name: "Brochure",
    image: "/graphicsimage/brochure.jpg",
    description: "Detailed brochures for product showcases",
  },
  {
    slug: "invitation-card",
    name: "Invitation Card",
    image: "/graphicsimage/inviation.jpg",
    description: "Elegant invitation cards for events",
  },
  {
    slug: "wedding-card",
    name: "Wedding Card",
    image: "/graphicsimage/weddingcard.jpg",
    description: "Customized wedding cards and invitations",
  },
  {
    slug: "digital-pdf",
    name: "Digital PDF",
    image: "/graphicsimage/digital.jpg",
    description: "Interactive digital PDFs for online distribution",
  },
  {
    slug: "calendar",
    name: "Calendar",
    image: "/graphicsimage/calender.jpg",
    description: "Custom calendars for promotional purposes",
  },
  {
    slug: "doctor-file",
    name: "Doctor File",
    image: "/graphicsimage/doctorfile.jpg",
    description: "Specialized file folders for medical professionals",
  },
  {
    slug: "letterhead",
    name: "Letterhead",
    image: "/graphicsimage/letter.jpg",
    description: "Professional letterheads for business correspondence",
  },
  {
    slug: "traveling-books",
    name: "Traveling Books",
    image: "/graphicsimage/travillang.jpg",
    description: "Compact, informative travel guides",
  },
  {
    slug: "vinyl-sticker",
    name: "Sticker Vinyl",
    image: "/graphicsimage/vinyl.jpg",
    description: "Durable vinyl stickers for various applications",
  },
  {
    slug: "blurred-film",
    name: "Blurred Film",
    image: "/graphicsimage/blur.jpg",
    description: "Decorative blurred film for windows and glass surfaces",
  },
  {
    slug: "one-way-vision",
    name: "One-Way Vision",
    image: "/graphicsimage/oneway.jpg",
    description: "One-way vision graphics for windows and vehicles",
  },
];

export default function GraphicsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [graphicsTypes, setGraphicsTypes] = useState<GraphicsType[]>(fallbackGraphicsTypes);

  useEffect(() => {
    const fetchGraphics = async () => {
      try {
        const data = await apiService.get(endPointApi.graphics);
        if (Array.isArray(data) && data.length > 0) {
          setGraphicsTypes(data);
        }
      } catch (error) {
        console.error("Error fetching graphics services:", error);
      }
    };
    fetchGraphics();
  }, []);

  const filteredGraphics = graphicsTypes.filter(
    (type) =>
      (filter === "all" || type.slug === filter) &&
      (type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-theme-cream min-h-screen">
      <Navbar />

      <section className="pt-36 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
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
              Graphics <span className="text-theme-navy">Solutions</span>
            </h1>
            <p className="text-lg text-theme-navy/70 max-w-2xl mx-auto leading-relaxed font-light">
              Explore our creative graphic design solutions designed to make your visual communications stand out.
            </p>
          </motion.div>

          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96">
                <Input
                  type="text"
                  placeholder="Search graphics solutions..."
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
                {graphicsTypes.slice(0, 4).map((type) => (
                  <Button
                    key={type.slug}
                    variant={filter === type.slug ? "default" : "outline"}
                    onClick={() => setFilter(type.slug)}
                    className={`h-12 px-6 rounded-xl transition-all duration-300 ${
                      filter === type.slug
                        ? "bg-theme-navy text-white shadow-md hover:bg-theme-navy/90"
                        : "bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
                    }`}
                  >
                    {type.name}
                  </Button>
                ))}
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
              {filteredGraphics.map((type) => (
                <motion.div
                  key={type.slug}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -10 }}
                  className="group h-full"
                >
                  <Link href={`/services/graphics/${type.slug}`} className="block h-full">
                    <motion.div 
                      className="h-full bg-white border border-theme-navy/10 rounded-[2rem] flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-500 group-hover:border-theme-navy/30 group-hover:shadow-xl"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CardContent className="p-0 flex flex-col h-full">
                        <div
                          className="relative h-60 w-full overflow-hidden"
                          onMouseEnter={() => setHoveredType(type.slug)}
                          onMouseLeave={() => setHoveredType(null)}
                        >
                          <img
                            src={apiService.getImageUrl(type.image, '/graphicsimage/bordbanner.jpg')}
                            alt={type.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                          
                          <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-xl font-bold text-white mb-2">{type.name}</h3>
                          </div>

                          <AnimatePresence>
                            {hoveredType === type.slug && (
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

      <Footer />
    </div>
  );
}
