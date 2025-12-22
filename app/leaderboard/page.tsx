"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Player = {
  id: number;
  name: string;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken?: string;
  position?: number;
};

export default function LeaderboardPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [myPosition, setMyPosition] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    const name = localStorage.getItem("playerName");

    if (!playerId) {
      router.push("/start");
      return;
    }

    setPlayerName(name || "Tú");

    const loadLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        if (!res.ok) throw new Error("Error cargando ranking");
        const data: Player[] = await res.json();

        const ranked = data.map((p, index) => ({
          ...p,
          position: index + 1,
        }));

        setPlayers(ranked);

        const myPos = ranked.findIndex(p => p.id === Number(playerId)) + 1;
        setMyPosition(myPos || null);

        // Crear confetti después de cargar
        setTimeout(() => {
          createConfetti();
        }, 500);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [router]);

  const createConfetti = () => {
    const colors = ['#ef4444', '#22c55e', '#fbbf24', '#3b82f6', '#a855f7', '#ec4899'];
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-6"></div>
          <p className="text-2xl font-bold text-gray-700">Preparando el podio... 🏆</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 via-pink-50 to-green-100 flex flex-col items-center py-10 px-4 relative overflow-hidden">
      {/* Confetti cayendo */}
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="confetti-piece"
          style={{
            left: `${conf.x}%`,
            backgroundColor: conf.color,
            animationDelay: `${conf.delay}s`,
          }}
        />
      ))}

      {/* Copos de nieve decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-30 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-2rem`,
              fontSize: `${Math.random() * 1 + 0.5}rem`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Título mejorado */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 mb-2 animate-gradient">
            ¡Ranking Final!
          </h1>
          <div className="flex justify-center gap-3 text-5xl mt-2">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🏆</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎄</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
          </div>
        </div>

        {/* Tu posición destacada */}
        {myPosition && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-10 max-w-md w-full text-center border-4 border-yellow-400 animate-scale-in relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-shimmer"></div>
            <p className="text-2xl font-bold text-gray-800 mb-2">¡Tu posición!</p>
            <p className="text-6xl font-bold text-yellow-500 animate-pulse-glow">#{myPosition}</p>
            <p className="text-xl mt-2 font-bold text-gray-900">{playerName}</p>
            <p className="text-lg text-gray-600 mt-1">
              {players.find(p => p.position === myPosition)?.correctAnswers} aciertos ⭐
            </p>
          </div>
        )}

        {/* Lista del ranking */}
        <div className="w-full max-w-2xl">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`
                bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-4 flex items-center justify-between
                border-4 transition-all hover:scale-105 hover:shadow-2xl
                animate-slide-in-right
                ${player.position === 1 ? "border-yellow-500 scale-105 ring-4 ring-yellow-300" : ""}
                ${player.position === 2 ? "border-gray-400 ring-4 ring-gray-300" : ""}
                ${player.position === 3 ? "border-orange-600 ring-4 ring-orange-300" : ""}
                ${player.position === myPosition ? "border-yellow-400 ring-4 ring-yellow-300 bg-yellow-50/95" : "border-transparent"}
              `}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Posición con medalla */}
              <div className="text-center mr-4">
                <div className="text-4xl font-bold animate-bounce-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  {player.position === 1 ? "🥇" :
                   player.position === 2 ? "🥈" :
                   player.position === 3 ? "🥉" :
                   `#${player.position}`}
                </div>
              </div>

              {/* Info jugador */}
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-800">{player.name}</p>
                <p className="text-lg text-gray-600">
                  {player.correctAnswers} / {player.totalQuestions} correctas
                </p>
                {player.timeTaken && (
                  <p className="text-sm text-gray-500 mt-1">⏱️ Tiempo: {player.timeTaken}</p>
                )}
              </div>

              {/* Icono festivo */}
              <div className="text-4xl animate-float">
                {player.position === 1 ? "🎅" : "🎁"}
              </div>
            </div>
          ))}
        </div>

        {/* Botón mejorado */}
        <button
          onClick={() => router.push("/secret")}
          className="mt-12 px-12 py-6 bg-gradient-to-r from-red-600 to-green-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:scale-110 transition transform relative overflow-hidden group animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <span className="group-hover:scale-125 transition-transform">🎄</span>
            Ver mi Amigo Secreto
            <span className="group-hover:scale-125 transition-transform">🎁</span>
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>

      <style jsx>{`
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10%;
          animation: confetti-fall 4s ease-in-out infinite;
          z-index: 5;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(234, 179, 8, 0.8);
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

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
          animation-fill-mode: both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-fill-mode: both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
          animation-fill-mode: both;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}