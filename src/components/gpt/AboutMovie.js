import React from 'react'
import Header from "../Header";
import { useSelector } from 'react-redux';
import useMovieTrailerVideo from "../../customHooks/useMovieTrailerVideo";
import { BG_URL } from '../../utils/constants';

const AboutMovie = ({goToGptSearch, posterPath}) => {
  const {trailerId,trailerVideoOne} = useSelector((store) => store.gpt);
 
  useMovieTrailerVideo(trailerId ,false);



  return (
    <div className=''>
      <Header/>
      <img className='h-screen object-cover w-screen absolute -z-30'  src={BG_URL} alt="bg-img"/>
      <div>
      <button className='absolute z-50 bg-gray-500 p-1  text-white' onClick={goToGptSearch}>Back</button>
      </div>
      <div className='pt-[40%] md:pt-0'>
      {trailerVideoOne &&
         <iframe
        className="w-screen  aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideoOne?.key + "?&autoplay=1"
          
        }

        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>}
      </div>
    
    </div>
  )
}

export default AboutMovie; 


