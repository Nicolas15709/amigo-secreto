"use client";

import { useState } from "react";

type Props = {
  onPlayerCreated: (playerId: number, name: string) => void;
};

export default function NicknameForm({ onPlayerCreated }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("¡Ingresa tu nombre o apodo!");
      return;
    }

    window.dispatchEvent(new Event('startBackgroundMusic'));

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          setError("❌ Ese nombre ya está en uso, probá con otro 😊");
        } else {
          throw new Error("Error al crear jugador");
        }
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Guardamos en localStorage para no perderlo al recargar
      localStorage.setItem("playerId", data.id.toString());
      localStorage.setItem("playerName", data.name);

      // Llamamos al callback para continuar (SIN delay, directo)
      onPlayerCreated(data.id, data.name);
    } catch (err) {
      setError("Ups, algo salió mal. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      style={{
        backgroundImage: "url('/fondo1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay oscuro para mejor contraste */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Copos de nieve decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-60 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-3rem`,
              fontSize: `${Math.random() * 1 + 0.8}rem`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Formulario centrado con animaciones sutiles */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 text-center relative overflow-hidden">
          {/* Brillo decorativo superior */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 animate-shimmer" />
          
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-green-600 mb-4 animate-bounce-slow">
            ¡Bienvenido al Amigo Secreto! 🎄
          </h1>

          <p className="text-base md:text-lg text-gray-900 font-medium mb-8 md:mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Ingresa tu nombre o apodo para comenzar
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Dani, Fiore, etc."
                className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg text-gray-900 placeholder-gray-500 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all bg-white"
                disabled={loading}
                autoFocus
              />
            </div>

            {error && (
              <div className="animate-shake">
                <p className="text-red-600 font-medium text-sm md:text-base bg-red-50 py-2 px-4 rounded-lg">
                  {error}
                </p>
              </div>
            )}

            <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <button
                type="submit"
                disabled={loading || !name.trim()}
                className={`
                  w-full py-4 md:py-5 rounded-xl text-lg md:text-xl font-bold text-white shadow-lg
                  transform transition-all duration-200
                  ${loading || !name.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-green-500 hover:scale-105 hover:shadow-xl active:scale-95"
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                        fill="none"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creando...
                  </span>
                ) : (
                  "¡Jugar! 🎁"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 md:mt-10 text-4xl md:text-5xl animate-bounce-slow" style={{ animationDelay: "0.8s" }}>
            🎅✨
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fall,
          .animate-shimmer,
          .animate-fade-in-up,
          .animate-bounce-slow,
          .animate-shake {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}