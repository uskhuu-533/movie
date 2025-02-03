

const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
       `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    },
  };
  const options1 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ'
    }
  };
 export const getGenre = async () => {
    
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            options1
          );
          const result = await response.json();
         return result
        } catch (error) {
          console.error("Error fetching genres:", error);
        }
      
  };
export const getMovieNowPlaying = async ()=> {
  try{
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options1
  );
  const result = await response.json();
return result
  
} catch (error) {
  console.log(error);
} 
}
export const getMovieDetail = async (movieID:number) => {
  try {
    const [movieResponse, creditsResponse, videoResponse, similarResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options1),
      fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`, options1),
      fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, options1),
      fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1`, options1),
    ]);


    const [movieDetails, actorsDetails, trailer, similaMovies] = await Promise.all([
      movieResponse.json(),
      creditsResponse.json(),
      videoResponse.json(),
      similarResponse.json(),
      
    ]);
    return ({ movieDetails, actorsDetails, trailer, similaMovies: similaMovies.results });
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}
  export const getMovieGenres =async (genreID, currentPage) => {
    try {
     
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreID}&page=${currentPage}`,
        options1
      );
      const result = await response.json();

      return result
   
    } catch (error) {
      console.log(error);
    }
  } 

  export const getTailer = async (movieID) => {
    try { 
     const response =await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, options1)
     const result = await response.json()
     console.log(result.results, "temdeg")
     return result.results[0].key
    }catch(error){
      console.error();
      
    }
  }