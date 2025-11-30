import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addCardTrailer } from "../utils/store/movieSlice"; // Import the correct action

const useTrailer = ({ trailerId }) => {
  const dispatch = useDispatch();
  
  const cardTrailers = useSelector(store => store.movies.cardTrailers);
  const currentTrailer = cardTrailers?.[trailerId];

  useEffect(() => {
    // Only fetch if we don't have a trailer for this specific movie
    if (!currentTrailer && trailerId) {
      const getTrailer = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`,
            API_OPTIONS
          );
          const data = await response.json();

          // Check if there's any trailer data
          if (data.results && data.results.length > 0) {
            // Filter for trailers first, then fallback to first video
            const filterData = data.results.filter(video => video.type === "Trailer");
            const ctrailer = filterData.length > 0 ? filterData[0] : data.results[0];

            // Dispatch the action to store the trailer in Redux with movieId
            dispatch(addCardTrailer({ movieId: trailerId, trailer: ctrailer }));
          } else {
            console.warn("No trailer found for this movie.");
          }
        } catch (error) {
          console.error("Failed to fetch trailer:", error);
        }
      };
      
      getTrailer();
    }
  }, [trailerId, currentTrailer, dispatch]);
};

export default useTrailer;
