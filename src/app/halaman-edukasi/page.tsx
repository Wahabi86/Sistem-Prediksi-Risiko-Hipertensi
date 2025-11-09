"use client";
import VideoEdukasi from "@/components/ui/VideoEdukasi";
import { dataPendukung } from "@/data/datas";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function EdukasiPage() {
  const videoId = "bRkrRlN1q_c";

  return (
    <div className="min-h-screen">
      {/* Tampilan video edukasi */}
      <VideoEdukasi videoId={videoId} />

      {/* Section Informasi Tambahan (Buku,Jurnal,Artikel) */}
      <div className="container mx-auto my-12 px-4">
        <h1 className="text-3xl font-bold mb-4">REFERENSI & BACAAN</h1>

        <div className="space-y-8">
          {dataPendukung.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>

              <p className="leading-relaxed mb-4 text-lg text-justify">{item.description}</p>

              <Link href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200 text-lg">
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
