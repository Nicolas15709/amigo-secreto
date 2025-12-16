"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage({ params }: any) {
  const playerId = params.playerId;
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  async function answer(option: string) {
    const q = questions[index];

    await fetch("/api/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId,
        questionId: q.id,
        selected: option
      })
    });

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      router.push(`/finish/${playerId}`);
    }
  }

  if (loading) return <p>Cargando…</p>;

  const q = questions[index];

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">
        Pregunta {index + 1} de {questions.length}
      </h2>

      <p className="text-lg mb-6">{q.text}</p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {q.options.map((op: string, i: number) => (
          <button
            key={i}
            onClick={() => answer(op)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700"
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
