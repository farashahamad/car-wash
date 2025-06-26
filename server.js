// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Twilio Setup
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.WHATSAPP_FROM; // Your Twilio WhatsApp number
const client = twilio(accountSid, authToken);

// Simple Booking Endpoint
app.post('/api/book', async (req, res) => {
  const { name, phone, date, service } = req.body;

  const messageBody = `âœ… Booking Confirmed!\n\nName: ${name}\nService: ${service}\nDate: ${date}`;

  try {
    const message = await client.messages.create({
      body: messageBody,
      from: whatsappFrom,
      to: `whatsapp:+${phone.replace(/\D/g, '')}`
    });

    console.log('WhatsApp Message SID:', message.sid);
    res.json({ success: true, message: 'Booking confirmed!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to send WhatsApp message.' });
  }
});

app.listen(PORT, () => {
  console.log(`íº€ Server is running on http://localhost:${PORT}`);
});
