"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQueryState, parseAsInteger } from "nuqs";
import { useParams } from "next/navigation";
import CategorySimilar from "@/components/Similar&Categoty";
import { getCategoryMovie } from "@/utils/requests";

export default function Home() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const result = await getCategoryMovie(category, currentPage);
        setData(result);
      } catch (error) {
        console.error();
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [category, currentPage]);
  return (
    <>
      <div className="flex dark:text-white flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] overflow-hidden">
        <Header />
        <CategorySimilar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={data}
          category={category}
          isLoading={isLoading}
        />
        <Footer />
      </div>
    </>
  );
}
