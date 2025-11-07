"use client";
import VideoEdukasi from "@/components/ui/VideoEdukasi";

export default function EdukasiPage() {
  const videoId = "bRkrRlN1q_c";

  return (
    <div className="min-h-screen">
      <VideoEdukasi videoId={videoId} />
    </div>
  );
}
