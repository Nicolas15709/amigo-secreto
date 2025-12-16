import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
    }

    const player = await prisma.player.create({
      data: { name },
    });

    return NextResponse.json(player);
  } catch (error) {
    console.error("Error creando jugador:", error);
    return NextResponse.json(
      { error: "No se pudo registrar al jugador" },
      { status: 500 }
    );
  }
}
