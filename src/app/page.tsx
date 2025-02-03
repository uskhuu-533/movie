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

  const [genreID , setGenreID] = useQueryState("genresid")
  

  return (
   <div className="flex dark:text-white light:text-black flex-col w-screen dark:bg-[#09090B] light:bg-[#FFFFFF] gap-[30px] overflow-hidden">
    <Header/>
   <Upcoming />
 <AllLists />
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