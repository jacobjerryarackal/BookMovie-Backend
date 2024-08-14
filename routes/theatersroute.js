import express from "express";
import { createTheater, fetchAllTheater, fetchOneTheater, updateTheater, deleteTheater } from "../controller/theaterController.js";



const troutes = express.Router();

troutes.post ("/createtheater", createTheater); 
troutes.get ("/gettheater", fetchAllTheater); 
troutes.get ("/gettheater/:id", fetchOneTheater); 
troutes.put ("/updatetheater/:id", updateTheater); 
troutes.delete ("/deletetheater/:id", deleteTheater); 


export default troutes;