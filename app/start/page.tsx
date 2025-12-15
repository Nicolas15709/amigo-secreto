"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleStart() {
    const res = await fetch("/api/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    router.push(`/quiz/${data.id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Ingresa tu nickname</h1>

      <input
        type="text"
        placeholder="Tu nombre…"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded-lg w-64 mb-4"
      />

      <button
        onClick={handleStart}
        disabled={!name.trim()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Comenzar
      </button>
    </div>
  );
}
