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

// CORS proxy
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    dispatch(setLoading(true));

    try {
      const url = encodeURIComponent("https://api.themoviedb.org/3/movie/upcoming?page=1");
      const response = await fetch(CORS_PROXY + url, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`TMDB fetch failed: ${response.status}`);
      }

      const data = await response.json();
      dispatch(addUpcomingMovies(data.results));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!upcomingMovies || upcomingMovies.length === 0) {
      getUpcomingMovies();
    }
  }, [upcomingMovies]);
};

export default useUpcomingMovies;

