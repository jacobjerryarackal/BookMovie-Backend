import express from 'express';
import {
  createBookTicket,
  getAllBookTickets,
  getBookTicketById,
  updateBookTicket,
  deleteBookTicket
} from '../controller/bookticketController.js';

const booktktrouter = express.Router();

booktktrouter.post('/createbookticket', createBookTicket);
booktktrouter.get('/getallbooktickets', getAllBookTickets);
booktktrouter.get('/getbookticket/:id', getBookTicketById);
booktktrouter.put('/updatebookticket/:id', updateBookTicket);
booktktrouter.delete('/deletebookticket/:id', deleteBookTicket);

export default booktktrouter;
