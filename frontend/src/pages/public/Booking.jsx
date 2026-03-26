import { useState } from "react";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    landmark: "",
    eventType: "",
    eventDate: location.state?.selectedDate
      ? new Date(location.state.selectedDate).toISOString().split("T")[0]
      : ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.place ||
      !form.eventType ||
      !form.eventDate
    ) {
      alert("Fill all fields");
      return;
    }

    const bookingData = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      place: form.place,
      landmark: form.landmark,
      eventType: form.eventType,
      eventDate: form.eventDate,
      status: "Pending"
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("✅ Booking Submitted Successfully");

    setForm({
      name: "",
      email: "",
      phone: "",
      place: "",
      landmark: "",
      eventType: "",
      eventDate: ""
    });
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Event Booking Form
      </h1>

      <form onSubmit={submitBooking} className="space-y-4">

        {/* NAME */}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* PHONE */}
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* DISTRICT DROPDOWN */}
        <select
          name="place"
          value={form.place}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select District</option>
          <option value="Salem">Salem</option>
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Madurai">Madurai</option>
          <option value="Trichy">Trichy</option>
          <option value="Erode">Erode</option>
        </select>

        {/* LANDMARK */}
        <textarea
          name="landmark"
          placeholder="Enter Landmark / Exact Location"
          value={form.landmark}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* EVENT TYPE */}
        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Event</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Corporate">Corporate</option>
          <option value="Concert">Concert</option>
          <option value="College Event">College Event</option>
        </select>

        {/* DATE PICKER */}
        <input
          type="date"
          name="eventDate"
          value={form.eventDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* SUBMIT */}
        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Submit Booking
        </button>

      </form>
    </div>
  );
};

export default Booking;