// const responseSimilar = await fetch(`https://api.themoviedb.org/3/movie/${category}/similar?language=en-US&page=1`, options)

"use client"

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQueryState, parseAsInteger } from 'nuqs'
import { useParams } from "next/navigation";
import CategorySimilar from "@/components/Similar&Categoty";
import { getSimilarMovie } from "@/utils/requests";


export default function Home() {
const {category} = useParams()
  return (<>
   <div className="flex dark:text-white flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] overflow-hidden">
    <Header/>
    <CategorySimilar title="similar" category={category} />
    <Footer />
   
   </div>
</>
  );

}