"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./Navbar/page";
import Hero from "./hero/page";
import About from "./about/page";
import Services from "./services/page";
import Gallery from "./gallery/page"
import Contact from "./contact/page";
import Footer from "./Footer/page";
import LogoSlider from "@/components/LogoSlider";
import TeamSection from "@/components/TeamSection";
import FeatureSection from "@/components/FeatureSection";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div>
      {/* Interactive Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-theme-navy origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <Hero />
      <About />
      
      {/* New Interactive Section: Feature Section */}
      <FeatureSection />

      {/* New Interactive Section: Trusted Clients Slider */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="text-center mb-8">
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-theme-navy/50">Trusted by Industry Leaders</p>
        </div>
        <LogoSlider />
      </section>

      <Services/>

      {/* New Interactive Section: Team / Staff */}
      <TeamSection />

      <Gallery />
      <Contact />
      <Footer/>
    </div>
  );
}
