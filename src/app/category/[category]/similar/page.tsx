"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useParams } from "next/navigation";
import CategorySimilar from "@/components/Similar&Categoty";

export default function Home() {
  const { category } = useParams();
  return (
    <>
      <div className="flex dark:text-white flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] overflow-hidden">
        <Header />
        <CategorySimilar title="similar" category={category} />
        <Footer />
      </div>
    </>
  );
}
