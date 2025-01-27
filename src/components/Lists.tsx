"use client"
type elements = {
    movies : string[],
    isLoading : boolean,
    options : object,
    poster_path: string,
    el : object,
    result : object,
    popularResult :object,
    topRatedResult :object

}

import { useState, useEffect } from "react"
const Lists = ({ title }: { title: string }) => {
    const [movies, setMovies] = useState([])
    const [image, setImage] = useState({})
    const account_id = 21777990
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
      const topRated = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
      const popular = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
      const popularResult = await popular.json()
      const result = await response.json()
      const topRatedResult = await topRated.json()
      setMovies(result.results)
      if (title === "Upcoming"){
        setMovies(result.results)
      }else if(title == "Top Rated"){
        setMovies(topRatedResult.results)
      }else if(title === "Popular"){
        setMovies(popularResult.results)
      }else{
        setMovies([])
      }

      
      
    } catch (error) {
      console.log(error);
    }
  };
movies.length = 10
  console.log(movies)
  useEffect(()=>{
    getMovie();
   
  },[])
    return(
        <div className="flex flex-col gap-8">
            <div className="w-full justify-between flex h-9">
                <p className="text-foreground text-2xl font-semibold">{title}</p>
                <p>see more</p>
            </div>
        <div className="w-full h-[912px] grid grid-flow-col grid-rows-2 gap-8">
          {movies.map((el, index)=>(
            <div key={index} className="rounded-lg overflow-hidden ">
            <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} className="w-full h-[77%] hover:bg-primary/30" />
            <div className="w-full h-[33%] p-2 bg-[#27272A]">
                <div>
                    <div className="flex">
                        <img src="star.svg"/>
                        <p>{el.vote_average}/10</p>
                    </div>
                    <p>{el.title}</p>
                </div>
            </div>
            </div>
          ))}
        </div>
        </div>
    )

}
export default Lists