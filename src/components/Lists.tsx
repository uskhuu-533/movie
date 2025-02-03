"use client";

// import { Star } from "lucide-react";
import Star from "./icon/Star";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SeeMore from "./icon/SeeMore";


type data = {
  poster_path: string;
  vote_average: string;
  title: string;
  id: number;
};
const Lists = ({ title }: { title: string }) => {
  const router = useRouter();
  const [movies, setMovies] = useState<data[]>([]);

  
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
    },
  };

  const getMovie = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      );
      const topRated = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      );
      const popular = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );
      const popularResult = await popular.json();
      const result = await response.json();
      const topRatedResult = await topRated.json();
      setMovies(result.results);
      if (title === "Upcoming") {
        setMovies(result.results);
      } else if (title == "Top Rated") {
        setMovies(topRatedResult.results);
      } else if (title === "Popular") {
        setMovies(popularResult.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  movies.length = 10;
  // console.log(movies)
  useEffect(() => {
    getMovie();
  }, []);
  const handleMovieClick = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };
  const handleCategoryClick = ()=> {
    const category = title.toLowerCase().replace(" ","_")
 
    router.push(`/category/${category}?page=1`);

  }
  return (
    <div className="flex flex-col gap-8 ">
      <div className="w-full justify-between flex px-4 h-9">
        <p className="text-foreground text-2xl text-white font-semibold">
          {title}
        </p>
        <button className="font-semibold flex items-center gap-2 hover:gap-3" onClick={handleCategoryClick}>
          <p>see more</p>
          <SeeMore />
          </button>
      </div>
      <div className="w-full grid grid-flow-row md:grid-cols-5 sm:grid-cols-3 sm:px-4 md:px-4 gap-8 2xl:grid-cols-5  xl:grid-cols-4">
        {movies.map((el: data, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden relative "
            onClick={() => handleMovieClick(el.id)}
          >   <div className="w-full h-full absolute z-10 hover:bg-white/30"></div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
              className="w-full h-[77%] hover:bg-primary/30"
            />
            
            <div className="w-full h-[33%] p-2 pt-4 dark:bg-[#27272A] light:bg-muted">
              <div>
                <div className="flex gap-2">
                  <Star width="18px" height="20px"/>
                  <div className="flex items-center">   <p className="font-semibold">{el.vote_average}</p>
                  <p className="text-gray-400 text-sm">/10</p></div>
                 
                </div>
                <p className="text-xl font-semibold">{el.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Lists;
