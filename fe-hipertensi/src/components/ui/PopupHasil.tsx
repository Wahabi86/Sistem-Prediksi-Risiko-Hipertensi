"use client";
import React from "react";
import { X, Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface PopupHasilProps {
  onClose: () => void;
}

export default function PopupHasil({ onClose }: PopupHasilProps) {
  const router = useRouter();

  const handlePdf = () => {
    alert("Berhasil Di Download");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl p-4 sm:p-6 md:p-8 relative">
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        {/* Konten */}
        <div className="space-y-5">
          {/* Judul */}
          <div className="text-center">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 leading-snug">
              Hasil Prediksi : <span className="font-bold text-black">Positif Hipertensi</span>
            </h2>
          </div>

          {/* Probabilitas */}
          <div className="flex justify-center">
            <p className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-xs sm:text-sm font-medium">
              Probabilitas : <span className="font-bold">98%</span>
            </p>
          </div>

          {/* Faktor Risiko */}
          <div className="bg-gradient-to-r from-cyan-800 to-[#0872C2] text-white rounded-xl p-4 sm:p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">Faktor Risiko :</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-justify">
                Risiko hipertensi meningkat pada orang yang bertambah usia atau memiliki riwayat keluarga dengan tekanan darah tinggi. Kelebihan berat badan, pola makan tinggi garam/lemak, kurang olahraga, merokok, konsumsi alkohol
                berlebihan, stres, diabetes, serta kurang tidur juga berkontribusi terhadap hipertensi.
              </p>
            </div>
            <div className="border-t border-white/20"></div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">Panduan Kesehatan :</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-justify">
                Untuk menjaga tekanan darah tetap normal, biasakan makan sehat dengan sedikit garam dan lemak. Lakukan aktivitas fisik teratur, kelola stres, tidur cukup, dan hindari merokok serta alkohol. Periksa tekanan darah secara
                berkala, terutama bila ada riwayat keluarga.
              </p>
            </div>
          </div>

          {/* Tombol Unduh & Edukasi */}
          <div className="text-center space-y-3">
            <button
              onClick={handlePdf}
              className="
                flex items-center justify-center mx-auto border border-gray-300 rounded-full px-5 py-2.5 text-xs sm:text-sm  hover:bg-gray-100 transition"
            >
              <Download size={16} className="mr-2" /> Unduh PDF
            </button>

            <button
              onClick={() => {
                onClose();
                router.push("/halaman-edukasi");
              }}
              className="
                text-cyan-600 hover:text-cyan-800 font-medium text-sm underline underline-offset-4 transition"
            >
              Pelajari Lebih Lanjut Tentang Hipertensi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
