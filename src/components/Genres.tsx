"use client";

import { getGenre } from "@/utils/requests";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Right from "./icon/Right";
type Genre = {
  id: string;
  name: string;
};
const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Page, setPage] = useState("");
  //  const [genreID, setGenreID] = useQueryState("genresid", {
  //     defaultValue: [],
  //     parse: (value) => value.split(",").map(Number),
  //     serialize: (array) => array.join(","),
  //   });
  const searchParams = useSearchParams();
  const genreID = (searchParams.get("genres") || "").split(",");
  useEffect(() => {
    const fetchgetGenre = async () => {
      try {
        setIsLoading(true);
        const data = await getGenre();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchgetGenre();
  }, []);

  const router = useRouter();

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

  const toggleGenre = (id: string) => {
    // const updatedGenres = genreID.includes(id)
    //   ? genreID.filter((genre) => genre !== id)
    //   : [...genreID, id];
    // {Page == "genres" && setGenreID(updatedGenres)}
    // {Page == "search" && setGenreID(updatedGenres)}
    const params = new URLSearchParams(searchParams);
    genreID.push(id);
    // params.set("genresid", genreID.join(""));
    // const queryParam = updatedGenres.join(",");
    router.push(`/genres?genresid=${params.toString()}`);
    console.log("ajillaa");
  };

  return (
    <>
      {genres.map((el: Genre, index) => (
        <div
          onClick={() => toggleGenre(el.id)}
          key={index}
          className="border border-[#27272A] rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-2 flex items-center cursor-pointer"
          style={{
            background: genreID.includes(el.id) ? "white" : "none",
            color: genreID.includes(el.id) ? "black" : "white",
          }}
        >
          <p className={`text-[14px] font-semibold`}>{el.name}</p>
          <Right />
        </div>
      ))}
    </>
  );
};
export default Genres;
