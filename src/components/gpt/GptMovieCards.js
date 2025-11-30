
import React from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { addTrailerId, toggleGptMovieView } from '../../utils/store/gptSlice';

const GptMovieCards = ({posterPath, movieId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    if (!posterPath) return null; 
     
   

    const handleClickMovieDescription = ()=>{
       dispatch(toggleGptMovieView())
       dispatch(addTrailerId(movieId));
       navigate("/aboutmovie")
    }
  return (
    <div className='w-28 sm:w-32 md:w-36 lg:w-48 flex-shrink-0 p-1 sm:p-2 md:p-4 cursor-pointer transition-transform hover:scale-105'>
        <img  onClick={handleClickMovieDescription} alt="Movie-card" className='w-full h-auto rounded-md' src={'https://image.tmdb.org/t/p/w500/'+posterPath}/>
    </div>
  )
}

export default GptMovieCards;  