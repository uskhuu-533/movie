"use client";
type elements = {
  options: object;
  movies: string[];
  poster_path: string;
};
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getMovieNowPlaying, getTailer } from "@/utils/requests";
import Star from "./icon/Star";
type data = {
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id: number;
};
const inter = Inter({ subsets: ["latin"] });
const Upcoming = () => {
  const [display, setDisplay] = useState(false);
  const [movies, setMovies] = useState<data[]>([]);
  const router = useRouter();
  const [video, setVideo] = useState("");

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const data = await getMovieNowPlaying();
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch now-playing movies:", error);
      }
    };

    fetchNowPlayingMovies();
  }, []);
  const handleMovieClick = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };

  const fetchTrailer = async (movieID: number) => {
    try {
      const trailer = await getTailer(movieID);
      setVideo(trailer);
    } catch (error) {
      console.error();
    } finally {
      setDisplay(true);
    }
  };

  return (
    <>
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
      <Carousel className="w-screen relative mt-[60px]  w-max-screen h-[600px]">
        <CarouselContent>
          {movies.map((el: data, index) => (
            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
              <div className="w-full w-max-screem relative flex items-center overflow-hidden h-[600px] ">
                <div className="absolute z-10 text-white  space-y-4 left-[10%]">
                  <div className={`${inter.className} `}>
                    <p className={` text-[16px]`}>Now playing:</p>
                    <p className="w-52 text-2xl font-semibold truncate">
                      {el.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star height="32px" width={"30px"} />
                      <div className="flex items-center">
                        <p className="font-semibold">{el.vote_average}</p>
                        <p className="text-gray-400 text-sm">/10</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[302px] text-md font-[500] line-clamp-5 ">
                    {el.overview}
                  </div>
                  <button
                    onClick={() => fetchTrailer(el.id)}
                    className="dark:bg-black/90 bg-white absolute text-black dark:text-white rounded-md px-5 py-2 z-40 "
                  >
                    Watch trailer
                  </button>
                </div>
                <img
                  onClick={() => handleMovieClick(el.id)}
                  src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}
                  className="absolute  w-full h-auto"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-[5%]" />
        <CarouselNext className="absolute right-[5%]" />
      </Carousel>
    </>
  );
};
export default Upcoming;
