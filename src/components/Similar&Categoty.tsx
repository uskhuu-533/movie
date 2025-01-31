// fetch('https://api.themoviedb.org/3/movie/1022789/similar?language=en-US&page=1', options)
// "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Star from "./icon/Star";
import { useParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

type data = {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
};
type Props = {
  movies: data1;
  category: string;
};
type data1 = {
  total_pages: number;
  results: Array<data>;
};

const CategorySimilar = ({
  movies,
  category,
  setCurrentPage,
  currentPage,
}: Props) => {
  if (movies) {
    console.log(movies);

    const router = useRouter();
    const handleMovieClick = (movieID: number) => {
      router.push(`/movies/${movieID}`);
    };
    const page = movies.total_pages;
    const pages = [];

    for (let i = 1; i <= page; i++) {
      pages.push(i);
    }
    const pages1 = pages.slice(
      currentPage >= 3 ? currentPage - 3 : currentPage - 1,
      currentPage + 4
    );
    const handleChangePage = (page: number) => {
      // router.push(`/genres/?genresid${genreID}?page=${page}`)
      setCurrentPage(page);
    };
    return (
      <div className="w-screen flex justify-center">
        <div className="w-[1080px] py-[100px] flex flex-col items-center justify-center gap-8 ">
          <div className="w-full justify-between flex h-9">
            <p className="text-foreground text-2xl text-white font-semibold">
              {category}
            </p>
          </div>
          <div className="w-full grid grid-flow-col grid-rows-4 gap-8">
            {movies.results.map((el: data, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden "
                onClick={() => handleMovieClick(el.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  className="w-full h-[77%] hover:bg-primary/30"
                />
                <div className="w-full h-[33%] p-2 bg-[#27272A]">
                  <div>
                    <div className="flex">
                      <Star />
                      <p>{el.vote_average}/10</p>
                    </div>
                    <p>{el.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {pages1.map((page) => (
              <button
                key={page}
                className="text-white"
                onClick={() => handleChangePage(page)}
              >
                {page}
              </button>
            ))}
            <p>...</p>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default CategorySimilar;
