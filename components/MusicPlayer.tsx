"use client";

import { useState, useRef, useEffect } from "react";

// Variable global para compartir estado entre instancias
let globalAudioRef: HTMLAudioElement | null = null;
let globalIsPlaying = false;

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Asignar referencia global
    if (audioRef.current) {
      globalAudioRef = audioRef.current;
    }

    // Escuchar evento custom para iniciar música
    const handleStartMusic = () => {
      if (audioRef.current && !globalIsPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          globalIsPlaying = true;
        }).catch(() => {
          console.log("No se pudo reproducir el audio");
        });
      }
    };

    window.addEventListener('startBackgroundMusic', handleStartMusic);

    return () => {
      window.removeEventListener('startBackgroundMusic', handleStartMusic);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      globalIsPlaying = false;
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      globalIsPlaying = true;
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/sonido2.mp3" 
        loop 
        preload="auto"
      />
      
      <button
        onClick={toggleMusic}
        className="fixed top-20 right-1 z-50 group"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        <div className="relative">
          {/* Círculo principal con animación de pulso */}
          <div className={`
            w-12 h-12 md:w-14 md:h-14 rounded-full 
            bg-gradient-to-br from-red-500 via-pink-500 to-green-500
            flex items-center justify-center
            shadow-lg hover:shadow-xl
            transform transition-all duration-300
            hover:scale-110 active:scale-95
            ${isPlaying ? 'animate-pulse-slow' : ''}
          `}>
            {/* Ícono */}
            <span className="text-xl md:text-2xl filter drop-shadow-md">
              {isPlaying ? '🎵' : '🔇'}
            </span>
          </div>

          {/* Anillos de ondas cuando está reproduciéndose */}
          {isPlaying && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-75" />
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isPlaying ? 'Pausar música 🎵' : 'Reproducir música 🎶'}
        </div>
      </button>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow,
          .animate-ping {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}