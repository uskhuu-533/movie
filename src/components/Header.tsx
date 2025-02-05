"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Right from "./icon/Right";
import Bottom from "./icon/Bottom";
import Logo from "./icon/Logo";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { getGenre } from "@/utils/requests";
import SearchIcon from "./icon/Search-Icon";
import { useTheme } from "next-themes";
import Moon from "./icon/Moon";

// const inter = Inter({ subsets: ["latin"] });

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
    const fetchgetGenre = async () => {
      try {
        const data = await getGenre();
        setGenre(data.genres);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchgetGenre();
  }, []);
  const { setTheme } = useTheme()
  const toggleGenre = (id: number) => {
    const updatedGenres = genreID.includes(id)
      ? genreID.filter((genre) => genre !== id)
      : [...genreID, id];
      {Page == "genres" && setGenreID(updatedGenres)}
    const queryParam = updatedGenres.join(",");
    router.push(`/genres?genresid=${queryParam}`);
    console.log("ajillaa");
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueE = e.target.value;
    setSearchValue(valueE);
    {
      Page == "search" && setValue(valueE);
    }
  };
  const changeTheme = () => {
    const theme = localStorage.getItem("theme")
    console.log(theme);
    
    if (theme == "dark"){
      setTheme("light")
    }else{  setTheme("dark")
    }}
    
  

  return (<>
 <div onClick={()=> setDisplay(false)} className="w-screen z-20  absolute h-screen " style={{display : display == true ? "block" : "none" }} ></div>
    <div className="w-full z-30 h-[60px]  justify-center items-center fixed dark:bg-[#09090B] flex bg-white">
      <div className="w-[1280px] h-[60px]  flex justify-between items-center">
        <Logo fill={"#4338CA"} />
        <div className="relative">
          <div className="w-[488px] gap-3 flex">
            <button
              onClick={() => setDisplay((prev) => !prev)}
              className="w-[96px] z-20 h-[36px] light:text-black  border rounded-md border-[#27272A] flex items-center justify-center font-bold dark:text-white text-[14px] gap-2 cursor-pointer "
            >
              <Bottom />
              <p>Genre</p>
            </button>
            <div className="flex flex-col items-center">
              <div className="flex items-center relative">
                <SearchIcon />
                {Page == "search" ? (
                  <input
                  onClick={()=>setDisplay(false)}
                    onChange={(e) => handleSearchValue(e)}
                    value={value || ""}
                    className="w-[380px] h-9 dark:bg-[#09090B] light:bg-white border rounded-md border-[#27272A] pl-10 flex items-center justify-center"
                  />
                ) : (
                  <input
                  onClick={()=>setDisplay(false)}
                    onChange={handleSearchValue}
                    value={searchValue}
                    className="w-[380px] h-9 dark:bg-[#09090B] light:bg-white border border rounded-md border-[#27272A] pl-10 flex items-center justify-center dark:text-white light:text-black px-3"
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
            <div className="absolute p-5 z-40 w-[580px] top-10 dark:bg-[#09090B] bg-white border border-[#27272A] rounded-lg h-[340px] flex flex-col gap-5">
              <div className="dark:text-white  flex flex-col gap">
                <p className="text-2xl font-extrabold">Genres</p>
                <p className="text-[16px]">See lists of movies by genre</p>
              </div>
              <div className="w-full border border-gray-500/30"></div>
              <div className="flex flex-wrap gap-4">
                {genre.map((el) => (
                  <div
                    key={el.id}
                    onClick={() => toggleGenre(el.id)}
                    className="border border-[#27272A] z-30 rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-2 flex items-center "
                    style={{
                      background: genreID.includes(el.id) ? "white" : "none",
                      color : genreID.includes(el.id) ? "black" : "white",
                    }}
                  >
                    <p>
                      {el.name}
                    </p>
                    <Right />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div onClick={()=>changeTheme()} className="w-9 h-9 flex items-center justify-center border rounded-md border-[#27272A] cursor-pointer">
          <Moon />
        </div>
      </div>
    </div>
   
    </>
  );
};

export default Header;
