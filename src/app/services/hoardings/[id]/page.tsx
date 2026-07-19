"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

interface Hoarding {
  id: string;
  title: string;
  image: string;
  description: string;
  currentPrice: number;
  previousPrice: number;
  mapLink: string;
}

interface CityData {
  name: string;
  hoardings: Hoarding[];
}

const cityHoardings: Record<string, CityData> = {
  bhavnagar: {
    name: "Bhavnagar",
    hoardings: [
      {
        id: "bhavnagar-1",
        title: "Bhavnagar",
        image: "/hordingimage/Picture1.jpg?height=600&width=800&text=Bhavnagar+Hoarding+1",
        description: " SBV- KA03-B’nagar- kobdi  NH- 8E Talaja To B’nagar-Costal Hwy.",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/HDyRAVBGrK1HCJsTA"
      },
      {
        id: "bhavnagar-2",
        title: "Bhavnagar",
        image: "/hordingimage/Picture2.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "B’nagar- kobdi  NH- 8E  bhavnagar  to Talaja  –Toll plaza -Costal Hwy.",
        currentPrice: 18000,
        previousPrice: 20000,
        mapLink: "https://maps.app.goo.gl/HDyRAVBGrK1HCJsTA"
      }
    ]
  },
  surat: {
    name: "Surat",
    hoardings: [
      {
        id: "surat-1",
        title: "Olpad",
        image: "/surathording/olpad/Picture1.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – opp,Polise Station main Road",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/sKVV4HCF2KnQYuiv8"
      }
    ]
  },
  ahmedabad: {
    name: "Ahmedabad",
    hoardings: [
      {
        id: "ahmedabad-1",
        title: "Ahmedabad Central",
        image: "/ahmedabad/image4.jpg?height=600&width=800&text=Ahmedabad+Hoarding+1",
        description: "Description for hoarding 1",
        currentPrice: 200000,
        previousPrice: 220000,
        mapLink: "23.061785 & 72.552196"
      }
    ]
  }
};

export default function CityHoardingsPage() {
  const params = useParams();
  const router = useRouter();
  const [city, setCity] = useState<CityData | null>(null);
  const [selectedHoarding, setSelectedHoarding] = useState<Hoarding | null>(null);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const cityKey = params.id.toLowerCase();
      
      // Attempt to fetch dynamic city from API
      apiService.get(endPointApi.hoardings)
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            const foundCity = data.find((c: any) => c.cityId?.toLowerCase() === cityKey);
            if (foundCity) {
              setCity({
                name: foundCity.cityName,
                hoardings: (foundCity.hoardings || []).map((h: any, idx: number) => ({
                  id: h._id || `${cityKey}-${idx}`,
                  title: h.name,
                  image: apiService.getImageUrl(h.mainImage, '/hordingimage/bhavnagar1.jpg'),
                  description: h.description || h.location || '',
                  currentPrice: 10000,
                  previousPrice: 12000,
                  mapLink: h.location || 'https://maps.google.com'
                }))
              });
              return;
            }
          }
          if (cityHoardings[cityKey]) {
            setCity(cityHoardings[cityKey]);
          }
        })
        .catch(() => {
          if (cityHoardings[cityKey]) {
            setCity(cityHoardings[cityKey]);
          }
        });
    }
  }, [params.id]);

  const handleDownload = async () => {
    if (!selectedHoarding) return;
    try {
      const descriptionFileName = selectedHoarding.description.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
      const imageUrl = selectedHoarding.image.split('?')[0];
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const imageBlob = await response.blob();

      const textContent = `${selectedHoarding.title}\n\n${selectedHoarding.description}`;
      const textBlob = new Blob([textContent], { type: 'text/plain' });

      const zip = new JSZip();
      zip.file(`${descriptionFileName}.txt`, textBlob);
      zip.file(`hoarding-image.jpg`, imageBlob);

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${descriptionFileName}-details.zip`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  if (!city) {
    return (
      <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-4 pt-36 pb-16 text-theme-navy flex flex-col items-center justify-center">
          <h1 className="text-4xl font-black mb-8 text-theme-navy">City not found</h1>
          <Button
            variant="outline"
            className="bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-4 pt-36 pb-24 text-theme-navy max-w-7xl">
        <Link href="/services/hoardings">
          <Button
            variant="outline"
            className="mb-8 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cities
          </Button>
        </Link>
        <motion.h1
          className="text-4xl font-black text-theme-navy tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hoardings in <span className="text-theme-navy">{city.name}</span>
        </motion.h1>
        <motion.p
          className="text-xl text-theme-navy/70 mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore premium hoarding locations in {city.name} for maximum visibility.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {city.hoardings.map((hoarding) => (
            <Card key={hoarding.id} className="bg-white border-theme-navy/10 overflow-hidden shadow-sm hover:shadow-xl transition-all rounded-2xl flex flex-col justify-between">
              <CardContent className="p-4">
                <div className="relative h-64 w-full mb-4 rounded-xl overflow-hidden group">
                  <Image
                    src={hoarding.image}
                    alt={hoarding.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <a
                    href={hoarding.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MapPin className="h-5 w-5 text-theme-navy" />
                  </a>
                </div>

                <h3 className="font-bold text-lg text-theme-navy mb-2">{hoarding.title}</h3>
                <p className="text-sm text-theme-navy/70 mb-3 line-clamp-2">{hoarding.description}</p>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-theme-navy font-bold">
                    ₹{hoarding.currentPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-theme-navy/40 line-through">
                    ₹{hoarding.previousPrice.toLocaleString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full rounded-xl bg-theme-navy text-white hover:bg-theme-navy/90"
                  onClick={() => setSelectedHoarding(hoarding)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedHoarding && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full p-2"
                onClick={() => setSelectedHoarding(null)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-black mb-4 text-theme-navy">{selectedHoarding.title}</h2>
              <div className="relative h-64 md:h-80 w-full mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={selectedHoarding.image}
                  alt={selectedHoarding.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-theme-navy/70 mb-6 text-base">{selectedHoarding.description}</p>
              <div className="bg-theme-cream border border-theme-navy/10 p-4 rounded-xl mb-6 flex gap-4 items-center">
                <p className="text-theme-navy font-bold text-lg">
                  Price: ₹{selectedHoarding.currentPrice.toLocaleString()}
                </p>
                <p className="text-theme-navy/40 line-through text-sm">
                  ₹{selectedHoarding.previousPrice.toLocaleString()}
                </p>
              </div>

              <Button
                className="w-full rounded-xl h-12 text-lg shadow-md hover:shadow-lg transition-all border-none bg-theme-navy text-white hover:bg-theme-navy/90"
                onClick={handleDownload}
              >
                Download Details
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
