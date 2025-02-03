"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";
import { getMovieDetail } from "@/utils/requests";

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
};

type ActorsDetails = {
  crew: { name: string; job: string }[];
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
  }[];
};

type MovieData = {
  movieDetails: Movie | null ;
  actorsDetails: ActorsDetails | null;
  trailer: Trailer | null;
  similaMovies: SimilarMovies["results"] | null;
};

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const [movieData, setMovieData] = useState<MovieData>({
    movieDetails: null,
    actorsDetails: null,
    trailer: null,
    similaMovies: null,
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
              console.error("Failed to fetch now-playing movies:", error);
            }finally{
              setIsLoading(false);
            }
          };
      
          fetchMovieDetails();
        
      // const fetchMovieDetails = async () => {
      //   setIsLoading(true);
      //   const options = {
      //     method: "GET",
      //     headers: {
      //       accept: "application/json",
      //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      //     },
      //   };

      //   try {
      //     const [movieResponse, creditsResponse, videoResponse, similarResponse] = await Promise.all([
      //       fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options),
      //       fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`, options),
      //       fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, options),
      //       fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1`, options),
      //     ]);

      //     if (!movieResponse.ok || !creditsResponse.ok || !videoResponse.ok || !similarResponse.ok) {
      //       throw new Error("Failed to fetch movie details");
      //     }

      //     const [movieDetails, actorsDetails, trailer, similaMovies] = await Promise.all([
      //       movieResponse.json(),
      //       creditsResponse.json(),
      //       videoResponse.json(),
      //       similarResponse.json(),
      //     ]);

      //     setMovieData({ movieDetails, actorsDetails, trailer, similaMovies: similaMovies.results });
      //   } catch (error) {
      //     console.error("Error fetching movie details:", error);
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };

      // fetchMovieDetails();
    }
  }, [movieID]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const { movieDetails, actorsDetails, trailer, similaMovies } = movieData;

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