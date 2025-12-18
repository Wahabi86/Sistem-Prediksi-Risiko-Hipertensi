"use client";
import React from "react";
import { caraPenggunaan } from "@/data/datas";

export default function Tutorial() {
  return (
    <div className="container mx-auto mb-24 mt-24">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">Cara Menggunakan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        {/* Tutorial 1 & 2 */}
        {caraPenggunaan.slice(0, 2).map((item, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-lg sm:text-xl leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Tutorial 3 */}
      <div className="flex justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 w-full md:max-w-2xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">{caraPenggunaan[2].title}</h3>
          <p className="text-lg sm:text-xl leading-relaxed">{caraPenggunaan[2].description}</p>
        </div>
      </div>
    </div>
  );
}
