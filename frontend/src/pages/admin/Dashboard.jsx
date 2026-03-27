import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiImage,
  FiCalendar,
  FiBookOpen,
  FiSettings,
} from "react-icons/fi";
import axios from "axios";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [monthly, setMonthly] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [events, setEvents] = useState([]);
  
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://finemedia-api.onrender.com/api/analytics", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setMonthly(res.data.monthly || []);
        setRevenue(res.data.revenue || []);
        setEvents(res.data.events || []);

        const tBookings = (res.data.monthly || []).reduce((acc, curr) => acc + curr.bookings, 0);
        const tRev = (res.data.revenue || []).reduce((acc, curr) => acc + curr.revenue, 0);
        
        setTotalBookings(tBookings);
        setTotalRevenue(tRev);

      } catch(err) {
        console.error("Failed to fetch analytics", err);
      }
    };

    fetchAnalytics();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            Fine Media Admin
          </h1>
          <p className="text-sm text-gray-500">
            Manage your business efficiently
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          <FiLogOut />
          Logout
        </button>
      </header>

      {/* MAIN */}
      <main className="p-6 max-w-7xl mx-auto">

        {/* WELCOME */}
        <div className="mb-8 bg-blue-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-1">
            Welcome, Admin 👋
          </h2>
          <p className="text-blue-100">
            Manage services, bookings, gallery and availability
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            title="Services"
            desc="Add, edit and remove services"
            color="bg-blue-500"
            icon={<FiSettings size={28} />}
            onClick={() => navigate("/admin/services")}
          />

          <DashboardCard
            title="Gallery"
            desc="Upload and manage photos"
            color="bg-purple-500"
            icon={<FiImage size={28} />}
            onClick={() => navigate("/admin/gallery")}
          />

          <DashboardCard
            title="Available Dates"
            desc="Block or open booking dates"
            color="bg-green-500"
            icon={<FiCalendar size={28} />}
            onClick={() => navigate("/admin/dates")}
          />

          <DashboardCard
            title="Bookings"
            desc="Approve and reject bookings"
            color="bg-yellow-500"
            icon={<FiBookOpen size={28} />}
            onClick={() => navigate("/admin/bookings")}
          />

        </div>

        {/* ================= 📊 ANALYTICS ================= */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            📊 Analytics Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* MONTHLY BOOKINGS */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Monthly Bookings</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthly}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* REVENUE */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Revenue</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenue}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* EVENT TYPES */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Event Types</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={events} dataKey="value" nameKey="name" outerRadius={80}>
                    {events.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* QUICK STATS */}
            <div className="bg-white p-5 rounded-xl shadow flex flex-col justify-center">
              <h3 className="font-semibold mb-3">Quick Stats</h3>
              <p>Total Bookings: <b>{totalBookings}</b></p>
              <p>Total Revenue: <b>₹{totalRevenue.toLocaleString()}</b></p>
              <p>Active Events: <b>{events.reduce((acc, curr)=> acc + curr.value, 0)}</b></p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};


/* CARD COMPONENT */
const DashboardCard = ({ title, desc, icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1"
    >
      <div className="p-6">

        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white mb-4`}>
          {icon}
        </div>

        <h3 className="text-lg font-semibold mb-1">{title}</h3>

        <p className="text-gray-600 text-sm mb-4">{desc}</p>

        <button className="text-blue-600 font-medium hover:underline">
          Manage →
        </button>

      </div>
    </div>
  );
};

export default Dashboard;