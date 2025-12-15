// app/finish/[playerId]/page.tsx

import { prisma } from "@/lib/prisma";

export default async function FinishPage({
  params,
}: {
  params: { playerId: string };
}) {
  const player = await prisma.player.findUnique({
    where: { id: Number(params.playerId) },
  });

  if (!player) {
    return <div className="p-6">Jugador no encontrado</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">¡Terminaste!</h1>

      <p className="text-lg mb-2">
        Respuestas correctas: {player.correctAnswers}
      </p>

      <p className="text-lg mb-6">
        Preguntas totales: {player.totalQuestions}
      </p>

      <a
        href="/leaderboard"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Ver leaderboard
      </a>
    </div>
  );
}
