"use client";

import Star from "./icon/Star";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SeeMore from "./icon/SeeMore";
import Homeloading from "./loading/Loading";
import { getCategoryMovie } from "@/utils/requests";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type data = {
  poster_path: string;
  vote_average: number;
  title: string;
  id: number;
};
const Lists = ({ title }: { title: string }) => {
  const router = useRouter();
  const [movies, setMovies] = useState<data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const data = await getCategoryMovie(
          title.toLowerCase().replace(" ", "_"),
          1
        );
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, []);
  const handleMovieClick = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };
  const handleCategoryClick = () => {
    const category: string = title.toLowerCase().replace(" ", "_");

    router.push(`/category/${category}?page=1`);
  };
  return (
    <>
      {isLoading == false ? (
        <div className="flex flex-col gap-8 ">
          <div className="w-full justify-between flex px-4 h-9">
            <p className="text-foreground text-2xl dark:text-white font-semibold">
              {title}
            </p>
            <button
              className="font-semibold flex items-center hover:gap-2"
              onClick={handleCategoryClick}
            >
              <p>see more</p>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="w-full grid grid-flow-row md:grid-cols-4 sm:grid-cols-3 sm:px-8 md:px-8 gap-8 2xl:grid-cols-5 lg:grid-cols-5  xl:grid-cols-5 grid-cols-2 px-8">
            {movies.slice(0, 10).map((el: data, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden relative group"
                onClick={() => handleMovieClick(el.id)}
              >
                {" "}
                <div className="w-full h-[75%] absolute z-10 dark:group-hover:bg-white/30 group-hover:bg-black/30"></div>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  alt="movie"
                  className="w-full h-[75%] hover:bg-primary/30"
                  width={100}
                  height={200}
                  quality={100}
                  priority
                />
                <div className="w-full h-[25%] p-2 sm:pt-4  dark:bg-[#27272A] bg-gray-500/30">
                  <div>
                    <div className="flex gap-2">
                      <Star width="18px" height="20px" />
                      <div className="flex items-center">
                        {" "}
                        <p className="font-semibold">
                          {Math.round(el.vote_average * 10) / 10}
                        </p>
                        <p className="text-gray-400 text-sm">/10</p>
                      </div>
                    </div>
                    <p className="md:text-xl text-sm sm:text-lg font-semibold">
                      {el.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Homeloading />
      )}
    </>
  );
};
export default Lists;
