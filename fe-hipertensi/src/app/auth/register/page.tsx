"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthStyle from "@/components/ui/AuthStyle";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Section Kiri */}
      <AuthStyle />

      {/* Section Kanan */}
      <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-4 sm:space-y-6 md:space-y-8">
          {/* Logo untuk Mobile & Tablet (hidden di desktop) */}
          <div className="lg:hidden text-center mb-3 sm:mb-6">
            <div className="flex justify-center mb-2 sm:mb-4">
              <Image src="/images/logo.png" alt="MyTenxi Logo" width={120} height={120} className="object-contain sm:w-[120px] sm:h-[120px]" priority />
            </div>
            <h1 className="text-cyan-700 text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">MyTenxi</h1>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">BUAT AKUN</h2>
          </div>

          {/* Form */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Nama Lengkap */}
            <div>
              <label htmlFor="name" className="block text-base sm:text-lg font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                placeholder="Masukkan Nama Lengkap"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label htmlFor="gender" className="block text-base sm:text-lg font-semibold mb-2">
                Jenis Kelamin
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled hidden>
                  Pilih Jenis Kelamin
                </option>
                <option value="Laki-laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

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

            {/* Tombol Daftar */}
            <div className="text-center pt-1 sm:pt-2">
              <Link
                href="/beranda"
                className="inline-block text-center bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white font-semibold py-2.5 sm:py-3 px-8 sm:px-12 text-sm sm:text-base rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Daftar
              </Link>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm sm:text-base text-gray-600 pt-1 sm:pt-2">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200 underline-offset-2 hover:underline">
                Masuk
              </Link>{" "}
              sekarang
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
