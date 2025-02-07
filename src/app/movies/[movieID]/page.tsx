"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";
import { getMovieDetail } from "@/utils/requests";
import MovieDetailLoading from "@/components/loading/Movie-Detail-Loading";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  origin_country: string[];
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number
};

type ActorsDetails = {
  crew: { name: string }[];
  cast: { name: string }[];
};

type Trailer = {
  results: { key: string }[];
};

type SimilarMovies = {
  results: {
    id: number;
    title: string;
    poster_path: string;
    vote_average : number
  }[];
};

type MovieData = {
  movieDetails: Movie | undefined;
  actorsDetails: ActorsDetails | undefined;
  trailer: Trailer | undefined;
  similaMovies: SimilarMovies["results"] | undefined;
};

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const [movieData, setMovieData] = useState<MovieData | undefined>({
    movieDetails: undefined,
    actorsDetails: undefined,
    trailer: undefined,
    similaMovies: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movieID) {
      setIsLoading(true);
      const fetchMovieDetails = async () => {
            try {
              const data = await getMovieDetail(movieID);
              setMovieData(data);
            } catch (error) {
              console.error("Failed to fetch", error);
            }finally{
              setIsLoading(false);
            }
          };
      
          fetchMovieDetails();

    }
  }, [movieID]);



  const { movieDetails, actorsDetails, trailer, similaMovies } = movieData ??{}

  return (
    <div className="flex dark:text-white items-center flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] ">
      <Header />
      {isLoading == false ?(<MovieDetails
        movieDetails={movieDetails}
        actorsDetails={actorsDetails}
        trailer={trailer}
        similaMovies={similaMovies}
       
      />):<MovieDetailLoading />}
      <Footer />
    </div>
  );
}