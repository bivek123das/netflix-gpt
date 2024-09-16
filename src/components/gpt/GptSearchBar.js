import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import lang from "../../utils/languageConstants";
import { API_OPTIONS } from '../../utils/constants';
import { addgptMovies } from '../../utils/store/gptSlice';

const GptSearchBar = () => {

    const langKey  = useSelector(store => store.config.lang);
    const searchText = useRef();
    const dispatch = useDispatch();

    const handleGptSearchClick = async ()=>{
        const moviename= searchText.current.value;

        const response = await fetch('https://api.themoviedb.org/3/search/movie?query='+moviename+'&include_adult=false&language=en-US&page=1', API_OPTIONS)

        const data = await response.json();
        dispatch(addgptMovies({gptMovieName: moviename, gptMovieResults:data.results}));
        } 
    

  return (
    <div className='pt-[40%] md:pt-[20%] lg:pt-[10%] flex justify-center'>
         <form className='w-full mt-4 md:mt-0 md:w-3/4 lg:w-1/2 bg-black grid grid-cols-12 rounded-lg' onSubmit={(e)=> e.preventDefault()}>
              <input ref={searchText} type='text' className='col-span-9 text-sm md:text-md outline-none p-3 m-4 rounded-md' placeholder={lang[langKey].gptSearchPlaceholder}/>
              <button className='bg-red-500 col-span-3  ml-0 mr-4 my-4 md:m-4 py-1 px-2 md:py-2 md:px-4 rounded-md' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
         </form>
    </div>
  )
}

export default GptSearchBar;
