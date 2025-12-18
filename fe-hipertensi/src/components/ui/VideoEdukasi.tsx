"use client";
import React from "react";
import YouTube from "react-youtube";

interface VideoEdukasiProps {
  videoId: string;
}

export default function VideoEdukasi({ videoId }: VideoEdukasiProps) {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0, // mengatur agar tidak autoplay
      controls: 1, // tampilkan tombol kontrol
      rel: 0, // menghilangkan rekomendasi video lain
      modestbranding: 1, // hilangkan branding YouTube
    },
  };

  return (
    <div className="flex justify-center items-center px-4 mt-4 sm:mt-8">
      <div className="container mx-auto px-4">
        {/* Judul video */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">Edukasi Hipertensi</h1>

        {/* Tampilan Mobile */}
        <div className="block sm:hidden rounded-2xl overflow-hidden shadow-2xl aspect-video">
          <YouTube videoId={videoId} opts={opts} className="w-full h-full" iframeClassName="w-full h-full rounded-2xl" />
        </div>

        {/* Tampilan Dekstop/Tablet */}
        <div className="hidden sm:block relative overflow-hidden rounded-2xl shadow-2xl" style={{ paddingBottom: "40%" }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <YouTube videoId={videoId} opts={opts} className="w-full h-full" iframeClassName="w-full h-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
