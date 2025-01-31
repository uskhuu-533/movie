"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Right from "./icon/Right";
import Bottom from "./icon/Bottom";
import Logo from "./icon/Logo";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const inter = Inter({ subsets: ["latin"] });

type Data = {
  id: number;
  name: string;
};
type props = {
  Page: string;
};

const Header = () => {
  const router = useRouter();
  const [genre, setGenre] = useState<Data[]>([]);
  const [display, setDisplay] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useQueryState("value");
  const [genreID, setGenreID] = useQueryState("genresid", {
    defaultValue: [],
    parse: (value) => value.split(",").map(Number),
    serialize: (array) => array.join(","),
  });
  const [Page, setPage] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
    },
  };
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
  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options
        );
        const result = await response.json();
        setGenre(result.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getGenres();
  }, []);

  const toggleGenre = (id: number) => {
    router.push(`/genres?genresid=${id}&page=1`);
    // const updatedGenres = genreID.includes(id)
    //   ? genreID.filter((genre) => genre !== id)
    //   : [...genreID, id];

    // setGenreID(updatedGenres);

    console.log("ajillaa");
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueE = e.target.value;
    setSearchValue(valueE);
    {Page == "search" && setValue(valueE)}
  };

  return (
    <div className="w-full z-40 h-[60px] flex justify-center items-center fixed bg-[#09090B]">
      <div className="w-[1280px] h-[60px] flex justify-between items-center">
        <Logo fill={"#4338CA"} />
        <div className="relative">
          <div className="w-[488px] gap-3 flex">
            <button
              onClick={() => setDisplay((prev) => !prev)}
              className="w-[96px] z-30 h-[36px] bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center font-bold text-white text-[14px] gap-2 cursor-pointer"
            >
              <Bottom />
              <p>Genre</p>
            </button>
            <div className="flex flex-col items-center">
              <div>
                {Page == "search" ? (
                  <input
                    onChange={(e) => handleSearchValue(e)}
                    value={value || ""}
                    className="w-[380px] h-9 bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center"
                  />
                ) : (
                  <input
                    onChange={handleSearchValue}
                    value={searchValue}
                    className="w-[380px] h-9 bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center text-white px-3"
                    placeholder="Search movies..."
                  />
                )}
              </div>
              {searchValue !== "" && Page !== "search" && (
                <div className="w-[577px] absolute top-10">
                  <SearchResult searchValue={searchValue} />
                </div>
              )}
            </div>
          </div>

          {display && (
            <div className="absolute p-5 w-[580px] top-10 bg-[#09090B] border border-[#27272A] rounded-lg h-[340px] flex flex-col gap-5">
              <div className="text-white flex flex-col gap">
                <p className="text-2xl font-extrabold">Genres</p>
                <p className="text-[16px]">See lists of movies by genre</p>
              </div>
              <div className="w-full border border-[#27272A]"></div>
              <div className="flex flex-wrap gap-4">
                {genre.map((el) => (
                  <div
                    key={el.id}
                    onClick={() => toggleGenre(el.id)}
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
            </div>
          )}
        </div>
        <div className="w-9 h-9 flex items-center justify-center border rounded-md border-[#27272A] cursor-pointer">
          <img src="moon.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
