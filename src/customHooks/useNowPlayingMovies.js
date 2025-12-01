import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies, setLoading } from '../utils/store/movieSlice'
import { useEffect } from 'react';


const useNewPlayingMovies = ()=>{
 // Fetch data from TMDB API and update store
   
 const dispatch = useDispatch();

 const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies);

 const getNowPlayingMovies = async ()=>{
     dispatch(setLoading(true));
     const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
     const data = await response.json();
    //  console.log(data.results);
     dispatch(addNowPlayingMovies(data.results));
     dispatch(setLoading(false));
     
}

 useEffect(()=>{
   !nowPlayingMovies && getNowPlayingMovies();
 },[])

}

export default useNewPlayingMovies;



