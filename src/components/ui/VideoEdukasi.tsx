"use client";
import React from "react";
import YouTube from "react-youtube";

interface VideoEdukasiProps {
  videoId: string;
}

export default function VideoEdukasi({ videoId }: VideoEdukasiProps) {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0, // mengatur agar tidak autoplay
      controls: 1, // tampilkan tombol kontrol
      rel: 0, // menghilangkan rekomendasi video lain
      modestbranding: 1, // hilangkan branding YouTube
    },
  };

  return (
    <div className="flex justify-center items-center mx-4 mt-12">
      <div className="container mx-auto px-4">
        {/* Judul video */}
        <h1 className="text-3xl font-bold mb-4">VIDEO EDUKASI HIPERTENSI</h1>

        {/* Container video */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ paddingBottom: "35%" }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <YouTube videoId={videoId} opts={opts} className="w-full h-full" iframeClassName="w-full h-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
