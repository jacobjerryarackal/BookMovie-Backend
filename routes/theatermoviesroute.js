import express from 'express';
import { createTheaterMovie, fetchAllTheaterMovies, fetchOneTheaterMovie, updateTheaterMovie, deleteTheaterMovie } from '../controller/theatermoviesController.js';

const themovrouter = express.Router();

themovrouter.post('/createtheatermovies', createTheaterMovie);
themovrouter.get('/gettheatermovies', fetchAllTheaterMovies);
themovrouter.get('/gettheatermovies/:tmdbId', fetchOneTheaterMovie); 
themovrouter.put('/updatetheatermovies/:id', updateTheaterMovie);
themovrouter.delete('/deletetheatermovies/:id', deleteTheaterMovie);

export default themovrouter;
