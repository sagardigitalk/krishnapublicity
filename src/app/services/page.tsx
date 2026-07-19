"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    id: "hoardings",
    title: "OUTDOOR HOARDINGS",
    image: "/serviceimage/hordingimage.jpg",
  },
  {
    id: "branding",
    title: "BRAND IDENTITY",
    image: "/serviceimage/brandingmian.jpg",
  },
  {
    id: "graphics",
    title: "CREATIVE DESIGN",
    image: "/serviceimage/graphicmain1.jpg",
  },
];

export default function Services() {
  const router = useRouter();

  return (
    <section id="services" className="py-12 bg-theme-cream w-full">
      <div className="w-full px-6 lg:px-16 mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-theme-navy text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Our Expertise
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-theme-navy">
              Advertising Solutions
            </h2>
          </motion.div>
        </div>

        {/* 3 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => router.push(`/services/${service.id}`)}
              className="group relative h-[300px] md:h-[350px] lg:h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-lg"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-theme-navy/90 via-theme-navy/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end">
                <h3 className="text-white font-extrabold text-sm md:text-base tracking-widest uppercase mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {service.title}
                </h3>
                {/* Decorative Line */}
                <div className="h-1 w-8 bg-theme-navy transition-all duration-500 group-hover:w-full group-hover:bg-white" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
