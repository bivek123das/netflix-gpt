import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies, setLoading } from "../utils/store/movieSlice";


const usePopularMovies = ()=>{

    const dispatch = useDispatch();

    const popularMovies = useSelector(store => store.movies.popularMovies)

    const getPopularMovies = async ()=>{
        dispatch(setLoading(true));
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?&page=1', API_OPTIONS);
        const data = await response.json();
        dispatch(addPopularMovies(data.results));
        dispatch(setLoading(false));
    }

    useEffect(()=>{
        !popularMovies && getPopularMovies();
    },[])
}

export default usePopularMovies;

