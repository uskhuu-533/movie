"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GenrePage from "@/components/GenrePage";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense>
    <div className="flex dark:text-white flex-col w-screen dark:bg-[#09090B] bg-white gap-[30px] ">
      <Header />
      <GenrePage />
      <Footer />
    </div>
    </Suspense>
  );
}
