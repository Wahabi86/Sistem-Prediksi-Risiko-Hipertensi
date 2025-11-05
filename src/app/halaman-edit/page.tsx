"use client";
import React, { useState } from "react";
import { UserPen, Eye, EyeOff } from "lucide-react";

export default function EditPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mx-auto max-w-5xl my-13 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <div className="flex items-cent gap-2 text-cyan-600">
          <UserPen className="w-6 h-6" />
          <h1 className=" text-lg font-bold">Edit Profil</h1>
        </div>
        {/* Foto Profile */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 text-black rounded-full border-2 border-[#C0BCBC] flex items-center justify-center font-bold text-4xl">G</div>
        </div>
        {/* Data User */}
        <form className="space-y-5">
          {/* Nama Pengguna */}
          <div>
            <label className="block text-sm font-semibold  mb-2">Nama Pengguna</label>
            <input type="text" defaultValue="GALANG ABDEE PRASATYA" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent " />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block text-sm font-semibold mb-2">Jenis Kelamin</label>
            <input
              type="gender"
              defaultValue="Laki - Laki"
              disabled
              className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              defaultValue="galang13l@gmail.com"
              disabled
              className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent cursor-not-allowed"
            />
          </div>

          {/* Kata Sandi */}
          <div>
            <label className="block text-sm font-semibold mb-2">Kata Sandi</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Button Simpan */}
          <div className="pt-4">
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
