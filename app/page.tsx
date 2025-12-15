"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [videoFinished, setVideoFinished] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <video
        src="/video.mp4"
        className="w-full max-w-md rounded-lg shadow-lg"
        controls
        onEnded={() => setVideoFinished(true)}
      />

      {videoFinished && (
        <button
          onClick={() => router.push("/start")}
          className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-lg font-semibold transition"
        >
          Continuar
        </button>
      )}
    </div>
  );
}
