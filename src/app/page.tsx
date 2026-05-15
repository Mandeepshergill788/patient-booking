"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [physicians, setPhysicians] = useState<any[]>([]);
  const [selectedPhysician, setSelectedPhysician] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    reason: "",
  });

  useEffect(() => {
    fetch("/api/physicians")
      .then((res) => res.json())
      .then(setPhysicians);
  }, []);

  async function handleSubmit() {
    await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        physicianId: selectedPhysician.id,
        slotId: selectedSlot,
      }),
    });

    alert("Appointment requested!");
  }

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">
        Book an Appointment
      </h1>

      <div className="space-y-4">
        {physicians.map((physician) => (
          <button
            key={physician.id}
            onClick={() => setSelectedPhysician(physician)}
            className="border p-4 rounded w-full text-left"
          >
            <div className="font-semibold">
              {physician.name}
            </div>
            <div className="text-sm text-gray-500">
              {physician.specialty}
            </div>
          </button>
        ))}
      </div>

      {selectedPhysician && (
        <div>
          <h2 className="font-semibold mb-2">
            Available Slots
          </h2>

          <div className="flex flex-wrap gap-2">
            {selectedPhysician.slots
              .filter((slot: any) => !slot.isBooked)
              .map((slot: any) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className="border rounded px-3 py-2"
                >
                  {new Date(slot.startTime).toLocaleString()}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <input
          placeholder="Patient Name"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              patientName: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Reason for Visit"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              reason: e.target.value,
            })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit Booking
        </button>
      </div>
    </main>
  );
}