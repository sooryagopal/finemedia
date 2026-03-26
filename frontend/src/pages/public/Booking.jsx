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
      : "",
    ledSize: "",
    quantity: 1
  });

  const sizes = {
    "12x8": 96,
    "8x6": 48,
    "6x6": 36
  };
  const sqft = sizes[form.ledSize] || 0;
  const estimatedCost = sqft * 150 * (parseInt(form.quantity) || 1);

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
      ledSize: form.ledSize,
      quantity: form.quantity,
      totalCost: estimatedCost,
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
      eventDate: "",
      ledSize: "",
      quantity: 1
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

        {/* LED SIZE */}
        <select
          name="ledSize"
          value={form.ledSize}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select LED Size (Feet)</option>
          <option value="12x8">12 x 8 (96 sqft)</option>
          <option value="8x6">8 x 6 (48 sqft)</option>
          <option value="6x6">6 x 6 (36 sqft)</option>
        </select>

        {/* QUANTITY */}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity of Screens (e.g. 1)"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* ESTIMATED COST BOX */}
        {estimatedCost > 0 && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-center shadow-inner">
            <p className="text-sm font-semibold uppercase tracking-wider mb-1">Estimated Rental Cost</p>
            <p className="text-3xl font-black">₹{estimatedCost.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">Based on ₹150/sqft x {form.quantity} Screen(s)</p>
          </div>
        )}

        {/* SUBMIT */}
        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Submit Booking
        </button>

      </form>
    </div>
  );
};

export default Booking;