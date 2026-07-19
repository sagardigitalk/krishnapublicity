"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

interface BrandingType {
  name: string;
  images: string[];
  description: string;
}

const fallbackBrandingTypes: Record<string, BrandingType> = {
  "tricycle-ad": {
    name: "Tricycle Ad",
    images: ["/branndingImage/t2.jpg", "/branndingImage/t3.jpg", "/branndingImage/t4.jpg"],
    description: "Mobile advertising on tricycles for maximum visibility",
  },
  "rickshaw-ad": {
    name: "Rickshaw Ad",
    images: [
      "/branndingImage/r2.jpg",
      "/branndingImage/r3.jpg",
      "/branndingImage/r4.jpg",
    ],
    description: "Eye-catching ads on rickshaws for local exposure",
  },
  "wall-painting": {
    name: "Wall Painting",
    images: ["/branndingImage/w2.jpg", "/branndingImage/w3.jpg", "/branndingImage/w4.jpg"],
    description: "Large-scale artistic advertisements on building walls",
  },
};

export default function BrandingTypePage() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [brandingType, setBrandingType] = useState<BrandingType | null>(null);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const slugKey = params.id.toLowerCase();
      
      // Attempt to fetch from API
      apiService.get(endPointApi.branding)
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            const found = data.find((item: any) => item.slug?.toLowerCase() === slugKey);
            if (found) {
              const gallery = (found.galleryImages && found.galleryImages.length > 0) 
                ? found.galleryImages 
                : [found.image || '/branndingImage/t1.jpg'];
              setBrandingType({
                name: found.name,
                images: gallery.map((imgUrl: string) => apiService.getImageUrl(imgUrl)),
                description: found.description
              });
              return;
            }
          }
          if (fallbackBrandingTypes[slugKey]) {
            setBrandingType(fallbackBrandingTypes[slugKey]);
          }
        })
        .catch(() => {
          if (fallbackBrandingTypes[slugKey]) {
            setBrandingType(fallbackBrandingTypes[slugKey]);
          }
        });
    }
  }, [params.id]);

  if (!brandingType) {
    return (
      <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-4 pt-36 pb-24 text-theme-navy flex flex-col items-center justify-center">
          <Button
            variant="outline"
            className="mb-8 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-4xl font-bold mb-8">Branding service not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % brandingType.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + brandingType.images.length) % brandingType.images.length
    );
  };

  return (
    <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-6 pt-36 pb-24 text-theme-navy max-w-6xl">
        <Link href="/services/branding">
          <Button
            variant="outline"
            className="mb-8 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-all rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Branding Services
          </Button>
        </Link>

        <motion.h1
          className="text-4xl md:text-5xl font-black text-theme-navy tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {brandingType.name}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-theme-navy/70 mb-12 max-w-3xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {brandingType.description}
        </motion.p>

        {/* Carousel / Image Showcase */}
        <div className="relative flex flex-col items-center justify-center bg-white p-4 md:p-8 rounded-[2.5rem] border border-theme-navy/10 shadow-xl overflow-hidden">
          <div className="relative w-full h-[350px] md:h-[550px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={brandingType.images[currentImageIndex]}
                alt={`${brandingType.name} ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {brandingType.images.length > 1 && (
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

          {brandingType.images.length > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {brandingType.images.map((_, index) => (
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

