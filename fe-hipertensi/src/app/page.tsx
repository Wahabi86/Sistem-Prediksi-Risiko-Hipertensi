"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WelcomePage() {
  // State untuk menentukan tujuan tombol (Default ke login)
  const [destination, setDestination] = useState("/auth/login");

  useEffect(() => {
    // Cek apakah user sudah login (ada token)
    const token = localStorage.getItem("token");
    if (token) {
      // Jika sudah login, tombol akan mengarah langsung ke Beranda
      setDestination("/beranda");
    }
  }, []);

  return (
    <main className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-cyan-800 to-[#0872C2] px-4 text-white relative overflow-hidden">
      {/* Container utama */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-xs sm:text-sm md:text-base font-bold tracking-[0.4em] uppercase text-cyan-200/80 block">Selamat Datang</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-lg leading-none">MyTenxi</h1>
          <div className="flex justify-center items-center gap-4 pt-2">
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light text-white/60">Smart Health Solution</span>
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-white/40" />
          </div>
        </div>

        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-[220px] md:h-[220px] relative">
            <Image src="/images/logo.png" alt="MyTenxi Logo" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-2xl px-4 sm:px-6">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-center font-normal opacity-95 text-white/95">
            MyTenxi adalah platform prediksi risiko hipertensi berbasis machine learning yang membantu melakukan deteksi dini tekanan darah tinggi dengan lebih mudah.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2 sm:pt-4">
          <Link
            href={destination} // Menggunakan variable destination yang dinamis
            className="inline-flex items-center justify-center px-12 sm:px-16 py-3.5 border-2 border-white/90 rounded-2xl text-base sm:text-lg font-semibold tracking-wide hover:bg-white hover:text-cyan-800 transition-all duration-300 shadow-lg active:scale-95"
          >
            <span className="relative">Lanjutkan</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
