"use client";
import React from "react";
import { X, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import HasilPdf from "./HasilPdf";

interface PredictionResult {
  status: string;
  probability: string;
  factor_supporting: string;
  health_guidelines: string[];
}

interface FormData {
  tinggiBadan: string;
  beratBadan: string;
  tingkatStres: string;
  riwayatTekananDarah: string;
  waktuTidur: string;
  riwayatKeluarga: string;
  olahraga: string;
  statusMerokok: string;
  gender: string;
  usia: string;
}

interface PopupHasilProps {
  onClose: () => void;
  result: PredictionResult;
  inputData: FormData; // Menangkap data form
  bmiValue: string; // Menangkap nilai BMI
}

export default function PopupHasil({ onClose, result, inputData, bmiValue }: PopupHasilProps) {
  const router = useRouter();

  // warna dan teks berdasarkan hasil prediksi
  const isHypertension = result.status === "Terdeteksi Hipertensi";
  const resultTextColor = isHypertension ? "text-red-600" : "text-green-600";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#f9fafb] rounded-2xl shadow-xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl p-4 sm:p-6 md:p-8 relative">
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        {/* Konten */}
        <div className="space-y-5">
          {/* Judul */}
          <div className="text-center">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 leading-snug">
              Hasil Prediksi : <span className={`font-bold ${resultTextColor}`}>{result.status}</span>
            </h2>
          </div>

          {/* Probabilitas */}
          <div className="flex justify-center">
            <p className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-xs sm:text-sm font-medium">
              Probabilitas Risiko: <span className="font-bold">{result.probability}</span>
            </p>
          </div>

          {/* Faktor Risiko */}
          <div className="bg-gradient-to-r from-cyan-800 to-[#0872C2] text-white rounded-xl p-4 sm:p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">Faktor Risiko :</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-justify">{result.factor_supporting}</p>
            </div>
            <div className="border-t border-white/20"></div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">Panduan Kesehatan :</h3>
              <div className="space-y-2">
                {result.health_guidelines.map((text, index) => (
                  <div key={index} className="text-xs sm:text-sm leading-relaxed text-justify">
                    {index === 0 ? (
                      <p className="mb-2 font-medium">{text}</p>
                    ) : (
                      <div className="flex gap-2 pl-2">
                        <span className="text-cyan-300 flex-shrink-0">•</span>
                        <span>{text}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tombol Unduh & Edukasi */}
          <div className="text-center space-y-3">
            {/* Komponen Download PDF Otomatis */}
            <PDFDownloadLink document={<HasilPdf data={inputData} result={result} bmi={bmiValue} />} fileName={`Hasil_MyTenxi_${new Date().getTime()}.pdf`}>
              {({ loading }) => (
                <button disabled={loading} className="flex items-center justify-center mx-auto border border-gray-300 rounded-full px-5 py-2.5 text-xs sm:text-sm hover:bg-gray-100 transition disabled:opacity-50">
                  <Download size={16} className="mr-2" />
                  {loading ? "Menyiapkan PDF..." : "Unduh PDF"}
                </button>
              )}
            </PDFDownloadLink>

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
