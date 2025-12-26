"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArrowIcon from "@/components/ui/Icons";
import ButtonPrediksi from "@/components/ui/ButtonPrediksi";
import Pertanyaan from "@/components/ui/Pertanyaan";
import Tutorial from "@/components/ui/Tutorial";
import TentangKami from "@/components/ui/TentangKami";
import { slides } from "@/data/datas";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false); // State untuk izin akses

  // LOGIKA PENGAMANAN HALAMAN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika token tidak ada, tendang ke login
      router.push("/auth/login");
    } else {
      // Jika ada, izinkan konten tampil
      setIsAuthorized(true);
    }
  }, [router]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Jangan tampilkan apapun sebelum status login terkonfirmasi (Mencegah konten terlihat sekilas)
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-4 xl:px-4">
      <div className="relative h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] rounded-xl sm:rounded-2xl shadow-lg my-6 sm:my-8 md:my-10 lg:my-12 xl:my-12 overflow-hidden">
        {/* Background image */}
        <Image src={slides[current].image} alt={slides[current].title} fill className="object-cover object-[center_30%]" priority />
        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 pr-12 sm:px-6 md:px-8 lg:px-10 xl:px-10 bg-black/40 text-white">
          <h1 className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2 sm:mb-4 md:mb-5 lg:mb-6 leading-tight drop-shadow-lg">{slides[current].title}</h1>
          {/* Only appears if there is */}
          {slides[current].subTitle && <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#93C5FD] mb-1 sm:mb-3 md:mb-4 drop-shadow-md">{slides[current].subTitle}</p>}

          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-6 md:mb-8 lg:mb-8 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl leading-relaxed drop-shadow-md">{slides[current].text}</p>

          <button
            onClick={() => router.push(slides[current].buttonLink)}
            className="bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4]
                       text-white px-4 py-2 sm:px-6 sm:py-3 md:px-7 md:py-3.5 lg:px-8 lg:py-4 rounded-lg sm:rounded-xl
                       font-bold shadow-lg transition-all duration-500 active:scale-95 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer"
          >
            {slides[current].buttonText}
          </button>
        </div>
        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-3 md:right-4 lg:right-5 top-1/2 -translate-y-1/2 w-6 sm:w-9 md:w-11 lg:w-12 h-6 sm:h-9 md:h-11 lg:h-12 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full shadow-lg flex items-center justify-center group transition-all cursor-pointer"
        >
          <ArrowIcon className="w-2.5 sm:w-4 md:w-5 h-2.5 sm:h-4 md:h-5 group-hover:scale-110 transition-transform" />
        </button>
        {/* Slide Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-5 xl:bottom-5 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 lg:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Slide ${index + 1}`}
              className={`w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 rounded-full
                          ${index === current ? "bg-white shadow-lg scale-110" : "bg-white/50 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      {/* Section About Website */}
      <TentangKami />
      {/* Section Tutorial */}
      <Tutorial />
      {/* Section FAQ */}
      <Pertanyaan />
      {/* Section CTA */}
      <ButtonPrediksi />
    </div>
  );
}
