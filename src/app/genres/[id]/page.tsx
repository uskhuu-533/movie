'use client'
import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import GenrePage from "@/components/GenrePage";
import Footer from "@/components/Footer";

export default function Genre() {
    const [genreId, setId] = useState("")
    
    
      return (
       <div className="flex text-white flex-col w-screen bg-[#09090B] gap-[30px] overflow-hidden">
        <Header setId={setId}/>
      
      <GenrePage genreId={genreId} setId={setId}/>
        <Footer />
       
       </div>
      );
    }