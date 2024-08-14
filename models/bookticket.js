import mongoose from 'mongoose';

const ticketbookSchema = new mongoose.Schema({
  theatername: {
    type: String,
    ref: 'Theater',
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
    ref: 'Movie',
    required: true
  },
  seats: {
    type: Number,
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
  duration : {
    type: String,
    ref: 'Movie',
    required : true
  },
  seatnames : {
    type: Array,
    required: true
  }
});



const TicketBookModel = mongoose.model('BookTicket', ticketbookSchema);

export default TicketBookModel;
