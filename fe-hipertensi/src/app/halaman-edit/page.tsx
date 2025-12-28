"use client";
import React, { useState } from "react";
import { UserPen, Eye, EyeOff } from "lucide-react";

export default function EditPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mx-auto max-w-5xl my-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Title */}
        <div className="flex items-center gap-2 text-cyan-600 mb-6">
          <UserPen className="w-5 h-5 sm:w-6 sm:h-6" />
          <h1 className="text-base sm:text-lg md:text-xl font-bold">Edit Profil</h1>
        </div>

        {/* Foto Profile */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 text-black rounded-full border-2 border-[#C0BCBC] flex items-center justify-center font-bold text-3xl sm:text-4xl">G</div>
        </div>

        {/* Data User */}
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Pengguna */}
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2">Nama Pengguna</label>
              <input type="text" defaultValue="GALANG ABDEE PRASATYA" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>

            {/* Jenis Kelamin */}
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2">Jenis Kelamin</label>
              <input type="text" placeholder="Laki - Laki" disabled className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none text-gray-700 cursor-not-allowed" />
            </div>

            {/* Email */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" placeholder="galang@gmail.com" disabled className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed" />
            </div>

            {/* Kata Sandi */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Kata Sandi</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-12" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-100 lg:text-gray-400 hover:text-white lg:hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5 " />}
                </button>
              </div>
            </div>
          </div>

          {/* Button Simpan */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white px-10 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
