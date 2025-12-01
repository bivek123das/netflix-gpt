// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { API_OPTIONS } from "../utils/constants";
// import {addUpcomingMovies, setLoading } from "../utils/store/movieSlice";



// const useUpcomingMovies = ()=>{
//     const dispatch = useDispatch();

//     const upcomingMovies = useSelector(store => store.movies.upcomingMovies);

//     const getUpcomingMovies = async ()=>{
//         dispatch(setLoading(true));
//         const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?&page=1', API_OPTIONS);
//         const data = await response.json();
//         dispatch(addUpcomingMovies(data.results));
//         dispatch(setLoading(false));
//     }

//     useEffect(()=>{
//         !upcomingMovies && getUpcomingMovies();
//     },[])
// }
// export default useUpcomingMovies ;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies, setLoading } from "../utils/store/movieSlice";

// 🔑 API Keys
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
   ⭐ Main Hook: Upcoming Movies
------------------------------------------ */
const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    dispatch(setLoading(true));

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );
      const data = await response.json();

      // Add trailer to each movie
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

      dispatch(addUpcomingMovies(moviesWithTrailers));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
  }, [upcomingMovies]);
};

export default useUpcomingMovies;
