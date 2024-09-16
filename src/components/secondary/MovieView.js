import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useTrailer from '../../customHooks/useTrailer';
import { BG_URL } from '../../utils/constants';
import "./shimmer.css";


const MovieView = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  useTrailer({trailerId: movieId}); // Fetch trailer when component mounts

  const trailer = useSelector(store => store.movies?.cardTrailer);

  const handleBack = () => {
    navigate('/browse');
  };  
  return (
    <div className=''>
      <img className='h-screen object-cover w-screen absolute -z-30' src={BG_URL} alt="bg-img"/>
      
      <button onClick={handleBack} className=' absolute text-white px-3 py-1 rounded-md bg-gray-500 mx-[50%] mt-[5%] jutify-center'>Back</button>
    <div className=''>
      {trailer ? (
        <iframe
         className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailer.key}?&autoplay=1`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="shimmer w-screen aspect-video"></div>
      )}
    </div>
    </div>
  );
};

export default MovieView;

