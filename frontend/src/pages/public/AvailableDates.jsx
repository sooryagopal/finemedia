import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { useNavigate } from "react-router-dom";

const AvailableDates = () => {
  const [date, setDate] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState([]);
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // ✅ FORMAT DATE (IMPORTANT)
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 🔥 FETCH BLOCKED DATES FROM BACKEND
  const fetchBlockedDates = async () => {
    try {
      const res = await fetch("https://finemedia-api.onrender.com/api/blocked-dates");
      const data = await res.json();

      // convert [{date: "..."}] → ["..."]
      const formatted = data.map((d) => d.date);
      setBlockedDates(formatted);

      console.log("Blocked from DB:", formatted); // debug

    } catch (err) {
      console.log("Error fetching blocked dates:", err);
    }
  };

  // LOAD ON START
  useEffect(() => {
    fetchBlockedDates();
  }, []);

  // 🔥 OPTIONAL: AUTO REFRESH EVERY 5s
  useEffect(() => {
    const interval = setInterval(fetchBlockedDates, 5000);
    return () => clearInterval(interval);
  }, []);

  const isBlocked = blockedDates.includes(formatDate(date));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-5xl w-full">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Check Available Booking Dates
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* CALENDAR */}
          <div>
            <Calendar
              onChange={(selectedDate) => {
                const formatted = formatDate(selectedDate);

                if (blockedDates.includes(formatted)) {
                  alert("❌ This date is already booked!");
                  return;
                }

                setDate(selectedDate);
              }}
              value={date}
              minDate={tomorrow}

              // 🔴 RED DATES
              tileClassName={({ date }) => {
                const formatted = formatDate(date);
                if (blockedDates.includes(formatted)) return "booked-date";
                return "free-date";
              }}

              // ❌ DISABLE BLOCKED
              tileDisabled={({ date }) => {
                const formatted = formatDate(date);
                return blockedDates.includes(formatted);
              }}
            />
          </div>

          {/* INFO PANEL */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              Selected: {date.toDateString()}
            </h2>

            {isBlocked ? (
              <p className="text-red-600 text-lg font-bold">
                ❌ Date already booked
              </p>
            ) : (
              <>
                <p className="text-green-600 text-lg font-bold">
                  ✅ Available for booking
                </p>

                <button
                  onClick={() =>
                    navigate("/booking", {
                      state: { selectedDate: date }
                    })
                  }
                  className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
                >
                  Book Now
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvailableDates;