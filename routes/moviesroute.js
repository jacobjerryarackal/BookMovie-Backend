import express from "express";
import { createMovie, deleteMovie, fetchAllMovies, fetchOneMovie, updateMovie } from "../controller/moviesController.js";


const movroutes = express.Router();
movroutes.post ("/createmovie", createMovie); 
movroutes.get ("/getmovie", fetchAllMovies); 
movroutes.get ("/getmovie/:id", fetchOneMovie);   
movroutes.put ("/updatemovie/:id", updateMovie); 
movroutes.delete ("/deletemovie/:id", deleteMovie); 


export default movroutes;