import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { playerId, questionId, selected, isCorrect } = await req.json();

    if (!playerId || !questionId || !selected) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const answer = await prisma.answer.upsert({
      where: { playerId_questionId: { playerId, questionId } },
      update: { selected, isCorrect },
      create: { playerId, questionId, selected, isCorrect },
    });

    await prisma.player.update({
      where: { id: playerId },
      data: {
        totalQuestions: { increment: 1 },
        correctAnswers: isCorrect ? { increment: 1 } : undefined,
      },
    });

    return NextResponse.json(answer);
  } catch (error) {
    console.error("Error guardando respuesta:", error);
    return NextResponse.json(
      { error: "No se pudo registrar la respuesta" },
      { status: 500 }
    );
  }
}
