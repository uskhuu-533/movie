"use client";

import { useRouter } from "next/navigation";
import Star from "./icon/Star";
import Pagination from "./Pagination";
import SimilarCategoryLoading from "./loading/Similar-Category-Loading";


type data = {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
};
type Props = {
  data: data1 | null;
  category: string | string[] | undefined
  setCurrentPage : Function;
  currentPage : number,
  isLoading: boolean
};
type data1 = {
  total_pages: number;
  results: Array<data>;
};

const CategorySimilar = ({
  data,
  category,
  setCurrentPage,
  currentPage,
  isLoading
}: Props) => {


    const router = useRouter();
    const handleMovieClick = (movieID: number) => {
      router.push(`/movies/${movieID}`);
    };


    return (
      <div  className="w-screen flex justify-center">
        {isLoading==false ?(
          <div className="w-[1080px] py-[100px] flex flex-col items-center justify-center gap-8 ">
          <div className="w-full justify-between flex h-9">
            <p className="capitalize text-foreground text-2xl text-white font-semibold xl:px-0 px-8">
              {category?.toString().replace("_", " ")}
            </p>
          </div>
          <div className="w-full grid grid-flow-row md:grid-cols-5 sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:px-0 px-8 gap-8">
            {data?.results?.map((el: data, index) => (
              <div
                key={index}
                className="rounded-lg relative overflow-hidden group"
                onClick={() => handleMovieClick(el.id)}
              >
                   <div className="w-full h-[75%] absolute z-10 dark:group-hover:bg-white/30 group-hover:bg-black/30"></div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  className="w-full h-[75%] hover:bg-primary/30"
                />
                <div className="w-full h-[25%] font-semibold md:text-xl sm:text-lg text-sm p-2 bg-gray-500/30 line-clamp-2">
                  <div>
                    <div className="flex">
                      <Star width="18px" height="20px"/>
                      <p>{Math.round((el.vote_average)*10)/10}/10</p>
                    </div>
                    <p>{el.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={data}/>
        </div>)
        :<SimilarCategoryLoading />}
      </div>
    );
  
};
export default CategorySimilar;
