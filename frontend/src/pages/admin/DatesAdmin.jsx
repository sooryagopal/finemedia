import { useState, useEffect } from "react";

const DatesAdmin = () => {
  const [blockedDates, setBlockedDates] = useState([]);
  const [date, setDate] = useState("");

  const STORAGE_KEY = "blockedDates";

  // disable today & past
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // ✅ LOAD DATA
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBlockedDates(JSON.parse(saved));
    }
  }, []);

  // ✅ ADD DATE
  const addDate = () => {
    if (!date) return;

    if (blockedDates.includes(date)) {
      alert("Date already blocked");
      return;
    }

    const updated = [...blockedDates, date];
    setBlockedDates(updated);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setDate("");
  };

  // ✅ REMOVE DATE
  const removeDate = (d) => {
    const updated = blockedDates.filter((x) => x !== d);
    setBlockedDates(updated);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin - Block Booking Dates
      </h1>

      <div className="flex gap-3 mb-6">

        <input
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={addDate}
          className="bg-red-600 text-white px-5 rounded"
        >
          Block
        </button>

      </div>

      {blockedDates.length === 0 ? (
        <p className="text-gray-500">No blocked dates</p>
      ) : (
        blockedDates.map((d) => (
          <div
            key={d}
            className="flex justify-between bg-white p-3 mb-2 shadow rounded"
          >
            <span>{d}</span>

            <button
              onClick={() => removeDate(d)}
              className="text-red-600"
            >
              Remove
            </button>
          </div>
        ))
      )}

    </div>
  );
};

export default DatesAdmin;