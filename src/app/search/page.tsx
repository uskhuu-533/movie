"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { log } from "console";
import Upcoming from "@/components/Upcoming";
import AllLists from "@/components/All-LIsts";
import Footer from "@/components/Footer";
import { useQueryState, parseAsInteger } from 'nuqs'
import SearchResultList from "@/components/SearchResultPage";
import SearchResultPage from "@/components/SearchResultPage";
import GenrePage from "@/components/GenrePage";


export default function Home() {
  


 

  return (
   <div className="flex dark:text-white flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] overflow-hidden">
    <Header/>
    <GenrePage />
    <Footer />
   
   </div>
  );
}