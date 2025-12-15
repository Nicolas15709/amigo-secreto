import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error obteniendo preguntas:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las preguntas" },
      { status: 500 }
    );
  }
}
