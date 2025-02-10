"use client";

import { useEffect, useState } from "react";

import Bottom from "./icon/Bottom";
import Logo from "./icon/Logo";
import SearchResult from "./SearchResult";

import { useQueryState } from "nuqs";

import SearchIcon from "./icon/Search-Icon";
import { useTheme } from "next-themes";
import Moon from "./icon/Moon";
import WhiteClose from "./icon/WhiteClose";
import Genre from "./Genre";
import { Sun } from "lucide-react";

// const inter = Inter({ subsets: ["latin"] });

type Data = {
  id: number;
  name: string;
};
type props = {
  Page: string;
};

const Header = () => {
  const [display, setDisplay] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useQueryState("value");
  const [genreID, setGenreID] = useQueryState("genresid", {
    defaultValue: [],
    parse: (value) =>
      value
        .split(",")
        .map(Number)
        .filter((num) => num !== 0),
    serialize: (array) => array.join(","),
  });
  const [Page, setPage] = useState("");
  const [trasnlateSearch, setTranslate] = useState(false);

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
  const { setTheme } = useTheme();
  const { theme } = useTheme();

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueE = e.target.value;
    setSearchValue(valueE);
    {
      Page == "search" && setValue(valueE);
    }
  };
  const changeTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const deleteTags = () => {
    setDisplay(false);
    setTranslate(false);
  };
  return (
    <>
      <div className="w-full z-30 h-[60px]  px-5 justify-center items-center fixed  dark:bg-[#09090B] flex bg-white">
        <div className="w-[1280px] h-[60px]  flex justify-between items-center">
          <Logo fill={"#4338CA"} />
          <div className="lg:relative">
            <div className="w-[488px] gap-3 lg:flex hidden">
              <button
                onClick={() => setDisplay((prev) => !prev)}
                className="w-[96px] h-[36px] light:text-black  border rounded-md border-[#27272A] flex items-center justify-center font-bold dark:text-white text-[14px] gap-2 cursor-pointer "
              >
                <Bottom />
                <p>Genre</p>
              </button>
              <div className="flex flex-col lg:items-center lg:relative">
                <div className="flex items-center">
                  <SearchIcon />
                  {Page == "search" ? (
                    <input
                      onClick={() => setDisplay(false)}
                      onChange={(e) => handleSearchValue(e)}
                      value={value || ""}
                      className="w-[380px] h-9 dark:bg-[#09090B] light:bg-white border rounded-md border-[#27272A] pl-10 flex items-center justify-center"
                    />
                  ) : (
                    <input
                      onClick={() => setDisplay(false)}
                      onChange={handleSearchValue}
                      value={searchValue}
                      className="w-[380px] h-9 dark:bg-[#09090B] light:bg-white border border rounded-md border-[#27272A] pl-10 flex items-center justify-center dark:text-white light:text-black px-3"
                      placeholder="Search movies..."
                    />
                  )}
                </div>
                {searchValue !== "" && Page !== "search" && (
                  <div className="lg:w-[580px] w-[100px] absolute lg:top-10 top-14">
                    <SearchResult searchValue={searchValue} />
                  </div>
                )}
              </div>
            </div>

            {display && (
              <div className="absolute p-5 z-40 lg:w-[580px] md:w-[450px] w-[330px] lg:top-10 top-14 dark:bg-[#09090B] bg-white border border-[#27272A] rounded-lg flex flex-col gap-5 left-8 lg:left-0">
                <div className="dark:text-white  flex flex-col gap">
                  <p className="text-2xl font-extrabold">Genres</p>
                  <p className="text-[16px]">See lists of movies by genre</p>
                </div>
                <div className="w-full border border-gray-500/30"></div>
                <div className="flex flex-wrap gap-4">
                  <Genre />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 ">
            <div
              onClick={() => setTranslate(true)}
              className="w-9 h-9 flex items-center relative lg:hidden justify-center border rounded-md border-[#27272A] "
            >
              <SearchIcon />
            </div>
            <div
              onClick={() => changeTheme()}
              className="w-9 h-9 flex items-center justify-center border rounded-md border-[#27272A] "
            >
              {theme == "light" ? <Moon /> : <Sun width={16} height={16} />}
            </div>
          </div>
        </div>

        <div
          className="absolute -top-16 w-full lg:hidden h-full flex items-center justify-between z-20 px-8 pr-[60px] bg-white dark:bg-[#09090B] transition duration-150 ease-in-out"
          style={{
            transform:
              trasnlateSearch === true
                ? "translate(0px, 60px)"
                : "translate(0px, -60px)",
          }}
        >
          <div className="flex gap-5">
            {" "}
            <div
              onClick={() => setDisplay((prev) => !prev)}
              className="w-9 h-9 flex items-center relative lg:hidden justify-center border rounded-md  border-[#27272A] "
            >
              <Bottom />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center relative">
                <SearchIcon />
                {Page == "search" ? (
                  <input
                    onClick={() => setDisplay(false)}
                    onChange={(e) => handleSearchValue(e)}
                    value={value || ""}
                    className="w-[180px] h-9 dark:bg-[#09090B] light:bg-white border rounded-md border-[#27272A] pl-10 flex items-center justify-center"
                  />
                ) : (
                  <input
                    onClick={() => setDisplay(false)}
                    onChange={handleSearchValue}
                    value={searchValue}
                    className="w-[180px] h-9 dark:bg-[#09090B] light:bg-white border border rounded-md border-[#27272A] pl-10 flex items-center justify-center dark:text-white light:text-black px-3"
                    placeholder="Search..."
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
          <div onClick={() => deleteTags()}>
            {" "}
            <WhiteClose />
          </div>
        </div>
      </div>
      {display == true && (
        <div
          onClick={() => setDisplay(false)}
          className="w-screen z-20  fixed  h-screen "
        ></div>
      )}
    </>
  );
};

export default Header;
