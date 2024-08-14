import twilio from 'twilio';
import whatsappModel from '../models/whatsapp.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsAppNumber = 'whatsapp:+14155238886';

const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (req, res) => {
  if (req.method === 'POST') {
    const { phoneNumber, ticket } = req.body;

    const message = `
    Ticket Confirmation:
    Movie: ${ticket.movie}
    Theater: ${ticket.theatername}
    Date: ${ticket.date}
    Time: ${ticket.time}
    Seats: ${ticket.seats}
    Seat Names: ${ticket.seatnames.join(', ')}
    Price: ₹${ticket.price}
    `;

    try {
      const msg = await client.messages.create({
        from: fromWhatsAppNumber,
        to: `whatsapp:${phoneNumber}`,
        body: message,
      });

      console.log('Message SID:', msg.sid); 

      await whatsappModel.create({
        phoneNumber,
        sentAt: new Date(),
      });

      res.status(200).json({ message: 'WhatsApp message sent successfully' });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      res.status(500).json({ message: 'Error sending WhatsApp message', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
