import React from 'react'
import { useSelector } from 'react-redux'
import GptMovieList from './GptMovieList';

const GptMovieSuggestions = () => {

const {gptMovieName, gptMovieResults} = useSelector(store => store.gpt);


 if(!gptMovieName) return null;

  return (
    <div className='px-2 py-4 md:mx-2 my-10 text-white bg-black bg-opacity-80'>
          <GptMovieList title={gptMovieName.toUpperCase()} movies={gptMovieResults}/>
    </div>
  )
}

export default GptMovieSuggestions;
