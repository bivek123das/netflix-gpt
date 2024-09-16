
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
    <div className='w-36 md:w-48 p-4 md:pr-4 cursor-pointer'>
        <img  onClick={handleClickMovieDescription} alt="Movie-card" src={'https://image.tmdb.org/t/p/w500/'+posterPath}/>
    </div>
  )
}

export default GptMovieCards;  