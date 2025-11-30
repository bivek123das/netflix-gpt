import React from "react";
import Header from "./Header";
import useNewPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./main/MainContainer";
import SecondaryContainer from "./secondary/SecondaryContainer";
import usePopularMovies from "../customHooks/usePopularMovies";
import { useDispatch, useSelector } from "react-redux";
import GptSearch from "./gpt/GptSearch";
import AboutMovie from "./gpt/AboutMovie";
import { toggleGptMovieView } from "../utils/store/gptSlice";
import useTopRated from "../customHooks/useTopRated";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";


const Browse = () => {
  useNewPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcomingMovies();
  
  const {showGptSearch, showMovieDes}= useSelector((store) => store.gpt);
  const movies = useSelector((store) => store.movies);
  const dispatch = useDispatch();

   const goToGptSearch = ()=>{
       dispatch(toggleGptMovieView());
   }

  const isLoading = !movies?.nowPlayingMovies;

  return (
    <div>
      <Header/>

      {isLoading ? (
        <div className='fixed inset-0 bg-black flex items-center justify-center z-50'>
          <div className='text-center'>
            <div className='w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-white text-xl font-semibold'>Loading your favorite movies...</p>
          </div>
        </div>
      ) : (
        <>
          {showGptSearch ? (
            showMovieDes ? <AboutMovie goToGptSearch={goToGptSearch}/> : <GptSearch/>
          ) : (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )}
        </>
      )}

    </div>
  );
};

export default Browse;
