import express from "express";
import { createTicket, deleteTicket, fetchAllTicket, fetchOneTicket, updateTicket  } from "../controller/ticketController.js";


const tickroutes = express.Router();

tickroutes.post ("/createticket", createTicket); 
tickroutes.get ("/getticket", fetchAllTicket); 
tickroutes.get ("/getticket/:id", fetchOneTicket);  
tickroutes.put ("/updateticket/:id", updateTicket); 
tickroutes.delete ("/deleteticket/:id", deleteTicket); 

export default tickroutes;