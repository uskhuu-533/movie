"use client"
type elements ={
    options : object,
    movies : string[],
    poster_path:string

}
import { useEffect, useState } from "react"

const Upcoming = ()=> {
       const [movies, setMovies] = useState([])
     
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ'
            }
          };
    
     const getMovie = async () => {
        try {
          
          const response = await  fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
          const result = await response.json()
          
          setMovies(result.results)
        
    
          
          
        } catch (error) {
          console.log(error);
        }
      };
    movies.length = 4
      console.log(movies)
      useEffect(()=>{
        getMovie();
       
      },[])
    return(
        <div className="w-full h-[600px] mt-[80px] relative overflow-hidden" id="default-carousel" data-carousel="slide">
        <div className="h-[600px] flex gap-1 flex-grow  size-fit relative">
            {movies.map((el, index)=>(
                <div key={index} className="w-screen relative h-[600px] ease-in-out duration-100" data-carousel-item> 
                <img  src={`https://image.tmdb.org/t/p/w500/${el.backdrop_path}`} className="absolute z-10 w-full h-[600px] "/>
                </div>
            ))}
        </div>
 
        </div>
    )
}
export default Upcoming