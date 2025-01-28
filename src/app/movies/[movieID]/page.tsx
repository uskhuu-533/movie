"use client";

import { useParams } from "next/navigation";
import Router from "next/router";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";

export default function movieDetalles() {
  const { movieID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [genreId, setId] = useState("")
  

  useEffect(() => {
    if (movieID) {
      const fetchMovieDetails = async () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ'
            }
          };

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          options
        );
        const data = await response.json();
        setMovieDetails(data);
      };



      fetchMovieDetails();
    
    }
  }, [movieID]);

  return (
    <div className="flex text-white flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
    <Header setId={setId}/>
    <MovieDetails movieDetails={movieDetails} />
    <Footer />
   
   </div>
  );
}
