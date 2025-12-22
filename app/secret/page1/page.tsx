"use client";

import { useState, useEffect } from "react";

export default function Page1() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada después de cargar
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Copos de nieve cayendo */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

      {/* Estrellas brillantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Tarjeta principal */}
      <div
        className={`relative bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 max-w-2xl w-full transform transition-all duration-1000 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {/* Decoración superior */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-red-500 to-green-500 text-white px-8 py-3 rounded-full shadow-lg text-xl sm:text-2xl font-bold animate-pulse">
            🎅 Amigo Secreto 🎅
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-8 flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-4 text-center animate-gradient">
            El Amigo Secreto de Dani es...
          </h1>

          <div className="my-8 relative group">
            {/* Glow effect alrededor de la imagen */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
            
            {/* Imagen */}
            <div className="relative">
              <img
                src="/duende.png"
                alt="Amigo secreto de Dani"
                className="rounded-2xl shadow-2xl w-72 sm:w-96 border-4 border-white transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Iconos decorativos */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-xl animate-bounce">
                <span className="text-3xl">🎁</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-red-500 rounded-full p-3 shadow-xl animate-bounce" style={{ animationDelay: "0.3s" }}>
                <span className="text-3xl">🎄</span>
              </div>
            </div>
          </div>

          {/* Mensaje misterioso */}
          <div className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 px-8 py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 mt-6">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
              ❓ ¿Quién será? ❓
            </p>
          </div>

          {/* Mensaje */}
          <p className="mt-8 text-gray-700 text-center text-base sm:text-lg max-w-md leading-relaxed">
            🎉 ¡Feliz Navidad! 🎉
            <br />
            <span className="text-purple-600 font-semibold">
              Espero que adivinen quién es tu amigo secreto.
            </span>
          </p>

          {/* Decoración inferior */}
          <div className="mt-8 flex gap-4 text-4xl animate-wiggle">
            <span>🎅</span>
            <span>🎄</span>
            <span>⛄</span>
            <span>🎁</span>
            <span>✨</span>
          </div>
        </div>

        {/* Confetti decorativo en las esquinas */}
        <div className="absolute top-4 left-4 text-3xl animate-spin-slow">🎊</div>
        <div className="absolute top-4 right-4 text-3xl animate-spin-slow" style={{ animationDirection: "reverse" }}>🎊</div>
        <div className="absolute bottom-4 left-4 text-3xl animate-bounce">🎈</div>
        <div className="absolute bottom-4 right-4 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>🎈</div>
      </div>

      <style jsx>{`
        /* Snowflakes */
        .snowflake {
          position: absolute;
          color: white;
          animation: fall linear infinite;
          user-select: none;
          pointer-events: none;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
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

        /* Stars twinkling */
        .star {
          position: absolute;
          font-size: 1.2rem;
          animation: twinkle 3s ease-in-out infinite;
          user-select: none;
          pointer-events: none;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Gradient animation for title */
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* Pulse slow */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Wiggle animation */
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        /* Slow spin */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}