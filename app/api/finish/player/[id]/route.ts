import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  // ← params ahora es Promise
) {
  // Resolvemos la Promise para obtener el id
  const resolvedParams = await params;
  const rawId = resolvedParams.id;

  console.log("PARAMS RECIBIDOS:", resolvedParams);

  if (!rawId || isNaN(Number(rawId))) {
    return NextResponse.json({ error: "playerId inválido" }, { status: 400 });
  }

  const playerId = Number(rawId);

  try {
    const updated = await prisma.player.update({
      where: { id: playerId },
      data: {
        finished: true,
        finishedAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { error: "No se pudo finalizar el quiz" },
      { status: 500 }
    );
  }
}