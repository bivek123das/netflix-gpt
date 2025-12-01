// import { useDispatch, useSelector } from "react-redux";
// import { addMovieTrailer } from "../utils/store/movieSlice";
// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { addTrailerMovie, setTrailerError } from "../utils/store/gptSlice";


// const useMovieTrailerVideo = (trailerId, isTrailer = true)=>{
  
//     const dispatch = useDispatch();
//     const trailer = useSelector(store => store.movies.trailerVideo);

//   const getMovieTrailer = async () => {
//     if (!trailerId) return;

//     try {
//       const response = await fetch(`https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`, API_OPTIONS);
//       const data = await response.json();
      
//       if (!data.results || data.results.length === 0) {
//         if (!isTrailer) {
//           dispatch(setTrailerError("No trailer available for this movie."));
//         }
//         return;
//       }

//       const filterData = data.results.filter(video => video.type === "Trailer");
//       let trailer = data.results[0];
 
//       if (filterData.length > 0) {
//         trailer = filterData[0];
//       }

//       if(isTrailer){
//         dispatch(addMovieTrailer(trailer));
//       } else{
//         dispatch(addTrailerMovie(trailer));
//       }
//     } catch (error) {
//       if (!isTrailer) {
//         dispatch(setTrailerError("Failed to load trailer. Please try again."));
//       }
//     }
//   }

//   useEffect(()=>{
//     if (!trailer || !isTrailer) {
//       getMovieTrailer();
//     }
//   },[trailerId, isTrailer, trailer])
// }

// export default useMovieTrailerVideo;

import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../utils/store/movieSlice";
import { addTrailerMovie, setTrailerError } from "../utils/store/gptSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"; // ← TMDB KEY inside

// 🔑 Your API Keys
export const YOUTUBE_API_KEY = "AIzaSyBRft_91mS3ikPgOaS7MTqvqcTy1W-b-v8";
export const OMDB_KEY = "4fe26d2e";

/* -----------------------------------------
   1️⃣ TMDb → IMDb ID (NO CORS ISSUE)
------------------------------------------ */
const fetchImdbIdFromTMDB = async (tmdbId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`,
      API_OPTIONS
    );
    const data = await res.json();
    return data.imdb_id || null; // example: tt1234567
  } catch {
    return null;
  }
};

/* -----------------------------------------
   2️⃣ IMDb ID → Movie Title (OMDb)
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
      key: video.id.videoId, // same structure as TMDb
      name: video.snippet.title,
      site: "YouTube",
    };
  } catch {
    return null;
  }
};

/* -----------------------------------------
   ⭐ MAIN HOOK
------------------------------------------ */
const useMovieTrailerVideo = (tmdbId, isTrailer = true) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies.trailerVideo);

  const getTrailer = async () => {
    if (!tmdbId) return;

    try {
      // Step 1 → TMDb → IMDb ID
      const imdbId = await fetchImdbIdFromTMDB(tmdbId);
      if (!imdbId) {
        dispatch(setTrailerError("IMDb ID not found."));
        return;
      }

      // Step 2 → IMDb → Title
      const title = await fetchMovieTitle(imdbId);
      if (!title) {
        dispatch(setTrailerError("Movie title not found."));
        return;
      }

      // Step 3 → YouTube Trailer
      const trailerData = await fetchYouTubeTrailer(title);
      if (!trailerData) {
        dispatch(setTrailerError("No trailer available."));
        return;
      }

      // Step 4 → Save to Redux
      if (isTrailer) {
        dispatch(addMovieTrailer(trailerData));
      } else {
        dispatch(addTrailerMovie(trailerData));
      }
    } catch {
      dispatch(setTrailerError("Failed to load trailer."));
    }
  };

  useEffect(() => {
    if (!trailer || !isTrailer) {
      getTrailer();
    }
  }, [tmdbId, isTrailer, trailer]);
};

export default useMovieTrailerVideo;
