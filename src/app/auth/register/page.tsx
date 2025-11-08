"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  return (
    <div className="min-h-screen">
      {/* Section Kiri */}

      {/* Section Kanan */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 text-center">Buat Akun</h2>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-lg font-semibold mb-2">Nama Lengkap</label>
              <input type="text" placeholder="Masukkan Nama Lengkap" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
            </div>
            {/* Jenis Kelamin */}
            <div>
              <label className="block text-lg font-semibold mb-2">Jenis Kelamin</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                <option value="" disabled hidden>
                  Pilih Jenis Kelamin
                </option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-semibold mb-2">Email</label>
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
            <Link
              href="/"
              className="block w-full text-center bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Daftar
            </Link>

            {/* Register */}
            <p className="text-center text-gray-600">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200">
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
