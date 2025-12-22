"use client";

import { useState, useEffect } from "react";

type Question = {
  id: number;
  text: string;
  options: string[];
};

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
  isTransitioning?: boolean;
};

export default function QuestionCard({ question, onAnswer, isTransitioning }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number }>>([]);

  const createParticles = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  const createConfetti = () => {
    const colors = ['#ef4444', '#22c55e', '#fbbf24', '#3b82f6', '#a855f7', '#ec4899'];
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));
    
    setConfetti(newConfetti);
    
    setTimeout(() => {
      setConfetti([]);
    }, 3000);
  };

  const handleClick = (option: string, e: React.MouseEvent) => {
    if (isTransitioning || selectedOption) return;
    
    createParticles(e);
    createConfetti();
    setSelectedOption(option);
    
    setTimeout(() => {
      onAnswer(option);
      setSelectedOption(null);
    }, 600);
  };

  return (
    <div className="w-full relative">
      {/* Confetti explosión */}
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="confetti-piece"
          style={{
            left: `${conf.x}%`,
            top: `${conf.y}%`,
            backgroundColor: conf.color,
            transform: `rotate(${conf.rotation}deg)`,
          }}
        />
      ))}

      {/* Card principal con efecto glassmorphism */}
      <div className="glass-card relative overflow-hidden animate-scale-in">
        {/* Brillo animado superior */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-yellow-400 via-pink-500 to-green-500 animate-shimmer-fast" />
        
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-green-500/5 animate-pulse-slow" />
        
        {/* Decoraciones flotantes */}
        <div className="absolute top-6 right-6 text-4xl animate-float" style={{ animationDelay: "0s" }}>
          🎄
        </div>
        <div className="absolute top-6 left-6 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>
          ✨
        </div>
        <div className="absolute bottom-6 right-6 text-3xl animate-float" style={{ animationDelay: "1s" }}>
          🎁
        </div>
        <div className="absolute bottom-6 left-6 text-3xl animate-float" style={{ animationDelay: "1.5s" }}>
          ⭐
        </div>

        {/* Título con efecto de typing */}
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10 mt-8 px-6 relative z-10 animate-fade-in-down">
          <span className="text-gradient">{question.text}</span>
        </h2>

        {/* Opciones con efectos mejorados */}
        <div className="flex flex-col gap-4 px-6 pb-8 relative z-10">
          {question.options.map((option, i) => (
            <div
              key={option}
              className="animate-slide-in-right"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <button
                onClick={(e) => handleClick(option, e)}
                disabled={isTransitioning || selectedOption !== null}
                className={`
                  option-button group
                  ${selectedOption === option ? "selected" : ""}
                  ${isTransitioning || (selectedOption && selectedOption !== option) ? "disabled" : ""}
                `}
                style={{
                  background: i % 2 === 0 
                    ? 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #22c55e 100%)' 
                    : 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #ef4444 100%)',
                }}
              >
                {/* Partículas en el botón */}
                {particles
                  .filter(p => selectedOption === option)
                  .map((particle) => (
                    <div
                      key={particle.id}
                      className="particle"
                      style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                      }}
                    />
                  ))}

                <span className="relative z-10 flex items-center justify-center gap-3">
                  {selectedOption === option && (
                    <span className="text-3xl animate-bounce-in">🎯</span>
                  )}
                  <span className="font-bold text-lg tracking-wide">{option}</span>
                  {selectedOption === option && (
                    <span className="text-3xl animate-bounce-in">✨</span>
                  )}
                </span>

                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl" />
                
                {/* Borde brillante */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-all duration-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Indicador mejorado */}
        <div className="pb-6 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm animate-pulse-glow">
            <span className="text-xl animate-spin-slow">⭐</span>
            <span className="text-sm font-bold text-gray-700">Pregunta {question.id}</span>
            <span className="text-xl animate-spin-slow" style={{ animationDelay: "1s" }}>⭐</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 2rem;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          padding: 1.5rem;
        }

        .text-gradient {
          background: linear-gradient(135deg, #dc2626 0%, #ea580c 25%, #22c55e 75%, #16a34a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        .option-button {
          position: relative;
          width: 100%;
          padding: 1.5rem 2rem;
          border-radius: 1.5rem;
          font-weight: 700;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.3) inset;
          overflow: hidden;
        }

        .option-button:not(.disabled):hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 2px rgba(255, 255, 255, 0.5) inset,
            0 0 30px rgba(255, 215, 0, 0.5);
        }

        .option-button:not(.disabled):active {
          transform: scale(0.98);
        }

        .option-button.selected {
          transform: scale(1.1) rotate(1deg);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            0 0 0 3px rgba(255, 255, 255, 0.8) inset,
            0 0 50px rgba(255, 215, 0, 0.8);
          animation: pulse-ring 0.6s ease-out;
        }

        .option-button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(50%);
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-burst 1s ease-out forwards;
        }

        .confetti-piece {
          position: absolute;
          width: 12px;
          height: 12px;
          animation: confetti-fall 3s ease-out forwards;
          z-index: 100;
        }

        /* Animaciones */
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateX(20deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }

        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(-50px) rotateY(-20deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
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

        @keyframes pulse-ring {
          0% {
            box-shadow: 
              0 0 0 0 rgba(255, 215, 0, 0.7),
              0 0 0 0 rgba(255, 215, 0, 0.4);
          }
          100% {
            box-shadow: 
              0 0 0 20px rgba(255, 215, 0, 0),
              0 0 0 40px rgba(255, 215, 0, 0);
          }
        }

        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(var(--random-x, 50px) - 25px),
              calc(var(--random-y, 50px) - 25px)
            ) scale(0);
            opacity: 0;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.6);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-shimmer-fast {
          animation: shimmer-fast 2s infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-fill-mode: both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
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