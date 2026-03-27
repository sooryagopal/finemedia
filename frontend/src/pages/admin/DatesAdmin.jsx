import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Axios default for auth (assume auth context handles this globally in a real app, but we add it here just to be safe)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const DatesAdmin = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayEvents, setDayEvents] = useState([]);
  
  const [newEvent, setNewEvent] = useState({ title: "", description: "", location: "" });
  const [loading, setLoading] = useState(false);

  // Load events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://finemedia-api.onrender.com/api/events", getAuthHeaders());
      const formatted = res.data.map(e => ({
        id: e._id,
        title: e.title,
        date: new Date(e.date).toISOString().split("T")[0],
        backgroundColor: "#ef4444",
        borderColor: "#b91c1c",
        textColor: "white",
        extendedProps: {
          description: e.description,
          location: e.location
        }
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Date Click
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    const eventsOnDay = events.filter(e => e.date === arg.dateStr);
    setDayEvents(eventsOnDay);
    setIsModalOpen(true);
  };

  // Add new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.location) return alert("Title and location required");
    
    setLoading(true);
    try {
      await axios.post("https://finemedia-api.onrender.com/api/events", {
        ...newEvent,
        date: selectedDate
      }, getAuthHeaders());
      
      setNewEvent({ title: "", description: "", location: "" });
      fetchEvents();
      
      // Update local modal view instantly
      setDayEvents([...dayEvents, { 
        id: Date.now(), 
        title: newEvent.title, 
        extendedProps: { location: newEvent.location, description: newEvent.description }
      }]);
      
    } catch (err) {
      console.error("Error creating event", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://finemedia-api.onrender.com/api/events/${id}`, getAuthHeaders());
      fetchEvents();
      setDayEvents(dayEvents.filter(e => e.id !== id));
    } catch (err) {
      console.error("Error deleting event", err);
    }
  }

  // Custom Event Render for Calendar Cells
  const renderEventContent = (eventInfo) => {
    return (
      <div className="w-full text-xs p-1">
        <div className="font-bold truncate">{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps?.location && (
          <div className="truncate opacity-90 mt-0.5 text-[10px] leading-tight flex items-center gap-1">📍 {eventInfo.event.extendedProps.location}</div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Private Admin Calendar</h1>
        <p className="text-gray-500 mt-2">Manage your bookings, block dates, and sync with Google Calendar.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height={"auto"}
          buttonText={{ today: "Today" }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth"
          }}
          eventContent={renderEventContent}
          eventClassNames="cursor-pointer shadow-sm rounded-md border"
        />
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">
                  Events for {selectedDate}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="mb-8 space-y-3">
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wider">Scheduled Today</h3>
                  {dayEvents.length === 0 ? (
                    <p className="text-gray-500 italic">No events scheduled. The day is open.</p>
                  ) : (
                    dayEvents.map(ev => (
                      <div key={ev.id} className="p-4 bg-blue-50 border border-blue-100 rounded-2xl relative group">
                        <h4 className="font-bold text-blue-900">{ev.title}</h4>
                        {ev.extendedProps?.location && (
                          <p className="text-blue-700 text-sm mt-1">📍 {ev.extendedProps.location}</p>
                        )}
                        {ev.extendedProps?.description && (
                          <p className="text-blue-600 mt-2 text-sm">{ev.extendedProps.description}</p>
                        )}
                        <button 
                          onClick={() => handleDelete(ev.id)}
                          className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddEvent} className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Add New Event</h3>
                  
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Event Name (e.g., Corporate LED Setup)" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newEvent.title}
                      onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Location" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newEvent.location}
                      onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                      required
                    />
                    <textarea 
                      placeholder="Description & Notes" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-24 resize-none"
                      value={newEvent.description}
                      onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                    />
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {loading ? "Saving & Syncing..." : "Save Event"}
                    </button>
                  </div>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DatesAdmin;