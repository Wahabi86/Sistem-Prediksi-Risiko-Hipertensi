"use client";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

interface VideoEdukasiProps {
  videoId: string;
}

interface VideoData {
  title: string;
  channelTitle: string;
  publishedAt: string;
}

export default function VideoEdukasi({ videoId }: VideoEdukasiProps) {
  const [videoData, setVideoData] = useState<VideoData | null>(null);

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

  // Ambil data video otomatis dari YouTube Data API
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const snippet = data.items[0].snippet;
          setVideoData({
            title: snippet.title,
            channelTitle: snippet.channelTitle,
            publishedAt: new Date(snippet.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data video:", error);
      }
    };
    fetchVideoData();
  }, [videoId]);

  return (
    <div className="flex justify-center items-center mx-4 mt-13">
      <div className="w-full max-w-7xl">
        {/* Judul & info video */}
        {videoData && (
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-1">{videoData.title}</h1>
            <div className=" text-sm space-x-2">
              <span className="text-red-500 font-semibold">YouTube</span>
              <span className="text-gray-400">•</span>
              <span>{videoData.channelTitle}</span>
              <span className="text-gray-400">•</span>
              <span>{videoData.publishedAt}</span>
            </div>
          </div>
        )}

        {/* Container video */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ paddingBottom: "40%" }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <YouTube videoId={videoId} opts={opts} className="w-full h-full" iframeClassName="w-full h-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
