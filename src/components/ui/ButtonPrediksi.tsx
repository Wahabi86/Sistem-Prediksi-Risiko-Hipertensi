"use client";
import React from "react";
import Link from "next/link";

export default function ButtonPrediksi() {
  return (
    <div className="container mx-auto my-12">
      <div className="bg-gradient-to-r from-cyan-800 to-[#0872C2] rounded-3xl py-4 px-10 flex items-center justify-between shadow-lg">
        <p className="text-white text-2xl font-medium">Ingin tau seberapa anda mengidap hipertensi?</p>
        <Link href="/form-prediksi" className="bg-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap">
          Mulai Prediksi
        </Link>
      </div>
    </div>
  );
}
