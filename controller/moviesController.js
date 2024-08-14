import axios from 'axios';
import MoviesModels from "../models/movies.js";

const TMDB_API_KEY = 'fc575ea163f0128176ca77150fd7c76b';

export const createMovie = async (req, res) => {
    try {
        const { title } = req.body;
        const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: title
            }
        });

        if (tmdbResponse.data.results.length === 0) {
            return res.status(404).json({
                message: "Movie not found in TMDB."
            });
        }

        const movieDetails = tmdbResponse.data.results[0];

        const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
            params: {
                api_key: TMDB_API_KEY
            }
        });

        const genreIds = movieDetails.genre_ids;
        const genres = genreResponse.data.genres
            .filter(genre => genreIds.includes(genre.id))
            .map(genre => genre.name)
            .join(', ');

        
        const detailedMovieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieDetails.id}`, {
            params: {
                api_key: TMDB_API_KEY
            }
        });

        const duration = detailedMovieResponse.data.runtime ? `${detailedMovieResponse.data.runtime} minutes` : 'Unknown';

        const movieData = new MoviesModels({
            title: movieDetails.title,
            genre: genres,
            releasedate: movieDetails.release_date,
            tmdbId: movieDetails.id,
            duration
        });

        const conflictingMovie = await MoviesModels.findOne({
            title: movieDetails.title,
            genre: genres,
            releasedate: movieDetails.release_date
        });

        if (conflictingMovie) {
            return res.status(400).json({
                message: "A movie is already scheduled with the same title and genre on the same date.",
            });
        }

        const savedMovieModels = await movieData.save();
        res.status(200).json(savedMovieModels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};



export const fetchAllMovies = async (req, res) => {
    try {
        const movies = await MoviesModels.find();

        if (!movies) {
            return res.status(404).json({ message: "Movies not found." });
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const fetchOneMovie = async (req, res) => {
    try {
        const movie = await MoviesModels.findById(req.params.id);
        if (movie == null) {
            return res.status(404).json({ message: 'Cannot find movie' });
        }
        res.json(movie);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movieExist = await MoviesModels.findOne({ _id: id });

        if (!movieExist) {
            return res.status(404).json({ message: "Movie not found." });
        }

        const updateMovie = await MoviesModels.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateMovie);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movieExist = await MoviesModels.findOne({ _id: id });
        if (!movieExist) {
            return res.status(404).json({ message: "Movie not found." });
        }

        await MoviesModels.findByIdAndDelete(id);
        res.status(201).json({ message: "Movie deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};
