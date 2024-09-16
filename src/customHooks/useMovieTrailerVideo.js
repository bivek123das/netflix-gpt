import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../utils/store/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerMovie } from "../utils/store/gptSlice";


const useMovieTrailerVideo = (trailerId, isTrailer = true)=>{
  
    const dispatch = useDispatch();
    const trailer = useSelector(store => store.movies.trailerVideo);

  const getMovieTrailer = async () => {

    const response = await fetch(`https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`, API_OPTIONS);
    const  data = await response.json();
    

    const filterData = data.results.filter(video => video.type === "Trailer");
    let trailer =  data.results[0];
 
    if (filterData.length > 0) {
      trailer = filterData[0];
  }

    if(isTrailer){
    dispatch(addMovieTrailer(trailer));
    } else{
    dispatch(addTrailerMovie(trailer));
    }
  }

  useEffect(()=>{
    if (!trailer || !isTrailer) {

      getMovieTrailer();
  }
  },[trailerId, isTrailer, trailer])
}

export default useMovieTrailerVideo;