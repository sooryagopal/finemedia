const axios = require('axios');

class WhatsAppService {
  constructor() {
    this.apiKey = process.env.WHATSAPP_API_KEY;
    this.phoneNumber = process.env.WHATSAPP_PHONE_NUMBER;
  }

  async sendBookingConfirmation(booking) {
    const message = `🎉 New Booking Received!\n\nName: ${booking.customerName}\nEvent: ${booking.eventType}\nDate: ${new Date(booking.eventDate).toLocaleDateString('en-IN')}\nLocation: ${booking.eventLocation}\nLED Size: ${booking.ledSize}\nStatus: ${booking.status}\n\nView in admin panel: https://admin.finemedia.com`;
    
    return this.sendMessage(booking.phone, message);
  }

  async sendMessage(to, message) {
    try {
      const response = await axios.post(
        'https://api.whatsapp.com/send',
        {
          phone: to,
          message: message,
          apiKey: this.apiKey
        }
      );
      return response.data;
    } catch (error) {
      console.error('WhatsApp send error:', error);
      return null;
    }
  }
}

module.exports = new WhatsAppService();