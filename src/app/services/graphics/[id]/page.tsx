"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

interface GraphicsType {
  name: string;
  images: string[];
  description: string;
}

const fallbackGraphicsTypes: Record<string, GraphicsType> = {
  "board-banner": {
    name: "Board Banner",
    images: [
      "/graphicsimage/tyepimages/board1.jpg",
      "/graphicsimage/tyepimages/board2.jpg",
      "/graphicsimage/tyepimages/boARD3.jpg",
    ],
    description:
      "Large format printed banners for outdoor display. Perfect for events, promotions, and business advertising.",
  },
  "business-card": {
    name: "Business Card",
    images: [
      "/graphicsimage/tyepimages/b1.jpg",
      "/graphicsimage/tyepimages/b2.jpg",
    ],
    description:
      "Professional business cards for networking. Make a lasting impression with our custom designs.",
  },
};

export default function GraphicsTypePage() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [graphicsType, setGraphicsType] = useState<GraphicsType | null>(null);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const slugKey = params.id.toLowerCase();
      
      // Attempt to fetch from API
      apiService.get(endPointApi.graphics)
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            const found = data.find((item: any) => item.slug?.toLowerCase() === slugKey);
            if (found) {
              const gallery = (found.galleryImages && found.galleryImages.length > 0) 
                ? found.galleryImages 
                : [found.image || '/graphicsimage/bordbanner.jpg'];
              setGraphicsType({
                name: found.name,
                images: gallery.map((imgUrl: string) => apiService.getImageUrl(imgUrl)),
                description: found.description
              });
              return;
            }
          }
          if (fallbackGraphicsTypes[slugKey]) {
            setGraphicsType(fallbackGraphicsTypes[slugKey]);
          }
        })
        .catch(() => {
          if (fallbackGraphicsTypes[slugKey]) {
            setGraphicsType(fallbackGraphicsTypes[slugKey]);
          }
        });
    }
  }, [params.id]);

  if (!graphicsType) {
    return (
      <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-4 pt-36 pb-24 text-theme-navy flex flex-col items-center justify-center">
          <Button
            variant="outline"
            className="mb-8 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Types
          </Button>
          <h1 className="text-4xl font-bold mb-8">Graphics type not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % graphicsType.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + graphicsType.images.length) % graphicsType.images.length
    );
  };

  return (
    <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-6 pt-36 pb-24 text-theme-navy max-w-6xl">
        <Link href="/services/graphics">
          <Button
            variant="outline"
            className="mb-8 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-all rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Types
          </Button>
        </Link>

        <motion.h1
          className="text-4xl md:text-5xl font-black text-theme-navy tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {graphicsType.name}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-theme-navy/70 mb-12 max-w-3xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {graphicsType.description}
        </motion.p>

        {/* Carousel / Image Showcase */}
        <div className="relative flex flex-col items-center justify-center bg-white p-4 md:p-8 rounded-[2.5rem] border border-theme-navy/10 shadow-xl overflow-hidden">
          <div className="relative w-full h-[350px] md:h-[550px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={graphicsType.images[currentImageIndex]}
                alt={`${graphicsType.name} ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {graphicsType.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white text-theme-navy border-none shadow-lg"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white text-theme-navy border-none shadow-lg"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {graphicsType.images.length > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {graphicsType.images.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-3 rounded-full transition-all ${
                    index === currentImageIndex ? "w-8 bg-theme-navy" : "w-3 bg-theme-navy/20"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

