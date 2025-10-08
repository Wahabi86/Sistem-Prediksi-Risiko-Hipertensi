"use client";
import YouTube from "react-youtube";

export default function EdukasiPage() {
  const videoId = "bRkrRlN1q_c";

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
    <>
      {/* Section Video Edukasi */}
      <div className="flex justify-center items-center mx-4 mt-13">
        <div className="w-full max-w-7xl">
          {/* Container dengan aspect ratio 16:9 */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ paddingBottom: "40%" }}>
            <div className="absolute top-0 left-0 w-full h-full">
              <YouTube videoId={videoId} opts={opts} className="w-full h-full" iframeClassName="w-full h-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
