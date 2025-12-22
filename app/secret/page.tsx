"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Secret() {
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const router = useRouter();

  const handleReveal = () => {
    if (!hasRevealed) {
      setIsRevealing(true);
      setHasRevealed(true);
      
      // La animación dura 3 segundos
      setTimeout(() => {
        setIsRevealing(false);
      }, 3000);
    }
  };

  const goToDaniSecret = () => {
    router.push("/secret/page1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-green-500 to-blue-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Snowflakes animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              fontSize: `${Math.random() * 1.5 + 1}rem`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Partículas brillantes durante la revelación */}
      {isRevealing && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className={`card-container ${isRevealing ? 'revealing' : hasRevealed ? 'revealed' : ''}`}>
        <div className="card" onClick={handleReveal}>
          {/* Parte trasera de la tarjeta (interrogación) */}
          <div className="card-back">
            <div className="question-mark">
              <span className="text-9xl">?</span>
              <p className="text-2xl mt-4 font-bold">¿Quién será?</p>
              {!hasRevealed && (
                <p className="text-lg mt-6 animate-bounce">👆 ¡Toca para revelar!</p>
              )}
            </div>
          </div>

          {/* Parte frontal de la tarjeta (persona revelada) */}
          <div className="card-front">
            <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-md w-full">
              <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-6 text-center animate-pulse">
                🎄 Mi Amigo Secreto es… 🎄
              </h1>

              <div className="relative mb-6">
                <img
                  src="/marco.jpg"
                  alt="Marcos Gallardo"
                  className="rounded-xl shadow-lg w-64 border-4 border-green-400"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg animate-bounce">
                  🎁
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 bg-yellow-100 px-6 py-3 rounded-lg shadow-md animate-fade-in">
                Marcos Gallardo
              </h2>

              <p className="text-gray-600 mt-4 text-center text-sm sm:text-base">
                ¡Feliz Navidad! Espero que hayan disfrutado del Quiz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para ver el amigo secreto de Dani */}
      {hasRevealed && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-50">
          <button
            onClick={goToDaniSecret}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 text-sm sm:text-base font-semibold animate-bounce-slow"
          >
            🎁 Y el amigo secreto de Dani es... →
          </button>
        </div>
      )}

      <style jsx>{`
        /* Snowflakes */
        .snowflake {
          position: absolute;
          color: white;
          animation: fall linear infinite;
          user-select: none;
          pointer-events: none;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Sparkles durante revelación */
        .sparkle {
          position: absolute;
          font-size: 1.5rem;
          animation: sparkle-anim 2s ease-in-out infinite;
          user-select: none;
          pointer-events: none;
        }

        @keyframes sparkle-anim {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
          }
        }

        /* Container de la tarjeta */
        .card-container {
          perspective: 1500px;
          width: 100%;
          max-width: 32rem;
        }

        /* La tarjeta en sí */
        .card {
          position: relative;
          width: 100%;
          height: 600px;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .card:hover:not(.card-container.revealing .card):not(.card-container.revealed .card) {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        /* Estado revelando: gira múltiples veces */
        .card-container.revealing .card {
          animation: spin-reveal 3s ease-in-out;
        }

        @keyframes spin-reveal {
          0% {
            transform: rotateY(0deg) scale(0.8);
          }
          50% {
            transform: rotateY(540deg) scale(1.1);
          }
          100% {
            transform: rotateY(900deg) scale(1);
          }
        }

        /* Estado revelado: muestra la parte frontal */
        .card-container.revealed .card {
          transform: rotateY(900deg);
        }

        /* Ambas caras de la tarjeta */
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
        }

        /* Parte trasera (signo de interrogación) */
        .card-back {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: rotateY(0deg);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .question-mark {
          text-align: center;
          color: white;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          animation: pulse-question 1.5s ease-in-out infinite;
        }

        @keyframes pulse-question {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        /* Parte frontal (persona revelada) */
        .card-front {
          transform: rotateY(180deg);
        }

        /* Fade in animation */
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        /* Animación suave de bounce */
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .card {
            height: 550px;
          }
        }
      `}</style>
    </div>
  );
}