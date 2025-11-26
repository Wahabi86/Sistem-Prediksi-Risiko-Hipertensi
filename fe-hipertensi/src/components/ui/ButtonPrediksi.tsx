"use client";
import React from "react";
import Link from "next/link";

export default function ButtonPrediksi() {
  return (
    <div className="container mx-auto my-12 px-4">
      <div
        className="bg-gradient-to-r from-cyan-800 to-[#0872C2] rounded-3xl py-6 px-8 
      flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg"
      >
        <p className="text-white text-lg md:text-xl font-medium text-center md:text-left">Ingin tau seberapa anda mengidap hipertensi?</p>

        <Link
          href="/form-prediksi"
          className="bg-[#f9fafb] px-8 py-3 rounded-xl font-semibold text-base md:text-lg 
          hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
        >
          Mulai Prediksi
        </Link>
      </div>
    </div>
  );
}
