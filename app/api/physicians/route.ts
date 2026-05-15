import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const physicians = await prisma.physician.findMany({
    include: {
      slots: true,
    },
  });

  return NextResponse.json(physicians);
}