import { useState, useEffect } from "react";

const BookingsAdmin = () => {
  const [bookings, setBookings] = useState([]);

  // 🔥 LOAD BOOKINGS (still localStorage for now)
  useEffect(() => {
    const loadBookings = () => {
      const saved = JSON.parse(localStorage.getItem("bookings")) || [];
      setBookings(saved);
    };

    loadBookings();
  }, []);
const approve = async (id) => {
  const booking = bookings.find((b) => b.id === id);
  if (!booking || booking.status !== "Pending") return;

  // ✅ UPDATE STATUS (frontend)
  const updated = bookings.map((b) =>
    b.id === id ? { ...b, status: "Approved" } : b
  );

  setBookings(updated);
  localStorage.setItem("bookings", JSON.stringify(updated));

  try {
    // 🔥 CALL BACKEND (handles EVERYTHING)
    await fetch("https://finemedia-api.onrender.com/api/bookings/approve-with-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    });

    alert("✅ Approved + Date Blocked + Mail + PDF Sent");

  } catch (err) {
    console.log(err);
    alert("❌ Error during approval process");
  }
};
  // ================= REJECT =================
  const reject = async (id) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking || booking.status !== "Pending") return;

    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "Rejected" } : b
    );

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));

    try {
      await fetch("https://finemedia-api.onrender.com/api/mail/send-status-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: booking.email,
          name: booking.name,
          status: "Rejected"
        })
      });

      alert("❌ Rejection mail sent");

    } catch (err) {
      alert("Mail sending failed");
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-center">
        📋 Admin Booking Requests
      </h1>

      {bookings.length === 0 && (
        <p className="text-center text-gray-500">No bookings yet</p>
      )}

      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white shadow-md p-6 mb-5 rounded-lg flex justify-between items-center"
        >
          {/* DETAILS */}
          <div className="space-y-1">
            <p className="font-bold text-lg">{b.name}</p>
            <p><b>Email:</b> {b.email}</p>
            <p><b>Phone:</b> {b.phone}</p>
            <p><b>Place:</b> {b.place}</p>
            <p><b>Event Type:</b> {b.eventType}</p>
            <p><b>Date:</b> {b.eventDate}</p>
            
            {b.ledSize && (
              <div className="bg-gray-100 p-3 rounded mt-2 border border-gray-200">
                <p><b>LED Size:</b> {b.ledSize} Feet</p>
                <p><b>Quantity:</b> {b.quantity} Screen(s)</p>
                <p className="text-green-700"><b>System Quote:</b> ₹{b.totalCost?.toLocaleString()}</p>
              </div>
            )}

            <p>
              <b>Status:</b>
              <span className={`ml-2 font-bold ${
                b.status === "Approved"
                  ? "text-green-600"
                  : b.status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}>
                {b.status}
              </span>
            </p>
          </div>

          {/* BUTTONS */}
          <div className="space-x-3">

            <button
              disabled={b.status !== "Pending"}
              onClick={() => approve(b.id)}
              className={`px-5 py-2 rounded text-white ${
                b.status !== "Pending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Approve
            </button>

            <button
              disabled={b.status !== "Pending"}
              onClick={() => reject(b.id)}
              className={`px-5 py-2 rounded text-white ${
                b.status !== "Pending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Reject
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsAdmin;