"use client";

import { useEffect, useState } from "react";
import QuestionCard from "@/components/QuestionCard";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  text: string;
  options: string[];
  correct: string;
};

export default function QuizPage() {
  const router = useRouter();
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // 🎬 Estados para animaciones
  const [isEntering, setIsEntering] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const id = localStorage.getItem("playerId");
    const name = localStorage.getItem("playerName");

    if (!id || !name) {
      router.push("/start");
      return;
    }

    setPlayerId(Number(id));
    setPlayerName(name);

    const loadQuestions = async () => {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data);
      setLoading(false);
      
      // Activar animación de entrada después de cargar
      setTimeout(() => setIsEntering(false), 100);
    };

    loadQuestions();
  }, [router]);

  const handleAnswer = async (selected: string) => {
    if (!playerId || isTransitioning) return;

    const question = questions[currentIndex];
    const isCorrect = selected === question.correct;

    // Iniciar animación de salida
    setIsTransitioning(true);
    setDirection("left");

    await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId: Number(playerId),
        questionId: Number(question.id),
        selected,
        isCorrect,
      }),
    });

    // Esperar a que termine la animación de salida
    setTimeout(async () => {
      // Si es la última pregunta
      if (currentIndex === questions.length - 1) {
        await fetch(`/api/finish/${playerId}`, {
          method: "POST",
        });
        router.push("/leaderboard");
        return;
      }

      // Cambiar a la siguiente pregunta
      setCurrentIndex(prev => prev + 1);
      setDirection("right");
      
      // Pequeño delay para que se vea la entrada
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 500); // Duración de la animación de salida
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-green-100 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-4">🎄</div>
          <p className="text-xl font-semibold text-gray-700">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-green-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Cargando pregunta... 🎄</p>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 via-pink-50 to-green-100 flex flex-col overflow-hidden">
      {/* BARRA DE PROGRESO ÉPICA CON SANTA */}
      <div className="w-full bg-gradient-to-b from-blue-900 via-blue-800 to-transparent relative overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        {/* Estrellas de fondo */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="relative h-20 md:h-24">
          {/* Fondo con nieve */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30" />
          
          {/* Línea de progreso brillante */}
          <div 
            className="absolute bottom-8 left-0 h-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 transition-all duration-700 ease-out rounded-r-full shadow-lg"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(250, 204, 21, 0.8), 0 0 40px rgba(250, 204, 21, 0.4)'
            }} 
          >
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-fast" />
          </div>

          {/* SANTA EN SU TRINEO */}
          <div 
            className="absolute bottom-2 transition-all duration-700 ease-out"
            style={{ 
              left: `calc(${progress}% - 80px)`,
              transform: 'translateY(-50%)',
            }}
          >
            {/* Rastro de estrellas */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex gap-2 animate-pulse">
              <span className="text-yellow-300 text-lg animate-twinkle">✨</span>
              <span className="text-yellow-300 text-sm animate-twinkle" style={{ animationDelay: '0.2s' }}>✨</span>
              <span className="text-yellow-300 text-xs animate-twinkle" style={{ animationDelay: '0.4s' }}>✨</span>
            </div>

            {/* Renos tirando ADELANTE */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="text-3xl md:text-4xl animate-bounce-smooth">🦌</span>
              <span className="text-2xl animate-bounce-smooth" style={{ animationDelay: '0.1s' }}>🦌</span>
            </div>

            {/* Trineo y Santa */}
            <div className="relative">
              {/* Trineo */}
              <div className="relative z-10">
                <span className="text-5xl md:text-6xl animate-sleigh-ride drop-shadow-2xl">🛷</span>
              </div>
              
              {/* Santa montado en el trineo */}
              <div className="absolute -top-4 left-2 z-20">
                <span className="text-4xl md:text-5xl animate-santa-wave drop-shadow-2xl">🎅</span>
              </div>

              {/* Saco de regalos */}
              <div className="absolute -top-2 -right-2 z-15">
                <span className="text-2xl md:text-3xl animate-bounce-smooth" style={{ animationDelay: '0.3s' }}>🎁</span>
              </div>
            </div>

            {/* Copos de nieve cayendo alrededor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-white text-sm animate-snow-fall"
                  style={{
                    left: `${i * 25}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  ❄️
                </span>
              ))}
            </div>
          </div>

          {/* Contador de preguntas */}
          <div className="absolute top-2 right-4 flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
            <span className="text-xl animate-bounce-smooth">🎄</span>
            <span className="text-sm md:text-base font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-xl animate-bounce-smooth" style={{ animationDelay: '0.2s' }}>⭐</span>
          </div>

          {/* Línea de meta (cuando está completo) */}
          {progress === 100 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl animate-bounce-in">
              🏁
            </div>
          )}
        </div>
      </div>

      {/* Copos de nieve decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-40 animate-fall"
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

      {/* Contenedor de la pregunta con animaciones */}
      <div className="flex-1 flex items-center justify-center p-4 pb-10 relative z-10">
        <div
          key={currentIndex}
          className={`
            w-full max-w-md
            transition-all duration-500 ease-out
            ${isTransitioning && direction === "left" 
              ? "opacity-0 -translate-x-full scale-95" 
              : "opacity-100 translate-x-0 scale-100"
            }
            ${isTransitioning && direction === "right" 
              ? "opacity-0 translate-x-full scale-95" 
              : ""
            }
            ${isEntering 
              ? "opacity-0 translate-y-10 scale-95" 
              : ""
            }
          `}
        >
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            isTransitioning={isTransitioning}
          />

        </div>
      </div>

      <div className="text-center pb-6 text-sm text-white font-medium drop-shadow-md">
        ¡Santa te está observando! 🎅✨
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes shimmer-fast {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        @keyframes sleigh-ride {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }

        @keyframes santa-wave {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes bounce-smooth {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes snow-fall {
          0% {
            transform: translateY(-20px);
            opacity: 1;
          }
          100% {
            transform: translateY(60px);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-shimmer-fast {
          animation: shimmer-fast 2s linear infinite;
        }

        .animate-sleigh-ride {
          animation: sleigh-ride 1.5s ease-in-out infinite;
        }

        .animate-santa-wave {
          animation: santa-wave 2s ease-in-out infinite;
        }

        .animate-bounce-smooth {
          animation: bounce-smooth 2s ease-in-out infinite;
        }

        .animate-snow-fall {
          animation: snow-fall 2s linear infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fall,
          .animate-twinkle,
          .animate-shimmer-fast,
          .animate-sleigh-ride,
          .animate-santa-wave,
          .animate-bounce-smooth,
          .animate-snow-fall,
          .animate-bounce-in {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}