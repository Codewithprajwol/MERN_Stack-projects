import express from 'express'
import { getMoviesByCategory, getMoviesDetails, getMovieTrailers, getSimilarMovies, getTrendingMovies } from '../controllers/movie.controller.js';

const router=express.Router();

router.get('/trending',getTrendingMovies);
router.get('/:id/trailers',getMovieTrailers)
router.get('/:id/details',getMoviesDetails)
router.get('/:id/similars',getSimilarMovies)
router.get('/:category',getMoviesByCategory)

export default router;