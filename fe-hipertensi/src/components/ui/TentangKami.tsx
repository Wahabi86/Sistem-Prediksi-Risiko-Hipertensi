"use client";
import React from "react";
import Image from "next/image";

export default function TentangKami() {
  return (
    <div className="container mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
        {/* Section Kiri */}
        <div className="flex justify-center order-1 lg:order-1">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-md aspect-square">
            <Image src="/images/logo2.png" alt="MyTenxi Illustration" fill className="object-contain" priority />
          </div>
        </div>

        {/* Section Kanan */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">TENTANG KAMI</h2>
          <div className="space-y-3 sm:space-y-4 md:space-y-5 text-base sm:text-lg md:text-xl leading-relaxed text-justify max-w-xl mx-auto lg:mx-0">
            <p>
              <span className="font-bold">MyTenxi</span> adalah platform prediksi hipertensi berbasis machine learning yang membantu mengenali risiko tekanan darah tinggi lebih awal.
            </p>

            <p>
              Kami percaya bahwa pencegahan adalah langkah pertama menuju hidup sehat. Dengan menganalisis riwayat kesehatan, gaya hidup, dan data fisik, <span className="font-bold">MyTenxi</span> memberikan hasil prediksi yang akurat dan
              mudah dipahami, sehingga Anda dapat mengambil langkah bijak untuk menjaga kesehatan secara proaktif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
