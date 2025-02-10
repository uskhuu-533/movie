// const responseSimilar = await fetch(`https://api.themoviedb.org/3/movie/${category}/similar?language=en-US&page=1`, options)

"use client"

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQueryState, parseAsInteger } from 'nuqs'
import { useParams } from "next/navigation";
import CategorySimilar from "@/components/Similar&Categoty";
import { getSimilarMovie } from "@/utils/requests";

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

      useEffect(()=>{
        const fetchMovie = async () =>{
          try{
            setIsLoading(true)
            const result = await getSimilarMovie(category, currentPage)
            setData(result)
          }catch(error){
            console.error();
          }finally{
            setIsLoading(false)
          }
        }
        fetchMovie()
      }, [category, currentPage])
  return (<>
   <div className="flex dark:text-white flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] overflow-hidden">
    <Header/>
    <CategorySimilar currentPage={currentPage} setCurrentPage={setCurrentPage} data={data} category={"More Like This"} isLoading={isLoading}/>
    <Footer />
   
   </div>
</>
  );
}