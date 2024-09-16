import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] md:pt-[15%]  px-4 md:px-20 absolute text-white bg-gradient-to-r from-black'>
         <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold'>{title}</h1>
         <p className='hidden md:inline-block  md:py-3  lg:py-6 md:w-2/4 lg:w-1/4  lg:text-md md:text-xs'>{overview}</p>
         <div className='my-2'>
             <button className='bg-white text-black  px-2 md:px-10 md:py-2 rounded-lg text-lg hover:bg-opacity-80'>▶️ Play</button>
             <button className='hidden md:inline-block bg-gray-400  px-10 py-2 rounded-lg text-lg mx-2'>More Info</button>
         </div>
    </div>
  )
}

export default VideoTitle
