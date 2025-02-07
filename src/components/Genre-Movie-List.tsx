"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { getMovieGenres } from "@/utils/requests";
import Star from "./icon/Star";
import Pagination from "./Pagination";
import GenreLoading from "./loading/Genre-Movie-Loading";


type Props = {
  genreID: number[];
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

const GenreMovieList = ({ genreID }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse>({
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [currentPage, setCurrentPage] = useQueryState<number>(
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
    
        <div className="lg:w-[70%] w-full px-5 relative h-fit">
        {isLoading == false ? (  <><div className="text-xl font-semibold py-5">
            {" "}
            titles : {data.total_results}{" "}
          </div>
          <div className="grid grid-flow-row lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-10">
            {movie?.map((el: Movie, index) => (
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
              
                <div className="h-[30%] bg-gray-500/30 w-full p-4">
                  <div>
                    <div className="flex gap-2">
                      <Star width="18px" height="20px" />
                      <div className="flex items-center">
                 
                        <p className="font-semibold">{Math.round((el.vote_average)*10)/10}</p>
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
          /></>) : <GenreLoading />}
       
        </div>
      
     
    </>
  );
};
export default GenreMovieList 
