import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { playerId, questionId, selected, isCorrect } = await req.json();

    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Crear respuesta
      const answer = await tx.answer.create({
        data: {
          playerId,
          questionId,
          selected,
          isCorrect,
        },
      });

      // 2️⃣ Actualizar stats SOLO si la respuesta se creó
      await tx.player.update({
        where: { id: playerId },
        data: {
          totalQuestions: { increment: 1 },
          correctAnswers: isCorrect ? { increment: 1 } : undefined,
        },
      });

      return answer;
    });

    return NextResponse.json({ ok: true, answer: result });

  } catch (error) {
    // 🟡 Respuesta duplicada
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Pregunta ya respondida" },
        { status: 409 }
      );
    }

    console.error("ERROR ANSWER:", error);

    return NextResponse.json(
      { error: "Error interno al registrar respuesta" },
      { status: 500 }
    );
  }
}
