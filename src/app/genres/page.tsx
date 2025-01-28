"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { log } from "console";
import Upcoming from "@/components/Upcoming";
import AllLists from "@/components/All-LIsts";
import Footer from "@/components/Footer";
import FilterList from "@/components/Filter-List";
import GenrePage from "@/components/GenrePage";
import exp from "constants";

const Genre= ()=> {
const [genreId, setId] = useState("")


  return (
   <div className="flex text-white flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
    <Header setId={setId}/>
  
    <GenrePage genreId={genreId} setId={setId}/>
    <Footer />
   
   </div>
  );
}
export default Genre