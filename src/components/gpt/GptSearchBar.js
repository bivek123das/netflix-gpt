import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import lang from "../../utils/languageConstants";
import { API_OPTIONS } from '../../utils/constants';
import { addgptMovies } from '../../utils/store/gptSlice';

const GptSearchBar = () => {

    const langKey  = useSelector(store => store.config.lang);
    const searchText = useRef();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleGptSearchClick = async () => {
      const moviename = searchText.current.value.trim();
  
      // 🔴 Check if input is empty
      if (!moviename) {
          alert("Please enter a movie name.");   // <-- popup message
          setErrorMessage("Please enter a movie name.");
          return;   // stop further execution
      }
  
      const response = await fetch(
          'https://api.themoviedb.org/3/search/movie?query=' +
          moviename +
          '&include_adult=false&language=en-US&page=1',
          API_OPTIONS
      );
  
      const data = await response.json();
      console.log(moviename, data);
  
      if (!data.results || data.results.length === 0) {
          setErrorMessage(`No movies found for "${moviename}". Please try a different search term.`);
          dispatch(addgptMovies({ gptMovieName: moviename, gptMovieResults: [] }));
      } else {
          setErrorMessage(null);
          dispatch(addgptMovies({ gptMovieName: moviename, gptMovieResults: data.results }));
      }
  
      searchText.current.value = '';
  };
  
    

  return (
    <div className='pt-24 sm:pt-32 md:pt-[20%] lg:pt-[10%] flex justify-center px-4'>
         <form className='w-full max-w-4xl mt-4 md:mt-0 bg-black grid grid-cols-12 rounded-lg' onSubmit={(e)=> e.preventDefault()}>
              <input ref={searchText} type='text' className='col-span-8 sm:col-span-9 text-xs sm:text-sm md:text-md outline-none p-2 sm:p-3 m-2 sm:m-4 rounded-md' placeholder={lang[langKey].gptSearchPlaceholder}/>
              <button className='bg-red-500 col-span-4 sm:col-span-3 ml-0 mr-2 sm:mr-4 my-2 sm:my-4 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md hover:bg-red-600 transition-colors text-xs sm:text-sm md:text-base' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
         </form>
        
    </div>
  )
}

export default GptSearchBar;
