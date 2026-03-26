const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.jsx');
const { syncToGoogleCalendar, updateGoogleCalendarEvent, deleteGoogleCalendarEvent } = require('../services/googleCalendarService');

// Get all events
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Create event
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    
    const newEvent = new Event({
      title,
      description,
      location,
      date
    });

    // Mock/Actual sync to Google Calendar
    try {
      const googleEventId = await syncToGoogleCalendar(newEvent);
      if (googleEventId) newEvent.googleEventId = googleEventId;
    } catch(err) {
      console.error("Google Calendar Sync Error:", err.message);
    }

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Update event
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.title = title || event.title;
    event.description = description !== undefined ? description : event.description;
    event.location = location || event.location;
    event.date = date || event.date;

    try {
      if (event.googleEventId) {
        await updateGoogleCalendarEvent(event.googleEventId, event);
      } else {
        const googleEventId = await syncToGoogleCalendar(event);
        if (googleEventId) event.googleEventId = googleEventId;
      }
    } catch(err) {
       console.error("Google Calendar Update Error:", err.message);
    }

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete event
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    try {
      if (event.googleEventId) {
        await deleteGoogleCalendarEvent(event.googleEventId);
      }
    } catch(err) {
      console.error("Google Calendar Delete Error:", err.message);
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
