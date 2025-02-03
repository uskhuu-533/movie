"use client";

import { useState, useEffect, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { getMovieGenres } from "@/utils/requests";
import Star from "./icon/Star";
import Pagination from "./Pagination";

type Props = {
  genreID: number[];
};
type page = {
  total_pages: number;
};
type ApiResponse = {
  results: Movie[];
  total_pages: number;
  total_results: number;
};
type Movie = {
  poster_path: string;
  id: number;
  results: string;
  title: string;
  vote_average: number;
};

const GenreList = ({ genreID }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse>({
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchgetMovie = async () => {
      try {
        setIsLoading(true);
        const APIdata = await getMovieGenres(genreID, currentPage);
        setData(APIdata);
      } catch (error) {
        console.error();
      } finally {
        setIsLoading(false);
      }
    };

    fetchgetMovie();
  }, [currentPage, genreID]);

  const movie = data.results;

  const handleMovieDetail = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };

  return (
    <>
      {isLoading == false ? (
        <div className="w-[69%]">
          <div className="text-xl font-semibold py-5">
            {" "}
            titles : {data.total_results}{" "}
          </div>
          <div className="grid grid-flow-col grid-rows-5 gap-10">
            {movie.map((el: Movie, index) => (
              <div
                key={index}
                className="overflow-hidden relative bg-secondary rounded-lg group/item"
                onClick={() => handleMovieDetail(el.id)}
              >
                <div className="w-full h-full absolute z-10 hover:bg-white/30"></div>
                <img
                  className="h-[70%] w-full  "
                  src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                />
                <div className="h-[30%] bg-[#27272A] w-full p-4">
                  <div>
                    <div className="flex gap-2">
                      <Star width="18px" height="20px" />
                      <div className="flex items-center">
                        {" "}
                        <p className="font-semibold">{el.vote_average}</p>
                        <p className="text-gray-400 text-sm">/10</p>
                      </div>
                    </div>
                    <p className="text-xl font-semibold line-clamp-2">
                      {el.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={data}
          />
        </div>
      ) : null}
    </>
  );
};
export default GenreList;
