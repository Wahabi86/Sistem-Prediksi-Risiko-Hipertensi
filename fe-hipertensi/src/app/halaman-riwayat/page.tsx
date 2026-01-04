"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileTextIcon } from "@/components/ui/Icons";
import DownloadButton from "@/components/ui/ButtonDownload";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Riwayat {
  id_riwayat: number;
  nama_lengkap: string;
  tanggal: string;
  hasilPrediksi: string;
  probabilitas: string;
  faktorPendukung: string;
  panduanKesehatan: string[];
  kondisi: string[];
  usia: string;
  tinggiBadan: string;
  beratBadan: string;
  bmi: string;
  tingkatStres: string;
  waktuTidur: string;
  olahraga: string;
  statusMerokok: string;
  riwayatTekananDarah: string;
  riwayatKeluarga: string;
  jenis_kelamin: string;
}
interface UserData {
  id_users: number;
  nama_lengkap: string;
  jenis_kelamin: string;
}

export default function RiwayatPage() {
  const router = useRouter();
  const [datasRiwayat, setDatasRiwayat] = useState<Riwayat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Logic untuk mengatasi user yang tidak mempunyai token
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // Jika token tidak ada arahkan ke login
    if (!token || !storedUser) {
      router.push("/auth/login");
      return;
    }

    // Jika ada izinkan konten tampil
    setIsAuthorized(true);
    const user: UserData = JSON.parse(storedUser);
    setUserData(user);

    // Pastikan id_users ada sebelum panggil axios
    if (!user.id_users) {
      console.error("ID User tidak ditemukan. Silakan login ulang.");
      setIsLoading(false);
      return;
    }

    axios
      .get<Riwayat[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/riwayat/${user.id_users}`, {
        headers: {
          // Sesuaikan format 'Bearer' dengan yang diminta backend Anda
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDatasRiwayat(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/auth/login");
        }
        console.error("Gagal mengambil riwayat:", err);
        setIsLoading(false);
      });
  }, [router]);

  // Jangan tampilkan apapun sebelum status login terkonfirmasi
  if (!isAuthorized || isLoading) {
    return <div className="text-center py-20">Memuat Riwayat...</div>;
  }

  return (
    <div className="container mx-auto px-4 my-8">
      {datasRiwayat.length > 0 ? (
        <>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">Riwayat Prediksi</h1>

          <div className="space-y-6">
            {datasRiwayat.map((riwayat, index) => {
              const uniqueKey = riwayat.id_riwayat || `riwayat-fallback-${index}`;
              return (
                <div key={uniqueKey} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-cyan-600">
                  {/* Tanggal */}
                  <div className="text-sm font-semibold text-gray-600 mb-3">{riwayat.tanggal}</div>

                  <div className="space-y-4">
                    {/* Hasil */}
                    <p>
                      <span className="font-semibold">Hasil Prediksi:</span>
                      <span className={`ml-2 font-bold ${riwayat.hasilPrediksi === "Terdeteksi Hipertensi" ? "text-red-600" : "text-green-600"}`}>{riwayat.hasilPrediksi}</span>
                    </p>

                    {/* Probabilitas */}
                    <p>
                      <span className="font-semibold">Probabilitas:</span> {riwayat.probabilitas}
                    </p>

                    {/* Kondisi */}
                    <div>
                      <p className="font-semibold mb-2">Kondisi yang Dialami:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                        {riwayat.kondisi.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Faktor Risiko */}
                    <div>
                      <p className="font-semibold mb-1">Faktor Risiko:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{riwayat.faktorPendukung}</p>
                    </div>

                    {/* Tombol Unduh PDF */}
                    <div className="mt-4">
                      <DownloadButton riwayat={riwayat} user={userData} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        // Jika belum ada riwayat
        <div className="text-center bg-white p-10 rounded-xl shadow">
          <FileTextIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 mb-4">Belum ada riwayat prediksi.</p>
          <Link href="/form-prediksi" className="inline-block bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white px-6 py-2 rounded-lg transition">
            Mulai Prediksi
          </Link>
        </div>
      )}
    </div>
  );
}
