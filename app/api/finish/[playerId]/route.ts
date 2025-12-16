import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const pathname = req.nextUrl.pathname; // /api/finish/11
  const playerId = pathname.split("/").pop(); // "11"

  console.log("PLAYER ID REAL:", playerId);

  // Aquí luego irá Prisma:
  // await prisma.player.update({ ... })

  return NextResponse.json({
    ok: true,
    playerId,
  });
}
