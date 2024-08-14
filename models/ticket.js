import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  theatername: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  seatnames: {
    type: [String],  
    required: true
  },
  movieId: {
    type: String,
    ref: 'Movie',
    required: true
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
});



const TicketModel = mongoose.model('Ticket', ticketSchema);

export default TicketModel;
