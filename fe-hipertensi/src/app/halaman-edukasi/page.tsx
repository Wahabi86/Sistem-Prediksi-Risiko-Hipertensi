"use client";
import VideoEdukasi from "@/components/ui/VideoEdukasi";
import { dataPendukung } from "@/data/datas";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EdukasiPage() {
  const videoId = "bRkrRlN1q_c";
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Logic untuk mengatasi user yang tidak mempunyai token
    const token = localStorage.getItem("token");
    // Jika token tidak ada arahkan ke login
    if (!token) {
      router.push("/auth/login");
    } else {
      // Jika ada izinkan konten tampil
      setIsAuthorized(true);
    }
  }, [router]);

  // Jangan tampilkan apapun sebelum status login terkonfirmasi
  if (!isAuthorized) return null;

  // Untuk mencari titik pertama di kalimat
  const getFirstSentence = (text: string): string => {
    const match = text.match(/.*?\./);
    return match ? match[0] : text;
  };

  return (
    <div className="min-h-screen">
      {/* Video edukasi */}
      <VideoEdukasi videoId={videoId} />

      {/* Section Referensi */}
      <div className="container mx-auto my-12 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">Referensi & Bacaan</h1>

        <div className="space-y-8">
          {dataPendukung.map((item, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg sm:text-2xl font-semibold mb-2">{item.title}</h2>

              {/* Tampilan Mobile */}
              <p className="leading-relaxed mb-4 text-sm text-justify block sm:hidden">{getFirstSentence(item.description)}</p>

              {/* Tampilan Dekstop/Tablet */}
              <p className="leading-relaxed mb-4 text-sm sm:text-lg text-justify hidden sm:block">{item.description}</p>

              <Link href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium text-base sm:text-lg">
                Baca selengkapnya
                <MoveRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
