"use client";
type elements = {
  options: object;
  movies: string[];
  poster_path: string;
};
import { useCallback, useEffect, useState } from "react";
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
import { X } from "lucide-react";
type data = {
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id: string;
};


const Upcoming = () => {
  const [display, setDisplay] = useState(false);
  const [movies, setMovies] = useState<data[]>([]);
  const router = useRouter();
  const [video, setVideo] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const updateTarget = useCallback(
    (e: MediaQueryListEvent) => {
      console.log(e.matches);
      if (e.matches) {
        setIsLargeScreen(true);
      } else {
        setIsLargeScreen(false);
      }
    },
    [setIsLargeScreen]
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(`(max-width: 1024px)`);
      media.addEventListener("change", updateTarget);
    }
  }, []);

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
  const handleMovieClick = (movieID: string) => {
    router.push(`/movies/${movieID}`);
  };

  const fetchTrailer = async (movieID: string) => {
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
              ></iframe>
            </div>
          </div>
        </div>
      )}
      <Carousel className="w-screen relative mt-[60px]  w-max-screen h-[600px]"
      plugins={[
        
      ]}>
        <CarouselContent>
          {movies.map((el: data, index) => (
            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
              <div className="w-full w-max-screen relative lg:flex items-center overflow-hidden h-[600px] ">
                <div className=" lg:h-full h-[50%] overflow-hidden w-full flex items-center ">
                  <img
                    onClick={() => handleMovieClick(el.id)}
                    src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}
                    className="w-full sm:h-auto h-full min-h-[300px] min-w-[270px]"
                    style={
                      el.title == "Werewolves"
                        ? {
                            marginTop: isLargeScreen == false ? "40%" : "25%",
                            marginLeft: "30%",
                            scale: "2",
                          }
                        : el.title == "Kraven the Hunter"
                        ? {
                            marginTop: isLargeScreen == false ? "20%" : "5%",
                            scale: "1.2",
                          }
                        : el.title == "Back in Action"
                        ? { marginTop: isLargeScreen == false ? "10%" : "0" }
                        : el.title == "Alarum"
                        ? { marginTop: isLargeScreen == false ? "10%" : "0" }
                        : el.title == "Sniper: The Last Stand"
                        ? { marginTop: isLargeScreen == false ? "10%" : "0" }
                        : el.title == "Star Trek: Section 31"
                        ? {
                            marginTop: isLargeScreen == false ? "10%" : "0",
                          }
                        : el.title == "The Gardener"
                        ? { marginTop: isLargeScreen == false ? "10%" : "0" }
                        : el.title == "Elevation"
                        ? { marginTop: isLargeScreen == false ? "10%" : "0" }
                        : {}
                    }
                  />
                </div>
                <div className="lg:absolute  z-10 dark:text-white p-10  space-y-4 lg:px-36">
                  <div
                    className={` lg:flex-col flex w-full lg:w-fit lg:text-white justify-between`}
                  >
                    <div>
                      <p className={` text-[16px]`}>Now playing:</p>
                      <p className="w-52 text-2xl font-semibold truncate">
                        {el.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star height="32px" width={"30px"} />
                      <div className="flex items-center">
                        <p className="font-semibold">
                          {Math.floor(el.vote_average * 10) / 10}
                        </p>
                        <p className="text-gray-400 text-sm">/10</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[302px] text-md font-[500] line-clamp-5 lg:text-white ">
                    {el.overview}
                  </div>
                  <button
                    onClick={() => fetchTrailer(el.id)}
                    className="bg-gray-400/40  absolute rounded-md px-5 py-2 z-40 "
                  >
                    Watch trailer
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute invisible lg:visible left-[5%]" />
        <CarouselNext className="absolute invisible lg:visible right-[5%]" />
      </Carousel>
    </>
  );
};
export default Upcoming;
