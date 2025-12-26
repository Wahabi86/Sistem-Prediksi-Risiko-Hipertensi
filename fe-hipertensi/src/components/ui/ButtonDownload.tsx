"use client";
import React, { useState } from "react";
import { Download } from "lucide-react";
import PdfTemplate from "./PdfTemplate";

interface RiwayatData {
  id_riwayat: string | number;
  nama_lengkap: string;
  tanggal: string;
  usia: string;
  tinggiBadan: string;
  beratBadan: string;
  bmi: number | string;
  tingkatStres: string;
  statusMerokok: string;
  waktuTidur: string;
  olahraga: string;
  riwayatTekananDarah: string;
  riwayatKeluarga: string;
  hasilPrediksi: string;
  probabilitas: string;
  faktorPendukung: string;
  panduanKesehatan: string[];
  jenis_kelamin: string;
}

interface UserData {
  nama_lengkap: string;
  jenis_kelamin?: string;
}

interface DownloadButtonProps {
  riwayat: RiwayatData;
  user: UserData | null;
}

export default function DownloadButton({ riwayat, user }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      // Tetap menggunakan riwayat.id_riwayat hanya untuk mencari elemen
      const element = document.getElementById(`pdf-content-${riwayat.id_riwayat}`);

      if (!element) {
        throw new Error("Template PDF tidak ditemukan");
      }

      const opt = {
        margin: 10,
        filename: "RiwayatPrediksi_MyTenxi.pdf", // Nama file statis & bersih
        image: { type: "jpeg", quality: 0.98 } as const,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } as const,
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          height: "0",
          overflow: "hidden",
        }}
      >
        <PdfTemplate riwayat={riwayat} user={user} id={`pdf-content-${riwayat.id_riwayat}`} />
      </div>

      <button
        onClick={handleDownload}
        type="button"
        disabled={isDownloading}
        className={`${isDownloading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:shadow-lg"} text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all font-medium cursor-pointer`}
      >
        <Download className="w-4 h-4" />
        {isDownloading ? "Menyiapkan..." : "Unduh PDF"}
      </button>
    </>
  );
}
