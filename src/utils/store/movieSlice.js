import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name: 'movies',
    initialState:{
        nowPlayingMovies: null,
        popularMovies : null,
        trailerVideo : null,
        topRatedMovies : null,
        upcomingMovies: null,
        cardTrailer: null,
    },
    reducers:{
        addNowPlayingMovies: (state,action)=>{
            state.nowPlayingMovies = action.payload;
        },

        addPopularMovies: (state,action) =>{
            state.popularMovies = action.payload;
        },

        addTopRatedMovies: (state,action)=>{
             state.topRatedMovies = action.payload;
        },

        addUpcomingMovies: (state,action)=>{
            state.upcomingMovies = action.payload;
        },
      
        addMovieTrailer : (state,action)=>{
            state.trailerVideo = action.payload;
        },
        addCardTrailer : (state,action)=>{
            state.cardTrailer = action.payload;
        },
    },
})

export const {addNowPlayingMovies, addPopularMovies, addMovieTrailer, addTopRatedMovies, addUpcomingMovies, addCardTrailer} = movieSlice.actions;
export default movieSlice.reducer;