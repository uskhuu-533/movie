"use client";

import { useParams } from "next/navigation";
import Router from "next/router";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";
import { useQueryState, parseAsInteger } from 'nuqs'

export default function movieDetalles() {
  const { movieID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [actorsDetails, setActorsDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [genreID , setGenreID] = useQueryState("genresid", parseAsInteger)
  const [similaMovies, setSimilaMovies] = useState(null)
  


  useEffect(() => {
    if (movieID) {
      const fetchMovieDetails = async () => {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
          },
          
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          options
        );
        const response2 = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`,
          options
        );
        const video = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
          options
        );
        const responseSimilar = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1`, options)
        const data = await response.json();
        const dataActors = await response2.json();
        const resultVideo = await video.json();
        const resultSimilar = await responseSimilar.json()

        setMovieDetails(data);
        setActorsDetails(dataActors);
        setTrailer(resultVideo);
        setSimilaMovies(resultSimilar.results)
      };

      fetchMovieDetails();
    }
  }, [movieID]);

  return (
    <div className="flex text-white items-center flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
      <Header />
      <MovieDetails
        movieDetails={movieDetails}
        actorsDetails={actorsDetails}
        trailer={trailer}
        similaMovies={similaMovies}
      />
      <Footer />
    </div>
  );
}
