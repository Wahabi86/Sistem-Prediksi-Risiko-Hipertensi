import React from "react";
import Image from "next/image";

export default function AuthStyle() {
  return (
    <>
      <div className="relative bg-gradient-to-r from-cyan-800 to-[#0872C2] hidden lg:flex items-center justify-center p-12 overflow-hidden">
        {/* Lingkaran UI */}
        <div className="absolute top-13 left-12 w-44 h-44 bg-[#f9fafb] rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)]"></div>
        <div className="absolute top-43 left-56 w-20 h-20 bg-[#f9fafb] rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.5)]"></div>
        <div className="absolute -top-25 -right-22 w-72 h-72 bg-[#f9fafb] rounded-full shadow-[inset_0_5px_15px_rgba(0,0,0,0.6)]"></div>
        <div className="absolute -bottom-10 -left-15 w-60 h-60 bg-[#f9fafb] rounded-full shadow-[inset_0_5px_15px_rgba(0,0,0,0.6)]"></div>

        {/* Logo */}
        <div className="relative z-10 text-center">
          <div
            className="h-90 mx-auto flex items-center justify-center "
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8))",
            }}
          >
            <Image src="/images/logo.png" alt="MyTenxi Logo" width={350} height={350} className="object-contain" priority />
          </div>

          <h1 className="text-white text-7xl font-bold tracking-wide">MyTenxi</h1>
        </div>
      </div>
    </>
  );
}
