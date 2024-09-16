import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailerVideo from "../../customHooks/useMovieTrailerVideo";

const VideoBackground = ({ movieid }) => {
  // fetch the trailer video and updating the store with trailer video data

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailerVideo(movieid);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key + "?&autoplay=1&mute=1"
          
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
