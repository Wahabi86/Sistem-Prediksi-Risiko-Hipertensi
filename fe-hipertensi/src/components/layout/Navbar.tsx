"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogoutIcon } from "@/components/ui/Icons";
import { UserPen, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  // Mengatur user menu
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // Mengatur user menu saat bagian mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Memantau URL halaman
  const pathname = usePathname();

  // Menutup menu saat berpindah halaman
  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/beranda", label: "Beranda" },
    { href: "/halaman-edukasi", label: "Edukasi" },
    { href: "/halaman-riwayat", label: "Riwayat" },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-cyan-800 to-[#0872C2] shadow-xl sticky top-0 z-50 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Section mobile menu toggle di sebelah kiri */}
            <div className="flex items-center space-x-3">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden text-white hover:text-blue-200 transition-colors">
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <Link href="/beranda" className="flex items-center space-x-2 flex-shrink-0">
                <div className="bg-white rounded-full p-1">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
                </div>
              </Link>
            </div>

            {/* Section untuk navigasi pada tablet & desktop */}
            <div className="hidden sm:flex items-center space-x-4 sm:space-x-6 lg:space-x-8 font-bold text-base sm:text-lg">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`hover:text-blue-200 transition-colors ${isActive(link.href) ? "text-blue-200 border-b-2 border-blue-200 pb-1" : ""}`}>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="text-black bg-gray-200 w-11 h-11 rounded-full flex justify-center items-center font-bold hover:bg-gray-300 transition-colors text-xl">
                G
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800 z-50">
                  {/* Edit Profile */}
                  <Link href="/halaman-edit" onClick={() => setUserMenuOpen(false)} className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors font-semibold">
                    <UserPen className="w-5 h-5 mr-2" />
                    Edit Profil
                  </Link>
                  {/* Logout */}
                  <Link
                    href="/auth/login"
                    onClick={() => {
                      setUserMenuOpen(false);
                      console.log("Logout Berhasil");
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition-colors font-semibold"
                  >
                    <LogoutIcon className="w-5 h-5 mr-2" />
                    Keluar
                  </Link>
                </div>
              )}
              {/* Untuk menutup user menu ketika ada click diluarnya */}
              {userMenuOpen && <button onClick={() => setUserMenuOpen(false)} className="fixed inset-0 z-40"></button>}
            </div>
          </div>
        </div>
      </nav>

      {/* Section Mobile Menu */}
      <div className="sm:hidden">
        <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-cyan-800 to-[#0872C2] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-1">
                <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
              </div>
              <span className="text-white font-bold text-lg">Menu</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigasi links */}
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <div className={`flex items-center px-4 py-3 rounded-lg font-semibold text-white transition-colors ${isActive(link.href) ? "bg-white/20 border-l-4 border-white" : "hover:bg-white/20"}`}>{link.label}</div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
