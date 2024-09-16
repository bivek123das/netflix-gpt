
import React from 'react';
import {useNavigate} from "react-router-dom";

const MovieCards = ({posterPath, movieId}) => {

  

  const navigate = useNavigate();

    if (!posterPath) return null; 

    
     
    const handleMovieCard = ()=>{
      // console.log(movieId);
        navigate(`/movieview/${movieId}`)
    }

  return (
    <div className='w-36 md:w-48 p-4 md:pr-4 cursor-pointer'>
        <img onClick={handleMovieCard} alt="Movie-card" src={'https://image.tmdb.org/t/p/w500/'+posterPath}/>
    </div>
  )
}

export default MovieCards;  