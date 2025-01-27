"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { log } from "console";
import Upcoming from "@/components/Upcoming";
import AllLists from "@/components/All-LIsts";
import Footer from "@/components/Footer";

export default function Home() {
  const [movies, setMovies] = useState({})
  const account_id = 21777990
// const getMovie = async ()=>{
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ'
//     }
//   };
  
// return await
//   fetch('https://api.themoviedb.org/3//movie/popular?language=en-US&page=1', options)
//     .then(res => res.json())
//     .then(res => setMovies(res))
//     .catch(err => console.error(err));
// }

// useEffect(()=>{
//   getMovie()
// },[])


  return (
   <div className="flex flex-col w-screen bg-[#09090B] gap-[30px]">
    <Header />
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