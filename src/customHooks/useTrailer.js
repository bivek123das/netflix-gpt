// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addCardTrailer } from "../utils/store/movieSlice"; // Import the correct action

// const useTrailer = ({ trailerId }) => {
//   const dispatch = useDispatch();
  
//   const cardTrailers = useSelector(store => store.movies.cardTrailers);
//   const currentTrailer = cardTrailers?.[trailerId];

//   useEffect(() => {
//     // Only fetch if we don't have a trailer for this specific movie
//     if (!currentTrailer && trailerId) {
//       const getTrailer = async () => {
//         try {
//           const response = await fetch(
//             `https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`,
//             API_OPTIONS
//           );
//           const data = await response.json();

//           // Check if there's any trailer data
//           if (data.results && data.results.length > 0) {
//             // Filter for trailers first, then fallback to first video
//             const filterData = data.results.filter(video => video.type === "Trailer");
//             const ctrailer = filterData.length > 0 ? filterData[0] : data.results[0];

//             // Dispatch the action to store the trailer in Redux with movieId
//             dispatch(addCardTrailer({ movieId: trailerId, trailer: ctrailer }));
//           } else {
//             console.warn("No trailer found for this movie.");
//           }
//         } catch (error) {
//           console.error("Failed to fetch trailer:", error);
//         }
//       };
      
//       getTrailer();
//     }
//   }, [trailerId, currentTrailer, dispatch]);
// };

// export default useTrailer;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addCardTrailer } from "../utils/store/movieSlice";

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
   2️⃣ IMDb → Title (OMDb)
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
   ⭐ Main Hook: Card Trailer
------------------------------------------ */
const useTrailer = ({ trailerId }) => {
  const dispatch = useDispatch();
  const cardTrailers = useSelector((store) => store.movies.cardTrailers);
  const currentTrailer = cardTrailers?.[trailerId];

  useEffect(() => {
    if (!currentTrailer && trailerId) {
      const getTrailer = async () => {
        try {
          // Step 1 → TMDb → IMDb ID
          const imdbId = await fetchImdbIdFromTMDB(trailerId);
          if (!imdbId) return console.warn("IMDb ID not found");

          // Step 2 → IMDb → Movie Title
          const title = await fetchMovieTitle(imdbId);
          if (!title) return console.warn("Movie title not found");

          // Step 3 → Fetch YouTube Trailer
          const trailerData = await fetchYouTubeTrailer(title);
          if (!trailerData) return console.warn("Trailer not found");

          // Step 4 → Store in Redux
          dispatch(addCardTrailer({ movieId: trailerId, trailer: trailerData }));
        } catch (error) {
          console.error("Failed to fetch trailer:", error);
        }
      };

      getTrailer();
    }
  }, [trailerId, currentTrailer, dispatch]);
};

export default useTrailer;
