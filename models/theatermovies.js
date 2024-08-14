import mongoose from 'mongoose';

const theaterMovieSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  showtime: { type: String, required: true },
  tmdbId: { type: String, required: true },
  duration : {type: String, ref: 'Movie', required: true }
});


const TheaterMovieModel = mongoose.model('TheaterMovie', theaterMovieSchema);

export default TheaterMovieModel;
