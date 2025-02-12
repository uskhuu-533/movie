"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";
import { Suspense } from "react";

export default function MovieDetailsPage() {
  const { movieID } = useParams();

  return (
    <Suspense>
    <div className="flex dark:text-white items-center flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] ">
      <Header />
      <MovieDetails movieID={movieID} />
      <Footer />
    </div>
    </Suspense>
  );
}
