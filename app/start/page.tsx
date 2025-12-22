"use client";

import { useState, useEffect } from "react";
import NicknameForm from "@/components/NicknameForm";
import VideoModal from "@/components/VideoModal";
import ChristmasLoading from "@/components/ChristmasLoading";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const [showLoading, setShowLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showNickname, setShowNickname] = useState(false);
  const [hasPlayedBefore, setHasPlayedBefore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario ya jugó antes
    const playerId = localStorage.getItem("playerId");
    const playerName = localStorage.getItem("playerName");
    
    if (playerId && playerName) {
      setHasPlayedBefore(true);
    }
  }, []);

  const handleLoadingEnd = () => {
    setShowLoading(false);
    setTimeout(() => {
      setShowVideo(true);
    }, 100);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowNickname(true);
  };

  const handlePlayerCreated = () => {
    router.push("/quiz");
  };

  const goToLeaderboard = () => {
    router.push("/leaderboard");
  };

  return (
    <>
      {/* 1. Loading navideña */}
      {showLoading && <ChristmasLoading onLoaded={handleLoadingEnd} />}

      {/* 2. Video intro */}
      {!showLoading && showVideo && (
        <VideoModal onContinue={handleVideoEnd} />
      )}

      {/* 3. Nickname form con botón para leaderboard (SOLO si ya jugó antes) */}
      {!showLoading && !showVideo && showNickname && (
        <>
          <NicknameForm onPlayerCreated={handlePlayerCreated} />
          
          {/* Botón y mensaje SOLO si ya jugó antes */}
          {hasPlayedBefore && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] flex flex-col items-center gap-3 px-4 animate-fade-in">
              <p className="text-white text-center text-sm md:text-base font-semibold bg-black/70 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
                ¿Ya jugaste antes? 🎮
              </p>
              <button
                onClick={goToLeaderboard}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-base md:text-lg font-bold rounded-full shadow-2xl hover:scale-110 transition animate-pulse"
              >
                🏆 Ver Leaderboard Directo
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}