// const responseSimilar = await fetch(`https://api.themoviedb.org/3/movie/${category}/similar?language=en-US&page=1`, options)

"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { log } from "console";
import Upcoming from "@/components/Upcoming";
import AllLists from "@/components/All-LIsts";
import Footer from "@/components/Footer";
import { useQueryState, parseAsInteger } from 'nuqs'
import { useParams } from "next/navigation";
import CategorySimilar from "@/components/Similar&Categoty";

type data = {
    id:number,
    poster_path :string,
    vote_average : number,
    title :string
}

export default function Home() {
const {category} = useParams()
const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

      const [data, setData] = useState(null);
      const [isLoading, setIsLoading] = useState(false)

      const options: object = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
        },
      };
      const getMovie = async () => {
        try {
            setIsLoading(true)
            const responseSimilar = await fetch(`https://api.themoviedb.org/3/movie/${category}/similar?language=en-US&page=${currentPage}`, options)

        
          const result = await responseSimilar.json();
          
         console.log(result)
     
            setData(result);
        
         
       
          setIsLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
        getMovie()
      }, [category, currentPage])
  return (<>
   <div className="flex text-white flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
    <Header/>
    {isLoading == false && (<CategorySimilar currentPage={currentPage} setCurrentPage={setCurrentPage} data={data} category={"More Like This"}/>)}
    <Footer />
   
   </div>
</>
  );
}