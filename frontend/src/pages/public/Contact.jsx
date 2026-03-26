import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import axios from "../../services/api";
import { toast } from "react-toastify";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SEND MAIL =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      await axios.post("/api/contact", formData);

      toast.success("Message sent successfully! 📩");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      console.log(error);
      toast.error("Mail failed ❌");
    }

    setIsSubmitting(false);
  };

  // ================= CONTACT INFO =================
  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: "Our Location",
      details: ["Erode", "Coimbatore", "Chennai","All over Tamilnadu"]
    },
    {
      icon: <FiPhone />,
      title: "Phone",
      details: ["+91 9842734466", "+91 9842773866"]
    },
    {
      icon: <FiMail />,
      title: "Email",
      details: ["finemediaerode@gmail.com"]
    },
    {
      icon: <FiClock />,
      title: "Working Hours",
      details: ["24/7 Available"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center mb-10">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {/* LEFT INFO */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <div className="flex gap-4 items-start">
                  <div className="text-blue-600 text-xl">
                    {info.icon}
                  </div>

                  <div>
                    <h3 className="font-bold mb-1">{info.title}</h3>
                    {info.details.map((d, idx) => (
                      <p key={idx} className="text-gray-600">{d}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              >
                <option value="">Select subject</option>
                <option value="booking">LED Booking</option>
                <option value="quotation">Quotation</option>
                <option value="support">Support</option>
              </select>

              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border p-3 rounded"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
              >
                <FiSend />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
