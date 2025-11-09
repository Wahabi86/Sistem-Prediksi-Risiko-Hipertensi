"use client";
import React from "react";
import Image from "next/image";

export default function TentangKami() {
  return (
    <div className="container mx-auto mt-24 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Section Kiri */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image src="/images/logo2.png" alt="MyTenxi Illustration" fill className="object-contain" priority />
          </div>
        </div>

        {/* Section Kanan */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">TENTANG KAMI</h2>

          <div className="space-y-5 text-xl leading-relaxed text-justify max-w-xl">
            <p>
              <span className="font-bold">MyTenxi</span> adalah platform prediksi hipertensi berbasis machine learning yang membantu mengenali risiko tekanan darah tinggi lebih awal.
            </p>

            <p>
              Kami percaya bahwa pencegahan adalah langkah pertama menuju hidup sehat. Dengan menganalisis riwayat kesehatan, gaya hidup, dan data fisik, MyTenxi memberikan hasil prediksi yang akurat dan mudah dipahami, sehingga Anda dapat
              mengambil langkah bijak untuk menjaga kesehatan secara proaktif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
