"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
      if (title === "upcoming") {
        setMovies(result.results);
      } else if (title == "Top Rated") {
        setMovies(topRatedResult.results);
      } else if (title === "popular") {
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
      <div className="w-full justify-between flex h-9">
        <p className="text-foreground text-2xl text-white font-semibold">
          {title}
        </p>
        <button onClick={handleCategoryClick}>see more</button>
      </div>
      <div className="w-full h-[912px] grid grid-flow-col grid-rows-2 gap-8">
        {movies.map((el: data, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden "
            onClick={() => handleMovieClick(el.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
              className="w-full h-[77%] hover:bg-primary/30"
            />
            <div className="w-full h-[33%] p-2 bg-[#27272A]">
              <div>
                <div className="flex">
                  <Star />
                  <p>{el.vote_average}/10</p>
                </div>
                <p>{el.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Lists;
