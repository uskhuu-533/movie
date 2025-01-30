"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { log } from "console";
import Upcoming from "@/components/Upcoming";
import AllLists from "@/components/All-LIsts";
import Footer from "@/components/Footer";
import { useQueryState, parseAsInteger } from 'nuqs'

export default function Home() {

  const [genreID , setGenreID] = useQueryState("genresid", parseAsInteger)

  return (
   <div className="flex text-white flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
    <Header/>
    <SearchResultList />
    <Footer />
   
   </div>
  );
}