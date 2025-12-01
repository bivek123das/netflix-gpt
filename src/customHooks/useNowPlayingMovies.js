// import { API_OPTIONS } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { addNowPlayingMovies, setLoading } from '../utils/store/movieSlice'
// import { useEffect } from 'react';


// const useNewPlayingMovies = ()=>{
//  // Fetch data from TMDB API and update store
   
//  const dispatch = useDispatch();

//  const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies);

//  const getNowPlayingMovies = async ()=>{
//      dispatch(setLoading(true));
//      const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
//      const data = await response.json();
//     //  console.log(data.results);
//      dispatch(addNowPlayingMovies(data.results));
//      dispatch(setLoading(false));
     
// }

//  useEffect(()=>{
//    !nowPlayingMovies && getNowPlayingMovies();
//  },[])

// }

// export default useNewPlayingMovies;

import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies, setLoading } from '../utils/store/movieSlice';
import { useEffect } from 'react';

// 🔑 Your API Keys
const YOUTUBE_API_KEY = "AIzaSyBRft_91mS3ikPgOaS7MTqvqcTy1W-b-v8";
const OMDB_KEY = "4fe26d2e";

/* -----------------------------------------
   1️⃣ TMDb → IMDb ID
------------------------------------------ */
const fetchImdbIdFromTMDB = async (tmdbId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`,
      API_OPTIONS
    );
    const data = await res.json();
    return data.imdb_id || null;
  } catch {
    return null;
  }
};

/* -----------------------------------------
   2️⃣ IMDb → Movie Title (OMDb)
------------------------------------------ */
const fetchMovieTitle = async (imdbId) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbId}`
    );
    const data = await res.json();
    if (data.Response === "False") return null;
    return data.Title;
  } catch {
    return null;
  }
};

/* -----------------------------------------
   3️⃣ Title → YouTube Trailer
------------------------------------------ */
const fetchYouTubeTrailer = async (title) => {
  try {
    const query = encodeURIComponent(`${title} official trailer`);

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}&maxResults=1`
    );

    const data = await res.json();
    const video = data.items?.[0];

    if (!video) return null;

    return {
      id: video.id.videoId,
      key: video.id.videoId,
      name: video.snippet.title,
      site: "YouTube",
    };
  } catch {
    return null;
  }
};

/* -----------------------------------------
   ⭐ Main Hook
------------------------------------------ */
const useNewPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    dispatch(setLoading(true));

    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const data = await response.json();

    // Fetch trailer for each movie
    const moviesWithTrailers = await Promise.all(
      data.results.map(async (movie) => {
        const imdbId = await fetchImdbIdFromTMDB(movie.id);
        if (!imdbId) return { ...movie, trailer: null };

        const title = await fetchMovieTitle(imdbId);
        if (!title) return { ...movie, trailer: null };

        const trailer = await fetchYouTubeTrailer(title);
        return { ...movie, trailer };
      })
    );

    dispatch(addNowPlayingMovies(moviesWithTrailers));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNewPlayingMovies;
