import React from "react";
import Image from "next/image";

export default function AuthStyle() {
  return (
    <>
      <div className="relative bg-gradient-to-r from-cyan-800 to-[#0872C2] hidden lg:flex items-center justify-center p-8 lg:p-10 xl:p-12 2xl:p-16 overflow-hidden min-h-screen">
        {/* Lingkaran UI */}

        {/* Lingkaran kiri atas */}
        <div className="absolute top-8 lg:top-10 xl:top-13 left-8 lg:left-10 xl:left-12 w-32 h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44 bg-[#f9fafb] rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)]"></div>

        {/* Lingkaran tengah kiri */}
        <div className="absolute top-36 lg:top-40 xl:top-[172px] left-36 lg:left-44 xl:left-56 w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-[#f9fafb] rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.5)]"></div>

        {/* Lingkaran kanan atas */}
        <div className="absolute -top-20 lg:-top-24 xl:-top-25 -right-16 lg:-right-18 xl:-right-22 w-52 h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 bg-[#f9fafb] rounded-full shadow-[inset_0_5px_15px_rgba(0,0,0,0.6)]"></div>

        {/* Lingkaran kiri bawah */}
        <div className="absolute -bottom-8 lg:-bottom-10 xl:-bottom-10 -left-10 lg:-left-12 xl:-left-15 w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 bg-[#f9fafb] rounded-full shadow-[inset_0_5px_15px_rgba(0,0,0,0.6)]"></div>

        {/* Logo */}
        <div className="relative z-10 text-center">
          <div
            className="mx-auto flex items-center justify-center"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8))",
            }}
          >
            <Image src="/images/logo.png" alt="MyTenxi Logo" width={350} height={350} className="object-contain w-56 h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-[350px] 2xl:h-[350px]" priority />
          </div>

          <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-wide mt-3 lg:mt-4 xl:mt-4">MyTenxi</h1>
        </div>
      </div>
    </>
  );
}
