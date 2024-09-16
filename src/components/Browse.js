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
   const dispatch = useDispatch();

   const goToGptSearch = ()=>{
       dispatch(toggleGptMovieView());
   }

  return (
    <div>
      <Header/>

      {showGptSearch ? (
        showMovieDes ? <AboutMovie goToGptSearch={goToGptSearch}/> : <GptSearch/>
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

    </div>
  );
};

export default Browse;
