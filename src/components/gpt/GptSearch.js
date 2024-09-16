import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../../utils/constants';
import Particle from '../../utils/Particle';

const GptSearch = () => {
  return (
    <>
       <div className='fixed -z-10'>
            <img className='h-screen object-cover w-screen' alt="background-image" src={BG_URL}/>
            <Particle/>
       </div>

       <div className=''>
         <GptSearchBar/>
         <GptMovieSuggestions/>
        </div> 
    </>
  )
}

export default GptSearch;
