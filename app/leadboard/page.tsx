import { prisma } from "@/lib/prisma";

export default async function Leaderboard() {
  const players = await prisma.player.findMany({
    where: { finished: true },
    orderBy: { correctAnswers: "desc" }
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>

      <div className="space-y-3">
        {players.map((p, i) => (
          <div
            key={p.id}
            className="flex justify-between bg-gray-100 p-3 rounded-lg"
          >
            <span>
              {i + 1}. {p.name}
            </span>
            <span>{p.correctAnswers}</span>
          </div>
        ))}
      </div>

      <a
        href="/secret"
        className="mt-6 block bg-green-600 w-fit mx-auto text-white px-6 py-3 rounded-lg"
      >
        Ver Amigo Secreto
      </a>
    </div>
  );
}
