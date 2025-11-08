"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import AuthStyle from "@/components/ui/AuthStyle";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Section Kiri */}
      <AuthStyle />

      {/* Section Kanan */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-5xl font-bold text-center">Mulai Sekarang</h2>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-semibold  mb-2">
                Email
              </label>
              <input type="email" placeholder="Masukkan Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
            </div>

            {/* Kata Sandi */}
            <div>
              <label className="block text-lg font-semibold mb-2">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Masukkan kata sandi"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Masuk */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-block text-center bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white font-semibold py-3 px-12 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Masuk
              </Link>
            </div>

            {/* Register */}
            <p className="text-center text-gray-600">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200">
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
