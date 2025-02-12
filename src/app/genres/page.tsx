'use client'

import Header from "@/components/Header";
import GenrePage from "@/components/GenrePage";
import Footer from "@/components/Footer";

export default function Genre() {

    
      return (
       <div className="flex dark:text-white text-black flex-col w-screen items-center dark:bg-[#09090B] light:bg-white gap-[30px]">
        <Header />
      
      <GenrePage />
        <Footer />
       
       </div>
      );
    }