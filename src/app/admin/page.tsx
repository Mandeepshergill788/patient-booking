"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  async function loadBookings() {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Upcoming Bookings
      </h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border p-4 rounded"
          >
            <div className="font-semibold">
              {booking.patientName}
            </div>

            <div>
              {booking.physician.name}
            </div>

            <div>
              {new Date(
                booking.slot.startTime
              ).toLocaleString()}
            </div>

            <div className="capitalize">
              Status: {booking.status}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}