"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Right from "./icon/Right";
import Bottom from "./icon/Bottom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./icon/Logo";

const inter = Inter({ subsets: ["latin"] });

type Data = {
  id: number;
  name: string;
};
type Props = {
  setGenreID : Function
}

const Header = ({setGenreID}:Props) => {
  const router = useRouter();
  const [genre, setGenre] = useState<Data[]>([]);
  const [display, setDisplay] = useState(false);
 
 
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",`,
    },
  };

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

  const filterMovie = (id: number) => {
    router.push(`/genres`);
    setGenreID(id)
    setDisplay(false)
  };

  return (
    <div className="w-full z-40 h-[60px] flex justify-center items-center fixed bg-[#09090B]">
      <div className="w-max-[1280px] w-[1280px] h-[60px] flex justify-between items-center">
        {/* <img src="Logo.webp" className="h-6" /> */}
        <Logo fill={"#4338CA"}  />
        <div className="relative">
          <div className="w-[488px] gap-3 flex">
            <button
              onClick={() => setDisplay((prev) => !prev)}
              className="w-[96px] z-30 h-[36px] bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center font-bold text-white text-[14px] gap-2"
            >
              <Bottom />
              <p>Genre</p>
            </button>
            <div className="flex">
              <input className="w-[380px] h-9 bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center" />
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
                      onClick={() => filterMovie(el.id)}
                      className="border border-[#27272A] rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-2 flex items-center cursor-pointer"
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
        <div className="w-9 h-9 flex items-center justify-center border rounded-md border-[#27272A]">
          <img src="moon.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
