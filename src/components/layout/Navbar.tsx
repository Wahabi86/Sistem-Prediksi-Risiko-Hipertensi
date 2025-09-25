"use client";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <nav className="bg-gradient-to-r from-cyan-800 to-[#0872C2] shadow-xl sticky top-0 z-50 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-slate-300 transition-colors">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="font-bold text-lg md:text-xl tracking-wider">HIPERTENSI</span>
            </Link>
            <div className="space-x-6 font-bold text-lg">
              <Link href="/">
                <span className="hover:text-blue-200 transition-colors">Home</span>
              </Link>
              <Link href="/halaman-edukasi">
                <span className="hover:text-blue-200 transition-colors">Edukasi</span>
              </Link>
              <Link href="/halaman-riwayat">
                <span className="hover:text-blue-200 transition-colors">Riwayat</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
