"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SeeMore from "./icon/SeeMore";
// import { Star } from "lucide-react";
import Star from "./icon/Star";
import { X } from "lucide-react";
import { getMovieDetail, getTailer } from "@/utils/requests";
import MovieDetailLoading from "./loading/Movie-Detail-Loading";

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
  runtime: number;
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

type Props = {
  movieID: string | string[] | undefined;
};
type MovieData = {
  movieDetails: Movie | undefined;
  actorsDetails: ActorsDetails | undefined;
  similaMovies: SimilarMovies["results"] | undefined;
};
const MovieDetails = ({ movieID }: Props) => {
  const router = useRouter();
  const [movieData, setMovieData] = useState<MovieData | undefined>({
    movieDetails: undefined,
    actorsDetails: undefined,
    similaMovies: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState("");
  useEffect(() => {
    if (movieID) {
      setIsLoading(true);
      const fetchMovieDetails = async () => {
        try {
          const data = await getMovieDetail(movieID);
          setMovieData(data);
        } catch (error) {
          console.log("Failed to fetch", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMovieDetails();
    }
  }, [movieID]);
  const playTrailer = async () => {
    try {
      const trailer = await getTailer(movieID);
      setVideo(trailer);
      console.log(video);
    } catch (error) {
      console.error();
    } finally {
      setDisplay(true);
    }
  };

  const { movieDetails, actorsDetails, similaMovies } = movieData ?? {};

  const [display, setDisplay] = useState(false);
  const genres = movieDetails?.genres;
  const director = actorsDetails?.crew[0]?.name;
  // const video = trailer?.results?[0]?.key;

  const handleMovieClick = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };
  const handleSimilarClick = () => {
    const category = movieDetails?.id;
    router.push(`/category/${category}/similar?page=1`);
  };

  return (
    <>
      {isLoading == false ? (
        <div className="max-w-[1080px] flex gap-6  items-center flex-col mt-[200px]">
          <div className="w-full h-fit flex justify-between xl:px-0 px-8">
            <div>
              <h1 className="text-3xl font-bold">{movieDetails?.title}</h1>
              {movieDetails && (
                <p className="text-lg">
                  {movieDetails?.release_date} •{" "}
                  {movieDetails?.origin_country[0]} •{" "}
                  {Math.floor(movieDetails.runtime / 60)}h{" "}
                  {movieDetails.runtime -
                    Math.floor(movieDetails.runtime / 60) * 60}
                  m
                </p>
              )}
            </div>
            <div>
              <p className="text-sm">Rating</p>
              <div className="flex">
                <Star height="35px" width="35px" />
                <div>
                  <div className="flex items-center ">
                    <div className="text-bold text-md">
                      {movieDetails?.vote_average}/
                    </div>
                    <div className="text-sm ">10</div>
                  </div>
                  <div className="text-gray-500/30 text-sm">
                    {movieDetails?.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between sm:h-[428px] overflow-hidden h-[250px] px-6 xl:px-0 w-full">
            <div className="w-[28%] lg:block hidden h-fit overflow-hidden rounded-sm">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
              />
            </div>
            <div className="lg:w-[70%] w-full h-auto relative rounded-sm overflow-hidden">
              <img
                className="bg-[rgba(0, 0, 0, 0.4)] h-full w-full w-auto  absolute"
                src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
              />
              <div className="absolute flex items-center gap-4 bottom-8 left-6">
                <div
                  className="w-9 h-9 dark:bg-white bg-black rounded-full flex items-center justify-center relative overflow-hidden "
                  onClick={() => playTrailer()}
                >
                  <div className="dark:bg-black bg-white w-3 h-5 "></div>
                  <div className="dark:bg-white bg-black w-4 h-10 rotate-45 top-4 absolute"></div>
                  <div className="dark:bg-white bg-black w-4 h-10 -rotate-45 bottom-4 absolute"></div>
                </div>
                <p className="text-lg text-white font-semibold">Play trailer</p>
              </div>
            </div>
          </div>
          <div className="sm:flex-row flex flex-col xl:px-0 px-8 gap-4">
            <div className="flex lg:hidden h-full gap-2 sm:w-[28%] w-[100%]">
              <div className="w-full lg:hidden  h-full overflow-hidden rounded-sm">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
                />
              </div>
              <div className="flex w-full h-fit sm:hidden gap-2 flex-wrap">
                {genres &&
                  genres.map((genre: Genre) => (
                    <div
                      className="flex items-center px-2.5 py-0.5 h-[40px] font-semibold border border-[#27272A] rounded-full"
                      key={genre.id}
                    >
                      {genre.name}
                    </div>
                  ))}
              </div>
            </div>
            <div className=" w-full flex flex-col gap-4">
              <div className="sm:flex gap-2 w-full hidden flex-wrap">
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
              <div className="text-lg">{movieDetails?.overview}</div>
            </div>
          </div>
          <div className="w-full flex flex-col h-fit text-lg gap-4 xl:px-0 px-6">
            <div className="w-full border-b flex gap-5 border-b-[#27272A]">
              <p className="font-bold">Director:</p>
              <p className="">{director}</p>
            </div>
            <div className="w-full border-b flex gap-5 border-b-[#27272A]">
              <p className="font-bold">Writters:</p>
              <p className="">{}</p>
            </div>
            <div className="w-full border-b flex h-fit gap-5 border-b-[#27272A]">
              <p className="font-bold">Stars:</p>
              <div className="flex flex-wrap">
                {actorsDetails?.cast.slice(0, 5).map((cast, index) => (
                  <p key={index}>{cast.name}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 xl:px-0 px-8">
            <div className="flex w-full justify-between">
              <div className="text-2xl font-bold ">More like this</div>
              <div className="flex items-center gap-1 font-semibold">
                <button onClick={handleSimilarClick}>see more</button>
                <SeeMore />
              </div>
            </div>
            <div className="w-full flex flex-wrap gap-8">
              {similaMovies?.slice(0, 5).map((results, index: number) => (
                <div
                  key={index}
                  className="rounded-lg h-[381px] max-w-[190px] w-full relative overflow-hidden group"
                  onClick={() => handleMovieClick(results.id)}
                >
                  <div className="w-full h-[70%] absolute z-10 dark:group-hover:bg-white/30 group-hover:bg-black/30"></div>
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
      ) : (
        <MovieDetailLoading />
      )}
      {display == true && (
        <div
          onClick={() => setDisplay(false)}
          className="w-screen h-full z-30 bg-black/80 flex justify-center items-center fixed"
        >
          <div className="max-w-[512px] w-full h-[280px] z-20 top-[30%] lg:max-w-[800px] lg:h-[450px]">
            <div className="w-full h-full relative ">
              <button
                onClick={() => setDisplay(false)}
                className="w-5 h-5 absolute z-30 right-3 top-3"
              >
                <X />
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
};
export default MovieDetails;
