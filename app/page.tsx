"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [physicians, setPhysicians] = useState<any[]>([]);
  const [selectedPhysician, setSelectedPhysician] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    if (!selectedPhysician || !selectedSlot) return;

    setLoading(true);

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

    setLoading(false);
    setSuccess(true);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-8">
        
        <div>
          <h1 className="text-4xl font-bold">
            Patient Booking Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Schedule an appointment with a physician
          </p>
        </div>

        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-xl">
            Appointment requested successfully.
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select a Physician
          </h2>

          <div className="grid gap-4">
            {physicians.map((physician) => (
              <button
                key={physician.id}
                onClick={() => setSelectedPhysician(physician)}
                className={`border rounded-xl p-4 text-left transition ${
                  selectedPhysician?.id === physician.id
                    ? "border-black bg-gray-100"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="font-semibold text-lg">
                  {physician.name}
                </div>

                <div className="text-gray-500">
                  {physician.specialty}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedPhysician && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Available Appointment Times
            </h2>

            <div className="flex flex-wrap gap-3">
              {selectedPhysician.slots.map((slot: any) => (
                <button
                  key={slot.id}
                  disabled={slot.isBooked}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedSlot === slot.id
                      ? "bg-black text-white"
                      : "bg-white"
                  } ${
                    slot.isBooked
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:border-black"
                  }`}
                >
                  {new Date(slot.startTime).toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Patient Details
          </h2>

          <input
            placeholder="Patient Name"
            className="border border-gray-300 rounded-xl p-3 w-full"
            onChange={(e) =>
              setForm({
                ...form,
                patientName: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="border border-gray-300 rounded-xl p-3 w-full"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="border border-gray-300 rounded-xl p-3 w-full"
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Reason for Visit"
            className="border border-gray-300 rounded-xl p-3 w-full"
            rows={4}
            onChange={(e) =>
              setForm({
                ...form,
                reason: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </div>
      </div>
    </main>
  );
}