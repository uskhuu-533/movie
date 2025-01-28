"use client";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { log } from "console";
import { promises } from "dns";
import { useEffect, useState } from "react";
import Right from "./icon/Right";
import Bottom from "./icon/Bottom";
import Link from 'next/link'
import { useRouter } from 'next/router'
type data = {
  id: number,
  name: string,

};
type props = {
    setId : Function
}
const Header = ({setId}:props) => {
  const [genre, setGenre] = useState<data[]>([]);
  const [display, setDisplay] = useState("none");
//   const router = useRouter()
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
    },
  };
  const getGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const result = await response.json();
      setGenre(result.genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
  });
  const filterMovie =(id:number) => {
    setId(id)
    setDisplay("none")
  }
  const genreBlock = () => {
    if (display == "none") {
      setDisplay("block");
    } else if (display == "block") {
      setDisplay("none");
    }
  };
  return (
    <div className="w-full z-40 h-[60px] flex justify-center items-center fixed bg-[#09090B]">
      <div className="w-max-[1280px] w-[1280px] h-[60px] flex justify-between items-center">
        <img src="Logo.webp" className="h-6" />
        <div className="relative">
          <div className="w-[488px] gap-3 flex">
            <button
              onClick={() => genreBlock()}
              className="w-[96px] z-30 h-[36px] bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center font-bold text-white text-[14px] gap-2"
            >
              <Bottom />
              <p>Genre</p>
            </button>
            <div className="flex">
              <input className="w-[380px] h-9 bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center" />
            </div>
          </div>
          <div
            className="absolute p-5 w-[580px] top-10 bg-[#09090B] border border-[#27272A] rounded-lg h-[340px] flex flex-col gap-5"
            style={{ opacity: display == "block" ? 100 : 0 }}
          >
            <div className="text-white  flex flex-col gap">
              <p className="text-2xl font-extrabold">Genres</p>
              <p className="text-[16px]">See lists of movies by genre</p>
            </div>
            <div className="w-full border border-[#27272A]"></div>
            <div className="flex flex-wrap gap-4">
              {genre.map((el: data, index) => (
                <Link 
               key={index} href="genres">
                    <div
                onClick={()=>filterMovie(el.id)}
                  key={index}
                  className="border border-[#27272A] rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-2 flex items-center"
                >
                  <p
                    className={`text-[14px] text-white font-semibold ${inter.className}`}
                  >
                    {el.name}
                  </p>
                  <Right />
                </div>
                </Link> 
              ))}
            </div>
          </div>
        </div>
        <div className="w-9 h-9 flex items-center justify-center border rounded-md border-[#27272A]">
          <img src="moon.png" />
        </div>
      </div>
    </div>
  );
};
export default Header;
