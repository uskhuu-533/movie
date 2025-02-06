"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

import SeeMore from "./icon/SeeMore";
// import { Star } from "lucide-react";
import Star from "./icon/Star";

type Genre = {
  id: number;
  name: string;
};
type Movie = {
  id: number;
  title: string;
  release_date: string;
  origin_country: string[];
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genres: { id: number; name: string }[] | undefined;
  runtime: number
};

type ActorsDetails = {
  crew: { name: string }[];
  cast: { name: string }[];
};

type SimilarMovies = {
  results:
    | {
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
      }[]
    | undefined;
};

type Trailer = {
  results: { key: string }[] | undefined;
};

type Props = {
  movieDetails: Movie | undefined;
  actorsDetails: ActorsDetails | undefined;
  trailer: Trailer | undefined;
  similaMovies: SimilarMovies["results"] | undefined;
};
const MovieDetails = ({
  movieDetails,
  actorsDetails,
  trailer,
  similaMovies,
}: Props) => {
  console.log(movieDetails);
  console.log(similaMovies);

  if (
    movieDetails &&
    actorsDetails &&
    trailer &&
    similaMovies &&
    trailer.results
  ) {
    const router = useRouter();

    const [display, setDisplay] = useState(false);
    const genres = movieDetails?.genres;
    const director = actorsDetails?.crew[0]?.name;
    const video = trailer.results[0]?.key;
    similaMovies.length = 5;
    const handleMovieClick = (movieID: number) => {
      router.push(`/movies/${movieID}`);
    };
    const handleSimilarClick = () => {
      const category = movieDetails.id;
      router.push(`/category/${category}/similar?page=1`);
    };
    const hour = Math.floor((movieDetails.runtime)/60)
    const minut = movieDetails.runtime-hour*60
    return (
      <>
        <div className="w-[1080px] flex gap-6  items-center flex-col mt-[200px]">
          <div className="w-full h-[72px] flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
              <p className="text-lg">
                {movieDetails.release_date} • {movieDetails.origin_country[0]} • {hour}h {minut}m
                
              </p>
            </div>
            <div>
              <p className="text-sm">Rating</p>
              <div className="flex">
                <Star height="35px" width="35px"/>
                <div>
                <div className="flex items-center ">
                  <div className="text-bold text-md">{movieDetails.vote_average}/</div>
                  <div className="text-sm ">10</div>
                </div>
                <div className="text-gray-500/30 text-sm">{movieDetails.vote_count}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between h-[428px] w-full">
            <div className="w-[28%] h-full overflow-hidden rounded-sm">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              />
            </div>
            <div className="w-[70%] h-full relative rounded-sm overflow-hidden">
              <img
                className="bg-[rgba(0, 0, 0, 0.4)] h-full relative"
                src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              />
              <div className="absolute flex items-center gap-4 bottom-8 left-6">
                <div
                  className="w-9 h-9 dark:bg-white bg-black rounded-full flex items-center justify-center relative overflow-hidden "
                  onClick={() => setDisplay(true)}
                >
                  <div className="dark:bg-black bg-white w-3 h-5 "></div>
                  <div className="dark:bg-white bg-black w-4 h-10 rotate-45 top-4 absolute"></div>
                  <div className="dark:bg-white bg-black w-4 h-10 -rotate-45 bottom-4 absolute"></div>
                </div>
                <p className="text-lg text-white font-semibold">Play trailer</p>
              </div>
            </div>
          </div>
          <div className="flex">
            {genres &&
              genres.map((genre: Genre) => (
                <div
                  className="flex items-center px-2.5 py-0.5 font-semibold border border-[#27272A] rounded-full"
                  key={genre.id}
                >
                  {genre.name}
                </div>
              ))}
          </div>
          <div className="text-lg">{movieDetails.overview}</div>
          <div className="w-full flex flex-col text-lg gap-4">
            <div className="w-full border-b flex gap-5 border-b-[#27272A]">
              <p className="font-bold">Director:</p>
              <p className="">{director}</p>
            </div>
            <div className="w-full border-b flex gap-5 border-b-[#27272A]">
              <p className="font-bold">Writters:</p>
              <p className="">{}</p>
            </div>
            <div className="w-full border-b flex gap-5 border-b-[#27272A]">
              <p className="font-bold">Stars:</p>
              {actorsDetails.cast.slice(0, 5).map((cast, index) => (
                <p key={index}>{cast.name}</p>
              ))}
            </div>
          </div>
   

          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full justify-between">
              <div className="text-2xl font-bold ">More like this</div>
              <div className="flex items-center gap-1 font-semibold">
                <button onClick={handleSimilarClick}>see more</button>
                <SeeMore />
              </div>
            </div>
            <div className="w-full h-[381px] grid grid-flow-row grid-cols-5 gap-8">
              {similaMovies.map((results, index: number) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden"
                  onClick={() => handleMovieClick(results.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`}
                    className="w-full h-[70%] hover:bg-primary/30"
                  />
                  <div className="h-[30%] bg-gray-500/30 w-full p-4">
                    <div>
                      <div className="flex gap-2">
                        <Star width="18px" height="20px" />
                        <div className="flex items-center">
                          {" "}
                          <p className="font-semibold">
                            {results.vote_average}
                          </p>
                          <p className="text-gray-400 text-sm">/10</p>
                        </div>
                      </div>
                      <p className="text-xl font-semibold line-clamp-2">
                        {results.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {display == true && (
        <div
          onClick={() => setDisplay(false)}
          className="w-screen h-full z-30 bg-black/80 flex justify-center items-center fixed"
        >
          <div className="w-[512px] h-[280px] z-20 top-[30%]">
            <div className="w-full h-full relative ">
              <button
                onClick={() => setDisplay(false)}
                className="w-5 h-5 absolute z-30 right-3 top-3"
              >
                x
              </button>
              <iframe
                className="w-full h-full absolute"
                title="trailer"
                src={`https://www.youtube.com//embed/${video}`}
                allowFullScreen
              >
                {" "}
              </iframe>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }
};
export default MovieDetails;
