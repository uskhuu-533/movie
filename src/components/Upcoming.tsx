"use client";
type elements = {
  options: object;
  movies: string[];
  poster_path: string;

};
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getMovieNowPlaying } from "@/utils/requests";
type data = {
  backdrop_path: string;
  title : string,
  overview : string,
  vote_average : number,
  id:number
};
const Upcoming = () => {
  const [movies, setMovies] = useState<data[]>([]);
  const router = useRouter()

  const options = {
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
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      const result = await response.json();

      setMovies(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(movies);
  useEffect(() => {
    // const result = await getMovieNowPlaying()
    // setMovies()
    getMovie();
  }, []);
  const handleMovieClick = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };
  return (
    <Carousel className="w-screen relative  w-max-screen h-[800px]">
      <CarouselContent>
        {movies.map((el: data, index) => (
          <CarouselItem key={index} onClick={()=>handleMovieClick(el.id)} className="md:basis-1/1 lg:basis-1/1">
            <div className="w-full w-max-screem relative flex items-center overflow-hidden h-[800px] ">
              <div className="absolute z-20 text-white">
                <div>
                  <p>Now playing</p>
                  <p>{el.title}</p>
                  <p>{el.vote_average}/10</p>
                </div>
                <div className="w-[300px] text-wrap ">{el.overview}</div>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}
                className="absolute z-10 w-full h-auto"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-[5%]" />
      <CarouselNext className="absolute right-[5%]" />
    </Carousel>
  );
};
export default Upcoming;

{
  /* <div className="h-[600px] flex gap-1 flex-grow  size-fit relative">
{movies.map((el, index)=>(
    <div key={index} className="w-screen relative h-[600px] ease-in-out duration-100" data-carousel-item> 
    <img  src={`https://image.tmdb.org/t/p/w500/${el.backdrop_path}`} className="absolute z-10 w-full h-[600px] "/>
    </div>
))}
</div> */
}
