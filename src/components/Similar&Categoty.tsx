// fetch('https://api.themoviedb.org/3/movie/1022789/similar?language=en-US&page=1', options)
// "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
"use client";

import { useRouter } from "next/navigation";
import Star from "./icon/Star";
import Pagination from "./Pagination";
import { Params } from "next/dist/server/request/params";

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
  currentPage : number
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
}: Props) => {
  if (data) {
    console.log(data);

    const router = useRouter();
    const handleMovieClick = (movieID: number) => {
      router.push(`/movies/${movieID}`);
    };


    return (
      <div  className="w-screen flex justify-center">
        <div className="w-[1080px] py-[100px] flex flex-col items-center justify-center gap-8 ">
          <div className="w-full justify-between flex h-9">
            <p className="text-foreground text-2xl text-white font-semibold">
              {category}
            </p>
          </div>
          <div className="w-full grid grid-flow-col grid-rows-4 gap-8">
            {data.results.map((el: data, index) => (
              <div
                key={index}
                className="rounded-lg relative overflow-hidden "
                onClick={() => handleMovieClick(el.id)}
              >
                   <div className="w-full h-full absolute z-10 hover:bg-white/30"></div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  className="w-full h-[75%] hover:bg-primary/30"
                />
                <div className="w-full h-[25%] font-semibold text-xl p-2 bg-gray-500/30 line-clamp-2">
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
        </div>
      </div>
    );
  }
};
export default CategorySimilar;
