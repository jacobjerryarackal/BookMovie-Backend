import TheaterMovieModel from '../models/theatermovies.js';
import MoviesModel from '../models/movies.js';
import axios from 'axios';

const TMDB_API_KEY = 'fc575ea163f0128176ca77150fd7c76b';

export const createTheaterMovie = async (req, res) => {
    try {
        const { movieId, theaterId, showtime } = req.body;

        if (!movieId || !theaterId || !showtime) {
            return res.status(400).json({ message: "movieId, theaterId, and showtime are required." });
        }

        
        let movie = await MoviesModel.findOne({ _id: movieId });
        if (!movie) {
            const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
            const movieData = movieResponse.data;

            if (!movieData) {
                return res.status(404).json({ message: "Movie details not found on TMDB." });
            }

            movie = await MoviesModel.create({
                tmdbId: movieData.id, 
                title: movieData.title,
                releasedate: movieData.release_date,
                genre: movieData.genres.map(g => g.name).join(', '),
                duration : movieData.duration
            });
        }

        
        const theaterMovie = new TheaterMovieModel({
            movieId: movie._id, 
            theaterId,
            showtime,
            tmdbId: movie.tmdbId,
            duration: movie.duration 
        });

        
        const savedTheaterMovie = await theaterMovie.save();

        res.status(200).json(savedTheaterMovie);
    } catch (error) {
        console.error("Error creating TheaterMovie:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};





export const fetchAllTheaterMovies = async (req, res) => {
    try {
        const theaterMovies = await TheaterMovieModel.find()
            .populate('movieId')
            .populate('theaterId');

        const result = theaterMovies.map(tm => ({
            movie: {
                id: tm.movieId._id,
                title: tm.movieId.title,
                releasedate: tm.movieId.releasedate,
                genre: tm.movieId.genre,
                duration: tm.movieId.duration
            },
            theater: {
                id: tm.theaterId._id,
                name: tm.theaterId.name,
                location: tm.theaterId.location
            },
            showtime: tm.showtime
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching theater movies:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};





export const fetchOneTheaterMovie = async (req, res) => {
    try {
        const { tmdbId } = req.params; 


        const theaterMovies = await TheaterMovieModel.find({ tmdbId })
            .populate('movieId') 
            .populate('theaterId'); 

        if (theaterMovies.length === 0) {
            return res.status(404).json({ message: "No theater movies found for the given TMDB ID." });
        }


        const result = theaterMovies.map(tm => ({
            movie: {
                id: tm.movieId._id,
                title: tm.movieId.title,
                releasedate: tm.movieId.releasedate,
                genre: tm.movieId.genre,
                duration: tm.movieId.duration
            },
            theater: {
                id: tm.theaterId._id,
                name: tm.theaterId.name,
                location: tm.theaterId.location
            },
            showtime: tm.showtime
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching theater movies:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};






export const updateTheaterMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { movieId, theaterId, showtime } = req.body;

        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        const movieData = movieResponse.data;

        if (!movieData) {
            return res.status(404).json({ message: "Movie details not found." });
        }

        const duration = movieData.runtime ? `${movieData.runtime} minutes` : 'Unknown';

        const movie = await MoviesModel.findById(movieId);
        if (!movie) {
            await MovieModel.create({
                _id: movieId,
                title: movieData.title,
                date: movieData.release_date,
                genre: movieData.genres.map(g => g.name).join(', '),
                duration: movieData.duration
            });
        } else {
            await MovieModel.findByIdAndUpdate(movieId, {
                title: movieData.title,
                date: movieData.release_date,
                genre: movieData.genres.map(g => g.name).join(', '),
                duration: movieData.duration
            }, { new: true });
        }

        const updatedTheaterMovie = await TheaterMovieModel.findByIdAndUpdate(id, {
            movieId,
            theaterId,
            showtime,
            duration
        }, { new: true });

        if (!updatedTheaterMovie) {
            return res.status(404).json({ message: "TheaterMovie not found." });
        }

        res.status(200).json(updatedTheaterMovie);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const deleteTheaterMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTheaterMovie = await TheaterMovieModel.findByIdAndDelete(id);
        if (!deletedTheaterMovie) {
            return res.status(404).json({ message: "TheaterMovie not found." });
        }
        res.status(200).json({ message: "TheaterMovie deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};
