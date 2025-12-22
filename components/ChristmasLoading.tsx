"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  onLoaded: () => void;
};

export default function ChristmasLoading({ onLoaded }: Props) {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Animación de progreso: llega a 100% en ~4 segundos
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoaded, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Play audio
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error('Audio autoplay blocked:', err);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearInterval(interval);
    };
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-red-600 via-red-700 to-green-800 overflow-hidden px-4">
      {/* Copos de nieve cayendo mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              fontSize: `${Math.random() * 0.8 + 0.6}rem`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Texto Christmas grande y brillante */}
      <h1 className="title-text">
        🎄 Christmas Quiz 🎄
      </h1>

      {/* Loader con barra de progreso */}
      <div className="loader">
        <div className="loading-text">
          Loading<span className="dot">.</span><span className="dot">.</span>
          <span className="dot">.</span>
        </div>
        <div className="loading-bar-background">
          <div 
            className="loading-bar"
            style={{ width: `${progress}%` }}
          >
            <div className="white-bars-container">
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Porcentaje */}
      <p className="percentage-text">
        {Math.round(progress)}%
      </p>

      <button
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.play().catch(console.error);
          }
        }}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-2xl hover:scale-105 transition-transform z-10"
      >
        <span className="text-lg">🎵</span>
      </button>

      <audio ref={audioRef} src="/sonido1.mp3" loop style={{ display: 'none' }} />

      <style jsx>{`
        /* Animaciones */
        @keyframes fall {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
        /* Copos de nieve optimizados */
        .snowflake {
          position: absolute;
          top: -5vh;
          color: white;
          opacity: 0.8;
          user-select: none;
          pointer-events: none;
          animation: fall linear infinite;
          will-change: transform, opacity;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }

        /* Título principal - Mobile First */
        .title-text {
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 3rem;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          text-align: center;
        }

        /* Tablet */
        @media (min-width: 640px) {
          .title-text {
            font-size: 4rem;
            margin-bottom: 4rem;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .title-text {
            font-size: 5rem;
            margin-bottom: 5rem;
          }
        }

        /* Loader container */
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          max-width: 90vw;
        }

        /* Loading text */
        .loading-text {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          text-align: center;
        }

        @media (min-width: 640px) {
          .loading-text {
            font-size: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .loading-text {
            font-size: 1.75rem;
          }
        }

        .dot {
          margin-left: 0.2rem;
          animation: blink 1.5s infinite;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.3s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 0.6s;
        }

        /* Loading bar background - Responsive */
        .loading-bar-background {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0.3rem;
          width: 90%;
          max-width: 18rem;
          height: 2rem;
          background-color: #1a5f1a;
          box-shadow: #0c0c0c -2px 2px 4px 0px inset;
          border-radius: 1rem;
        }

        @media (min-width: 640px) {
          .loading-bar-background {
            max-width: 22rem;
            height: 2.25rem;
          }
        }

        @media (min-width: 1024px) {
          .loading-bar-background {
            max-width: 25rem;
            height: 2.5rem;
          }
        }

        /* Loading bar */
        .loading-bar {
          position: relative;
          display: flex;
          justify-content: center;
          flex-direction: column;
          height: 1.4rem;
          overflow: hidden;
          background: linear-gradient(
            0deg,
            rgba(222, 74, 15, 1) 0%,
            rgba(249, 199, 79, 1) 100%
          );
          border-radius: 0.7rem;
          transition: width 0.3s ease-out;
        }

        @media (min-width: 640px) {
          .loading-bar {
            height: 1.65rem;
            border-radius: 0.825rem;
          }
        }

        @media (min-width: 1024px) {
          .loading-bar {
            height: 1.9rem;
            border-radius: 0.95rem;
          }
        }

        /* White bars animation */
        .white-bars-container {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .white-bars-container {
            gap: 1.2rem;
          }
        }

        .white-bar {
          background: linear-gradient(
            -45deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          width: 0.5rem;
          height: 2.5rem;
          opacity: 0.3;
          transform: rotate(45deg);
        }

        @media (min-width: 640px) {
          .white-bar {
            width: 0.625rem;
            height: 2.8rem;
          }
        }

        /* Percentage text */
        .percentage-text {
          font-size: 2rem;
          color: white;
          font-weight: bold;
          margin-top: 1.5rem;
          text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 640px) {
          .percentage-text {
            font-size: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .percentage-text {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}