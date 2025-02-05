'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import GenrePage from "@/components/GenrePage";
import Footer from "@/components/Footer";
import { parseAsInteger, useQueryState } from "nuqs";
export default function Genre() {
  // const [genreID , setGenreID] = useQueryState("genresid", parseAsInteger.withDefault(28))

    
      return (
       <div className="flex dark:text-white text-black flex-col w-screen dark:bg-[#09090B] light:bg-white gap-[30px] overflow-hidden">
        <Header />
      
      <GenrePage />
        <Footer />
       
       </div>
      );
    }