const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Google Calendar Setup
const SCOPES = 'https://www.googleapis.com/auth/calendar';
let calendar = null;

const initCalendar = () => {
  try {
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '../../config/google-calendar-service-account.json');
    
    let authOptions = { scopes: SCOPES };
    if (process.env.GOOGLE_CREDENTIALS_JSON) {
      // 1. Used strictly when hosted live on Render via secure Environment Variables
      authOptions.credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    } else if (fs.existsSync(keyPath)) {
      // 2. Used strictly during Local Development
      authOptions.keyFile = keyPath;
    } else {
      console.log('⚠️ Google Calendar JSON key not found. Running in MOCK mode.');
      return false;
    }

    const auth = new google.auth.GoogleAuth(authOptions);
    calendar = google.calendar({ version: 'v3', auth: auth });
    return true;
  } catch (err) {
    console.error('⚠️ Google Calendar Init Error:', err.message);
    return false;
  }
};

const isLive = initCalendar();
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

const syncToGoogleCalendar = async (eventData) => {
  if (!isLive || !calendar) {
    console.log(`[Google Calendar MOCK] Synthesizing Event for: ${eventData.title}`);
    return `mock_google_id_${Date.now()}`;
  }

  try {
    const event = {
      summary: eventData.title,
      location: eventData.location,
      description: eventData.description,
      start: {
        date: new Date(eventData.date).toISOString().split('T')[0],
      },
      end: {
        date: new Date(eventData.date).toISOString().split('T')[0],
      },
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });

    console.log(`✅ [Google Calendar] Event created: ${response.data.htmlLink}`);
    return response.data.id;
  } catch (err) {
    console.error(`❌ [Google Calendar] Sync Error:`, err.message);
    return null;
  }
};

const updateGoogleCalendarEvent = async (eventId, eventData) => {
  if (!isLive || !calendar || eventId.startsWith('mock_')) {
    console.log(`[Google Calendar MOCK] Updating Event ID: ${eventId}`);
    return true;
  }

  try {
    const event = {
      summary: eventData.title,
      location: eventData.location,
      description: eventData.description,
      start: {
        date: new Date(eventData.date).toISOString().split('T')[0],
      },
      end: {
        date: new Date(eventData.date).toISOString().split('T')[0],
      },
    };

    await calendar.events.update({
      calendarId: CALENDAR_ID,
      eventId: eventId,
      resource: event,
    });
    
    console.log(`✅ [Google Calendar] Event updated: ${eventId}`);
    return true;
  } catch (err) {
    console.error(`❌ [Google Calendar] Update Error:`, err.message);
    return false;
  }
};

const deleteGoogleCalendarEvent = async (eventId) => {
  if (!isLive || !calendar || eventId.startsWith('mock_')) {
    console.log(`[Google Calendar MOCK] Deleting Event ID: ${eventId}`);
    return true;
  }

  try {
    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId: eventId,
    });
    console.log(`✅ [Google Calendar] Event deleted: ${eventId}`);
    return true;
  } catch (err) {
    console.error(`❌ [Google Calendar] Delete Error:`, err.message);
    return false;
  }
};

module.exports = {
  syncToGoogleCalendar,
  updateGoogleCalendarEvent,
  deleteGoogleCalendarEvent
};
