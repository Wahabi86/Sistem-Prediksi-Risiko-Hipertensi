"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthStyle from "@/components/ui/AuthStyle";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Section Kiri */}
      <AuthStyle />

      {/* Section Kanan */}
      <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Logo untuk Mobile & Tablet (hidden di desktop) */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex justify-center mb-4">
              <Image src="/images/logo.png" alt="MyTenxi Logo" width={120} height={120} className="object-contain" priority />
            </div>
            <h1 className="text-cyan-700 text-3xl sm:text-4xl font-bold tracking-wide">MyTenxi</h1>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight">MULAI SEKARANG</h2>
          </div>

          {/* Form */}
          <div className="space-y-5 sm:space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-base sm:text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan Email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Kata Sandi */}
            <div>
              <label htmlFor="password" className="block text-base sm:text-lg font-semibold mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Masuk */}
            <div className="text-center pt-2">
              <Link
                href="/beranda"
                className="inline-block text-center bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white font-semibold py-2.5 sm:py-3 px-8 sm:px-12 text-sm sm:text-base rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Masuk
              </Link>
            </div>

            {/* Register */}
            <p className="text-center text-sm sm:text-base text-gray-600 pt-2">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200 underline-offset-2 hover:underline">
                Daftar
              </Link>{" "}
              sekarang
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
