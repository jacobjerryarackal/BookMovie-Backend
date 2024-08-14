import mongoose from 'mongoose';
import TicketBookModel from '../models/bookticket.js';
import MovieModel from '../models/movies.js';
import TheaterModel from '../models/theater.js';


export const createBookTicket = async (req, res) => {
    try {
      const { theatername, price, date, time, movie, seats, seatNames, movieId, theaterId } = req.body;
  
      const theaterObjectId = new mongoose.Types.ObjectId(theaterId);
      const seatNamesArray = Array.isArray(seatNames) ? seatNames : [seatNames];
  
      
      const movieData = await MovieModel.findById(movieId);
      if (!movieData) {
        return res.status(404).json({ error: "Movie not found." });
      }
      const duration = movieData.duration;
  
      const conflictingTicket = await TicketBookModel.findOne({
        theatername,
        date,
        time,
        movie,
        movieId,
        theaterId: theaterObjectId,
        seatnames: { $in: seatNamesArray }
      });
  
      if (conflictingTicket) {
        return res.status(400).json({
          message: "A Ticket is already scheduled in the same theater on the same date at the same time in the same seat.",
        });
      }
  
      const ticketData = new TicketBookModel({
        theatername,
        price,
        date,
        time,
        movie,
        duration,  
        seats,
        seatnames: seatNamesArray,
        movieId,
        theaterId: theaterObjectId
      });
  
      const savedTicket = await ticketData.save();
      res.status(200).json(savedTicket);
  
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };


export const getAllBookTickets = async (req, res) => {
  try {
    const tickets = await TicketBookModel.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching booked tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getBookTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await TicketBookModel.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Booked Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateBookTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { theaterId, movieId, date, time, price, seats, seatNames } = req.body;

    const theater = await TheaterModel.findById(theaterId);
    const movie = await MovieModel.findById(movieId);

    if (!theater || !movie) {
      return res.status(404).json({ message: 'Theater or Movie not found' });
    }

    const duration = movie.duration;

    const updatedTicket = await TicketBookModel.findByIdAndUpdate(id, {
      theatername: theater.name,
      price,
      date,
      time,
      movie: movie.title,
      seats,
      seatnames: seatNames.join(', '),
      movieId,
      theaterId,
      duration
    }, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const deleteBookTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await TicketBookModel.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
