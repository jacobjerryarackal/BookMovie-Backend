import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  row: { type: String, required: true },
  number: { type: Number, required: true },
  isBooked: { type: Boolean, default: false }
});

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  seats: [seatSchema],
});

const TheaterModel = mongoose.model('Theater', theaterSchema);

export default TheaterModel;
