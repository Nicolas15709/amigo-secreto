"use client";

import { useRef, useState } from "react";

type Props = {
  onContinue: () => void;
};

export default function VideoModal({ onContinue }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlay = async () => {
    if (!videoRef.current) return;

    try {
      videoRef.current.muted = false;
      await videoRef.current.play();
      setIsMuted(false);
      setHasStarted(true);
    } catch (err) {
      console.error("Error al reproducir el video:", err);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Nieve */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-60 animate-snow-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`,
              fontSize: `${Math.random() * 8 + 8}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center">

        {/* CONTENEDOR VIDEO - Limitado en desktop */}
        <div className="w-full max-w-[92vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
          <video
            ref={videoRef}
            src="/intro-mobile.mp4"
            playsInline
            muted={isMuted}
            preload="auto"
            controls={false}
            onCanPlay={() => setIsLoading(false)}
            onError={handleVideoError}
            onEnded={onContinue}
            className={`w-full h-full object-contain transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* LOADING */}
        {isLoading && !videoError && (
          <p className="mt-4 text-white text-lg animate-pulse">
            Cargando video… 🎄
          </p>
        )}

        {/* ERROR */}
        {videoError && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="text-white text-lg">⚠️ Error al cargar el video</p>
            <button onClick={onContinue} className="button-continue">
              Continuar →
            </button>
          </div>
        )}

        {/* BOTÓN PLAY (DEBAJO DEL VIDEO) */}
        {!hasStarted && !videoError && !isLoading && (
          <div className="mt-6">
            <button onClick={handlePlay} className="button-play">
              <span className="icon-play">▶</span>
              <span className="text-play">Reproducir video</span>
            </button>
          </div>
        )}

        {/* BOTÓN CONTINUAR */}
        {hasStarted && !videoError && (
          <div className="mt-8 flex flex-col items-center">
            <button onClick={onContinue} className="button-continue">
              Continuar →
            </button>
            <p className="mt-3 text-white text-sm opacity-80">
              O espera que termine el video 🎄
            </p>
          </div>
        )}
      </div>

       {/* Estilos para la nieve y botones */}
      <style jsx>{`
        @keyframes snow-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-snow-fall {
          animation: snow-fall linear infinite;
        }

        /* Botón Play Video */
        .button-play {
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #0f988e;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          letter-spacing: 1px;
          padding: 0 20px;
          text-align: center;
          min-width: 180px;
          height: 60px;
          font-size: 16px;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 8px;
          outline: none;
          user-select: none;
          cursor: pointer;
          transform: translateY(0px);
          position: relative;
          box-shadow:
            inset 0 30px 30px -15px rgba(255, 255, 255, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.3),
            inset 0 1px 20px rgba(0, 0, 0, 0),
            0 5px 0 #0f988e,
            0 5px 4px rgba(0, 0, 0, 0.2),
            0 8px 15px rgba(0, 0, 0, 0.15),
            0 15px 30px rgba(0, 0, 0, 0.1);
          background: #15ccbe;
          color: white;
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
          transition: 150ms all ease-in-out;
        }

        .button-play .icon-play {
          margin-right: 12px;
          width: 32px;
          height: 32px;
          transition: all 0.5s ease-in-out;
        }

        .button-play:active {
          transform: translateY(5px);
          box-shadow:
            inset 0 16px 2px -15px rgba(0, 0, 0, 0),
            inset 0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 20px rgba(0, 0, 0, 0.1),
            0 0 0 #0f988e,
            0 0 0 2px rgba(255, 255, 255, 0.5),
            0 0 0 rgba(0, 0, 0, 0),
            0 0 0 rgba(0, 0, 0, 0);
        }

        .button-play:hover .text-play {
          transform: translateX(100px);
        }

        .button-play:hover .icon-play {
          transform: translateX(35px);
        }

        .text-play {
          transition: all 0.5s ease-in-out;
        }

        /* Botón Continuar */
        .button-continue {
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #c41e3a;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          letter-spacing: 1px;
          padding: 0 24px;
          text-align: center;
          min-width: 200px;
          height: 70px;
          font-size: 18px;
          text-transform: uppercase;
          font-weight: 700;
          border-radius: 12px;
          outline: none;
          user-select: none;
          cursor: pointer;
          transform: translateY(0px);
          position: relative;
          box-shadow:
            inset 0 30px 30px -15px rgba(255, 255, 255, 0.15),
            inset 0 0 0 1px rgba(255, 255, 255, 0.35),
            inset 0 1px 20px rgba(0, 0, 0, 0),
            0 6px 0 #c41e3a,
            0 6px 5px rgba(0, 0, 0, 0.25),
            0 10px 20px rgba(0, 0, 0, 0.2),
            0 20px 40px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #dc143c 0%, #228b22 100%);
          color: white;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
          transition: 150ms all ease-in-out;
        }

        .button-continue .icon-continue {
          margin-right: 12px;
          width: 32px;
          height: 32px;
          transition: all 0.5s ease-in-out;
        }

        .button-continue:active {
          transform: translateY(6px);
          box-shadow:
            inset 0 16px 2px -15px rgba(0, 0, 0, 0),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 20px rgba(0, 0, 0, 0.15),
            0 0 0 #c41e3a,
            0 0 0 2px rgba(255, 255, 255, 0.6),
            0 0 0 rgba(0, 0, 0, 0),
            0 0 0 rgba(0, 0, 0, 0);
        }

        .button-continue:hover .text-continue {
          transform: translateX(100px);
        }

        .button-continue:hover .icon-continue {
          transform: translateX(40px);
        }

        .text-continue {
          transition: all 0.5s ease-in-out;
        }

        @media (max-width: 640px) {
          .button-play {
            min-width: 150px;
            height: 50px;
            font-size: 14px;
          }
          .button-play .icon-play {
            width: 24px;
            height: 24px;
          }
          .button-continue {
            min-width: 170px;
            height: 60px;
            font-size: 16px;
          }
          .button-continue .icon-continue {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
}