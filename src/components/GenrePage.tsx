"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Right from "./icon/Right";
import GenreList from "./Genre-List";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const inter = Inter({ subsets: ["latin"] });

interface Genre {
  id: number;
  name: string;
}

const GenrePage = () => {
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genreID, setGenreID] = useQueryState("genresid", {
    defaultValue: [],
    parse: (value) => value.split(",").map(Number),
    serialize: (array) => array.join(","),
  });

  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };

  const getGenres = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      if (!response.ok) throw new Error("");
      const result = await response.json();
      setGenres(result.genres);
    } catch (error) {
      setError("");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  const toggleGenre = (id: number) => {
    const updatedGenres = genreID.includes(id)
      ? genreID.filter((genre) => genre !== id)
      : [...genreID, id];

    setGenreID(updatedGenres);
    router.push(`/genres?genresid=${updatedGenres.join("")}&page=1`);
  };

  return (
    <div className="w-full flex justify-center pb-10 text-white">
      <div className="w-[1280px] mt-[150px] flex gap-4">
        <div className="w-[28%]">
          <div>Search Filter</div>
          <h2>Genres</h2>
          <p>See lists of movies by genre</p>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="flex flex-wrap gap-4 w-full">
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
                  <p
                    className={`text-[14px] text-white font-semibold ${inter.className}`}
                  >
                    {el.name}
                  </p>
                  <Right />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-full border border-[#27272A]"></div>

        <GenreList genreID={genreID} />
      </div>
    </div>
  );
};

export default GenrePage;
