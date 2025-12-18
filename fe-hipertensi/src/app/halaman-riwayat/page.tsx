"use client";
import { DownloadIcon, FileTextIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { datasRiwayat } from "@/data/datas";

export default function RiwayatPage() {
  const handlePdf = (id: number) => {
    alert("Berhasil Di Download");
  };

  return (
    <>
      {/* Header */}
      <div className="container mx-auto px-4 my-8">
        {datasRiwayat.length > 0 && <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">Riwayat Prediksi</h1>}

        {/* Main Content */}
        <div className="space-y-6">
          {datasRiwayat.map((riwayat) => (
            <div key={riwayat.id} className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
              {/* Tanggal */}
              <div className="text-xs sm:text-sm text-gray-500 mb-4">{riwayat.tanggal}</div>

              <div className="space-y-4">
                {/* Data */}
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-semibold text-gray-800 sm:min-w-[180px] mb-1 sm:mb-0">Gejala :</span>
                  <span className="text-gray-700 text-sm sm:text-base">{riwayat.gejala}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-semibold text-gray-800 sm:min-w-[180px] mb-1 sm:mb-0">Hasil Prediksi :</span>
                  <span className="text-gray-700 text-sm sm:text-base">{riwayat.hasilPrediksi}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-semibold text-gray-800 sm:min-w-[180px] mb-1 sm:mb-0">Probabilitas :</span>
                  <span className="text-gray-700 text-sm sm:text-base">{riwayat.probabilitas}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-semibold text-gray-800 sm:min-w-[180px] mb-1 sm:mb-0">Faktor Pendukung :</span>
                  <span className="text-gray-700 text-sm sm:text-base">{riwayat.faktorPendukung}</span>
                </div>

                {/* Button Download PDF */}
                <div className="mt-6 flex justify-center sm:justify-end">
                  <button
                    onClick={() => handlePdf(riwayat.id)}
                    className="bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Unduh PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content jika tidak ada data */}
        {datasRiwayat.length === 0 && (
          <div className="bg-white rounded-xl p-10 sm:p-12 shadow-md text-center mt-8">
            <FileTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Riwayat</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Anda belum melakukan prediksi hipertensi</p>
            <Link
              href="/form-prediksi"
              className="inline-block bg-gradient-to-r from-cyan-800 to-[#0872C2]
               hover:from-cyan-700 hover:to-[#0A7FD4] text-white px-8 py-3 rounded-lg 
               font-medium transition-all duration-200 text-sm sm:text-base"
            >
              Mulai Prediksi
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
