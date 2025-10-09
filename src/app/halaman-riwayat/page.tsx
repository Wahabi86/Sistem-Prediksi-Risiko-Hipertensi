"use client";
import { DownloadIcon, FileTextIcon } from "@/components/ui/Icons";
import Link from "next/link";

export default function RiwayatPage() {
  const datasRiwayat = [
    {
      id: 1,
      tanggal: "20/01/2025",
      gejala: "Tingkat stres tinggi, waktu tidur kurang dari 5 jam, jarang olahraga, perokok aktif",
      hasilPrediksi: "Berisiko Hipertensi",
      probabilitas: "82%",
      faktorPendukung: "Usia 40-49 tahun, riwayat keluarga ada hipertensi, BMI obesitas (32.5)",
    },
    {
      id: 2,
      tanggal: "10/05/2025",
      gejala: "Tingkat stres sedang, waktu tidur 5-6 jam, olahraga 3-4 kali per minggu,tidak merokok",
      hasilPrediksi: "Tidak Berisiko Hipertensi",
      probabilitas: "15%",
      faktorPendukung: "Usia 20-29 tahun, BMI normal (22.1)",
    },
    {
      id: 3,
      tanggal: "9/09/2025",
      gejala: "Tingkat stress sedang, waktu tidur 5-6 jam, olahraga 5 kali per minggu, mantan perokok",
      hasilPrediksi: "Berisiko Hipertensi",
      probabilitas: "60%",
      faktorPendukung: "Usia 40-49 tahun, riwayat keluarga ada penyakit jantung, BMI obesitas (37.5)",
    },
  ];

  const handlePdf = (id: number) => {
    alert("Berhasil Di Download");
  };

  return (
    <>
      {/* Header */}
      <div className="container mx-auto px-4 my-13 max-w-7xl">
        {datasRiwayat.length > 0 && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Riwayat Prediksi</h1>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6 pb-13">
          {datasRiwayat.map((riwayat) => (
            <div key={riwayat.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              {/* Riwayat Content */}
              <div className="text-sm text-gray-500 mb-4">{riwayat.tanggal}</div>
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-semibold text-gray-800 min-w-[180px]">Gejala :</span>
                  <span className="text-gray-700">{riwayat.gejala}</span>
                </div>

                <div className="flex">
                  <span className="font-semibold text-gray-800 min-w-[180px]">Hasil Prediksi :</span>
                  <span className="text-gray-700">{riwayat.hasilPrediksi}</span>
                </div>

                <div className="flex">
                  <span className="font-semibold text-gray-800 min-w-[180px]">Probabilitas :</span>
                  <span className="text-gray-700">{riwayat.probabilitas}</span>
                </div>

                <div className="flex">
                  <span className="font-semibold text-gray-800 min-w-[180px]">Faktor Pendukung :</span>
                  <span className="text-gray-700">{riwayat.faktorPendukung}</span>
                </div>

                {/* Button Download PDF */}
                <div className="mt-6 flex justify-end">
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

        {/* Content jika belum ada data */}
        {datasRiwayat.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-md text-center">
            <FileTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Riwayat</h3>
            <p className="text-gray-600 mb-6">Anda belum melakukan prediksi hipertensi</p>
            <Link href="/form-prediksi" className="inline-block bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Mulai Prediksi
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
