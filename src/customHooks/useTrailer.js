import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addCardTrailer } from "../utils/store/movieSlice"; // Import the correct action

const useTrailer = ({ trailerId }) => {
  const dispatch = useDispatch();
  
  const  cardTrailer = useSelector(store => store.movies.cardTrailer);

  const getTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();

      // Check if there's any trailer data
      if (data.results && data.results.length > 0) {
        const ctrailer = data.results[0]; // Get the first trailer

        // Dispatch the action to store the trailer in Redux
        dispatch(addCardTrailer(ctrailer));
      } else {
        console.warn("No trailer found for this movie.");
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  useEffect(() => {
  
     !cardTrailer && getTrailer();
   
  }, [trailerId]);
};

export default useTrailer;
