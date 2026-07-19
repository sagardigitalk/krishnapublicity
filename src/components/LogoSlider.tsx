"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";

const defaultLogos = [
    { src: "/logos/logo1.png", alt: "Company 1" },
    { src: "/logos/logo2.png", alt: "Company 2" },
    { src: "/logos/logo3.png", alt: "Company 3" },
    { src: "/logos/logo4.png", alt: "Company 4" },
    { src: "/logos/logo5.png", alt: "Company 5" },
    { src: "/logos/logo6.png", alt: "Company 6" },
    { src: "/logos/logo7.jpg", alt: "Company 7" },
    { src: "/logos/logo8.jpg", alt: "Company 8" },
    { src: "/logos/logo9.jpg", alt: "Company 9" },
    { src: "/logos/logo10.jpg", alt: "Company 10" },
    { src: "/logos/logo11.jpg", alt: "Company 11" },
    { src: "/logos/logo12.jpg", alt: "Company 12" },
    { src: "/logos/logo13.png", alt: "Company 13" },
];

const resolveLogoUrl = (src?: string, index: number = 0) => {
    return apiService.getImageUrl(src, defaultLogos[index % defaultLogos.length].src);
};

export default function LogoSlider() {
    const [logos, setLogos] = useState(defaultLogos);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await apiService.get(endPointApi.partners);
                if (Array.isArray(data) && data.length > 0) {
                    const mappedLogos = data.map((p: any, idx: number) => ({
                        src: resolveLogoUrl(p.image, idx),
                        alt: p.name || `Partner ${idx + 1}`
                    }));
                    setLogos(mappedLogos);
                }
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        };
        fetchPartners();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: Math.min(5, Math.max(1, logos.length)),
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(4, Math.max(1, logos.length)),
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(3, Math.max(1, logos.length)),
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(2, Math.max(1, logos.length)),
                },
            },
        ],
    };

    return (
        <div className="py-10 relative overflow-hidden">
            <div className="w-full px-4 md:px-8">
                <Slider {...settings} className="client-slider">
                    {logos.map((logo, index) => (
                        <div key={index} className="px-6 outline-none">
                            <div className="h-48 flex items-center justify-center p-4 rounded-3xl bg-white border border-slate-100 hover:border-theme-navy/40 hover:bg-theme-cream shadow-lg transition-all duration-500 group cursor-pointer overflow-hidden">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110 p-2"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/logos/logo1.png';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <style jsx global>{`
              .client-slider .slick-track {
                display: flex !important;
                align-items: center;
              }
            `}</style>
        </div>
    );
}
