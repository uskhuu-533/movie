'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import GenrePage from "@/components/GenrePage";
import Footer from "@/components/Footer";
import { parseAsInteger, useQueryState } from "nuqs";
export default function Genre() {
  const {id} = useParams();
  const [genreID , setGenreID] = useQueryState("genresid", parseAsInteger)

    
      return (
       <div className="flex text-white flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
        <Header setGenreID={setGenreID} />
      
      <GenrePage genreID={genreID} setGenreID={setGenreID}/>
        <Footer />
       
       </div>
      );
    }