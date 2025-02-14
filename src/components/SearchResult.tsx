import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Star from "./icon/Star";
import SeeMore from "./icon/SeeMore";
import SearchLoading from "./loading/Search-Loading";
import { getsearchMovie } from "@/utils/requests";
import Image from "next/image";
type props = {
  searchValue: string;
};
type data = {
  title: string;
  release_date: string;
  vote_average: number;
  id: number;
  poster_path: string;
};
const SearchResult = ({ searchValue }: props) => {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchgetMovie = async () => {
      try {
        setIsLoading(true);
        const currenrPage = 1;
        const result = await getsearchMovie(searchValue, currenrPage);
        setSearchResult(result.results);
      } catch (error) {
        console.log("Error fetching genres:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchgetMovie();
  }, [searchValue]);
  searchResult.length = 5;
  const handleMovieClick = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };
  const handleJumpResults = () => {
    router.push(`/search/?value=${searchValue}&page=1`);
  };
  return (
    <div className="w-full  border border-[#27272A] dark:bg-[#09090B] bg-white top-14 lg:top-10 p-2 rounded-lg flex-col">
      {isLoading == false ? (
        <div className="w-full h-[90%] flex flex-col gap-2 lg:p-4">
          {searchResult.filter((result) => {
                  if (result.poster_path !== null) {
                    return result.poster_path !== null;
                  }
                }).map((movie: data, index) => (
            <div
              onClick={() => handleMovieClick(movie.id)}
              className="w-full h-[116px] border-b border-b-gray-500/30  item-center pb-2 flex lg:justify-between hover:bg-white/20  "
              key={index}
            >
              <div className="w-[70%] flex gap-x-2">
                <Image
                  className="h-[100%] lg:w-[20%] w-[35%] rounded-md"
                  width={100}
                  height={200}
                  alt="searchres"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  quality={100}
                  priority
                />
                <div>
                  <p className="line-clamp-2">{movie.title}</p>
                  <div className="flex gap-1">
                    <Star width="18px" height="20px" />
                    <div className="flex items-center">
                      <p className="font-semibold">
                        {Math.round(movie.vote_average * 10) / 10}
                      </p>
                      <p className="text-gray-400 text-sm">/10</p>
                    </div>
                  </div>
                  <p className="mt-4">{movie.release_date.split("-")[0]}</p>
                </div>
              </div>
              <div className="h-full  flex items-end pr-4">
                <div className="w-full h-[50%] flex items-center">
                  <p>see more</p>
                  <SeeMore />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SearchLoading />
      )}
      <div className="w-full h-1/10 px-4">
        <div onClick={handleJumpResults}>
          See all results for : {searchValue}
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
