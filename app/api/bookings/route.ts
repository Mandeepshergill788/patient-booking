import { prisma } from "../../../src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const booking = await prisma.booking.create({
    data: {
      patientName: body.patientName,
      email: body.email,
      phone: body.phone,
      reason: body.reason,
      physicianId: body.physicianId,
      slotId: body.slotId,
    },
  });

  await prisma.appointmentSlot.update({
    where: {
      id: body.slotId,
    },
    data: {
      isBooked: true,
    },
  });

  return NextResponse.json(booking);
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      physician: true,
      slot: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(bookings);
}