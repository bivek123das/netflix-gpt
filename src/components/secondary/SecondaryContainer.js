import React from 'react';
import {useSelector} from "react-redux";
import MovieList from './MovieList';

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies);
  // console.log(movies);
  return (
    movies.nowPlayingMovies && (
    <div className='bg-black'>
      <div className='mt-0 md:-mt-[15%]  lg:-mt-50 pl-4 md:pl-12 relative z-30'>
       <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
       <MovieList title={"Trending"} movies={movies?.topRatedMovies}/>
       <MovieList title={"Popular"} movies={movies?.popularMovies}/>
       <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>
       <MovieList title={"Horror"} movies={movies?.nowPlayingMovies}/>
     </div>
    </div>
    )
  )
}

export default SecondaryContainer;
