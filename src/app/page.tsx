"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowIcon from "@/components/ui/Icons";

const slides = [
  {
    title: "Selamat Pagi",
    text: "Mari lakukan prediksi hipertensi Anda lebih awal untuk menjaga kesehatan lebih baik.",
    buttonText: "Mulai Prediksi",
    buttonLink: "/form-prediksi",
    image: "/images/foto1.jpg",
  },
  {
    title: "Edukasi Hipertensi",
    text: "Pelajari cara menjaga tekanan darah tetap stabil dengan tips dan edukasi terpercaya.",
    buttonText: "Lihat Edukasi",
    buttonLink: "/halaman-edukasi",
    image: "/images/foto2.jpg",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative h-[600px] rounded-2xl shadow-lg mt-15 overflow-hidden">
        {/* Background image */}
        <Image src={slides[current].image} alt={slides[current].title} fill className="object-cover object-[center_30%]" priority />

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-10 bg-black/40 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{slides[current].title}</h1>
          <p className="text-lg md:text-xl mb-6 max-w-lg">{slides[current].text}</p>
          {/* Button CTA */}
          <button
            onClick={() => router.push(slides[current].buttonLink)}
            className="bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-xl  transform transition-all duration-300  active:scale-95 cursor-pointer"
          >
            {slides[current].buttonText}
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group backdrop-blur-sm cursor-pointer"
          aria-label="Next slide"
        >
          <ArrowIcon className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === current ? "bg-white shadow-lg scale-110" : "bg-white/50 hover:bg-white/70"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
