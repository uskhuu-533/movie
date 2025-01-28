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

export default function Home() {
const [genreId, setId] = useState("")


  return (
   <div className="flex text-white flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
    <Header setId={setId}/>
    {genreId == "" ? <Upcoming />:null}
    {genreId == "" ? <AllLists />:null}
    {genreId !== "" ? <GenrePage genreId={genreId} setId={setId}/>:null}
    <Footer />
   
   </div>
  );
}
// There are three main primitives in JavaScript and TypeScript.

// boolean - true or false values
// number - whole numbers and floating point values
// string - text values like "TypeScript Rocks"
// There are also 2 less common primitives used in later versions of Javascript and TypeScript.

// bigint - whole numbers and floating point values, but allows larger negative and positive numbers than the number type.
// symbol are used to create a globally unique identifier.