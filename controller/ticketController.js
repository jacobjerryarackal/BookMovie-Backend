import mongoose from 'mongoose';
import TicketModels from "../models/ticket.js";

export const createTicket = async (req, res) => {
    try {
        const { theatername, price, date, time, movie, seats,seatnames, movieId, theaterId } = req.body;

        
        const theaterObjectId = new mongoose.Types.ObjectId(theaterId);
        const seatNamesArray = Array.isArray(seatnames) ? seatnames : [seatnames];


        const conflictingTicket = await TicketModels.findOne({
            theatername,
            price,
            date,
            time,
            movie,
            movieId,
            theaterId: theaterObjectId,
            seats,
            seatnames: { $in: seatNamesArray }
        });

        if (conflictingTicket) {
            return res.status(400).json({
                message: "A Ticket is already scheduled in the same theater on the same date at the same time.",
            });
        }

        const ticketData = new TicketModels({
            theatername,
            price,
            date,
            time,
            movie,
            seats,
            movieId,
            theaterId: theaterObjectId,
            seatnames: seatNamesArray,
        });

        const savedTicket = await ticketData.save();
        res.status(200).json(savedTicket);

    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const fetchAllTicket = async (req, res) => {
    try {
        const tickets = await TicketModels.find();
        if (!tickets) {
            return res.status(404).json({ message: "Tickets not Found." });
        }
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const fetchOneTicket = async (req, res) => {
    const { id } = req.params;

  try {
    const ticket = await TicketModels.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const updateTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const ticketExist = await TicketModels.findOne({ _id: id });

        if (!ticketExist) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        const updateTicket = await TicketModels.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateTicket);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const ticketExist = await TicketModels.findOne({ _id: id });
        if (!ticketExist) {
            return res.status(404).json({ message: "Ticket Not Found." });
        }

        await TicketModels.findByIdAndDelete(id);
        res.status(201).json({ message: "Ticket deleted Successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};
