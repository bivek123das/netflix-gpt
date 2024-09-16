import React from "react";
import GptMovieCards from "./GptMovieCards";


const GptMovieList = ({ movies, title}) => {
  return (
    <div>
      <div className="bg-black bg-opacity-65 md:p-10 p-1 mx-20 my-5 ">
            <h1 className="text-center">{title} Movies</h1>
        <div className="flex  flex-wrap justify-center">
          {movies.map((movie) => {
            return (
                <GptMovieCards key={movie.id} posterPath={movie.poster_path} movieId={movie.id}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GptMovieList;
