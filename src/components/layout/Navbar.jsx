"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { EditProfileIcon, LogoutIcon } from "@/components/ui/Icons";

export default function Navbar() {
  // mengatur user menu
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // memantau URL halaman
  const pathname = usePathname();
  console.log(pathname);

  // fungsi ketika ada perpindahan halaman
  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className="bg-gradient-to-r from-cyan-800 to-[#0872C2] shadow-xl sticky top-0 z-50 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-slate-300 transition-colors">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="font-bold text-lg md:text-xl tracking-wider">HIPERTENSI</span>
            </Link>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-8 font-bold text-lg ">
              <Link href="/">
                <span className={`hover:text-blue-200 transition-colors ${isActive("/") ? "text-blue-200 border-b-2 border-blue-200 pb-1" : "hover:text-blue-200"}`}>Home</span>
              </Link>
              <Link href="/halaman-edukasi">
                <span className={`hover:text-blue-200 transition-colors ${isActive("/halaman-edukasi") ? "text-blue-200 border-b-2 border-blue-200 pb-1" : "hover:text-blue-200"}`}>Edukasi</span>
              </Link>
              <Link href="/halaman-riwayat">
                <span className={`hover:text-blue-200 transition-colors ${isActive("/halaman-riwayat") ? "text-blue-200 border-b-2 border-blue-200 pb-1" : "hover:text-blue-200"}`}>Riwayat</span>
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex justify-end">
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="text-black bg-gray-200 w-11 h-11 rounded-full flex justify-center items-center font-bold hover:bg-gray-300 transition-colors text-xl">
                  G
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800">
                    {/* Edit Profile */}
                    <Link href="/halaman-edit" onClick={() => setUserMenuOpen(false)} className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors font-semibold">
                      <EditProfileIcon className="w-5 h-5 mr-2" />
                      Edit Profile
                    </Link>

                    {/* Logout */}
                    <button
                      type="submit"
                      onClick={() => {
                        setUserMenuOpen(false);
                        console.log("Logout Berhasil");
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition-colors font-semibold"
                    >
                      <LogoutIcon className="w-5 h-5 mr-2" />
                      Keluar
                    </button>
                  </div>
                )}
                {/* Untuk menutup user menu ketika ada click diluarnya */}
                {userMenuOpen && <button onClick={() => setUserMenuOpen(false)} className="fixed inset-0 z-[-1]"></button>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
