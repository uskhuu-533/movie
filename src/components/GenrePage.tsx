"use client";

import { useEffect, useState } from "react";

import { useQueryState } from "nuqs";

import SearchMovies from "./SearchMovies";
import GenreMovieList from "./Genre-Movie-List";

import Genre from "./Genre";

const GenrePage = () => {
  const [genreID] = useQueryState<number[]>("genresid", {
    defaultValue: [],
    parse: (value) =>
      value
        .split(",")
        .map(Number)
        .filter((num) => num !== 0),
    serialize: (array) => array.join(","),
  });

  const [Page, setPage] = useState("");
  const [value] = useQueryState("value", { defaultValue: "" });

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/search") {
      setPage("search");
    } else if (path === "/genres") {
      setPage("genres");
    } else {
      setPage("");
    }
  }, []);

  return (
    <div className="w-full  flex justify-center pb-10  dark:text-white">
      <div className="max-w-[1280px] mt-[150px] flex lg:flex-row gap-4 flex-col">
        {Page == "search" ? (
          <>
            <SearchMovies searchValue={value} />
            <div className="h-full  border border-[#27272A]"></div>
          </>
        ) : null}
        <div className="lg:w-[28%] px-10 lg:px-2 w-full ">
          <div className="text-3xl py-8 font-bold">Search Filter</div>
          <div className="h-fit sticky top-[100px]  z-10 ">
            <h2 className="text-2xl py-2 font-bold">Genres</h2>
            <p className="text-xl pb-5">See lists of movies by genre</p>

            <div className="flex flex-wrap gap-4 w-full">
              <Genre loc="genreAndSearch" />
            </div>
          </div>
        </div>

        {Page == "genres" ? (
          <>
            <div className="h-full h-full border border-[#27272A]"></div>
            <GenreMovieList genreID={genreID} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GenrePage;
