"use client"

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQueryState, parseAsInteger } from 'nuqs'
import { useParams } from "next/navigation";
import CategorySimilar from "@/components/Similar&Categoty";


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
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${currentPage}`,
            options
          );
         
          const result = await response.json();
          
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
   <div className="flex dark:text-white flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] overflow-hidden">
    <Header/>
    {isLoading == false && (<CategorySimilar currentPage={currentPage} setCurrentPage={setCurrentPage} data={data} category={category}/>)}
    <Footer />
   
   </div>
</>
  );
}