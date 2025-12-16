import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const players = await prisma.player.findMany({
    orderBy: [
      { correctAnswers: "desc" },
      { finishedAt: "asc" }
    ],
    select: {
      id: true,
      name: true,
      correctAnswers: true,
      totalQuestions: true,
      finished: true,
      finishedAt: true
    }
  });

  return NextResponse.json(players);
}
