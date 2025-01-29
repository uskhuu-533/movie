'use client'


import { AppIsrManifestAction } from "next/dist/server/dev/hot-reloader-types";
import { useState } from "react";

type detail = {
    movieDetails:object

  }
  type data = {
    id: number;
    name: string;
  };
  type movie ={
    genre: string
  
  }

const MovieDetails = ({ movieDetails, actorsDetails, trailer }: detail) => {
  console.log(movieDetails);
  console.log(actorsDetails);

  if (movieDetails && actorsDetails&& trailer) {
 
    const [display, setDisplay] = useState("none")
    const genres = movieDetails.genres;
    const director = actorsDetails.crew[0].name;
    const video = trailer.results[0].key
    return (
      <div className="w-[1080px] flex gap-6 relative items-center justify-center flex-col mt-[200px]">
        <div className="w-full h-[72px] flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
            <p className="text-lg">
              {movieDetails.release_date} • {movieDetails.origin_country[0]} •
              ...
            </p>
          </div>
          <div>
            <p className="text-sm">Rating</p>
            <div>
              <img />
              <div className="flex">
                <p>{movieDetails.vote_average}</p>
                <p>/10</p>
              </div>
              <p>{movieDetails.vote_count}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between h-[428px] w-full">
          <div className="w-[28%] h-full overflow-hidden rounded-sm">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            />
          </div>
          <div className="w-[70%] h-full relative rounded-sm overflow-hidden">
            <img
              className="bg-[rgba(0, 0, 0, 0.4)] h-full relative"
              src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
            />
            <div className="absolute flex items-center gap-4 bottom-8 left-6">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center relative overflow-hidden " onClick={()=>(setDisplay("block"))}>
                <div className="bg-black w-3 h-5 "></div>
                <div className="bg-white w-4 h-10 rotate-45 top-4 absolute"></div>
                <div className="bg-white w-4 h-10 -rotate-45 bottom-4 absolute"></div>
              </div>
              <p className="text-lg font-semibold">Play trailer</p>
            </div>
          </div>
        </div>
        <div className="flex">
          {genres.map((genre: data) => (
            <div
              className="flex items-center px-2.5 py-0.5 font-semibold border border-[#27272A] rounded-full"
              key={genre.id}
            >
              {genre.name}
            </div>
          ))}
        </div>
        <div>{movieDetails.overview}</div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full border-b flex gap-5 border-b-[#27272A]">
            <p className="font-bold">Director:</p>
            <p className="">{director}</p>
          </div>
          <div className="w-full border-b flex gap-5 border-b-[#27272A]">
            <p className="font-bold">Writters:</p>
            <p className=""></p>
          </div>
          <div className="w-full border-b flex gap-5 border-b-[#27272A]">
            <p className="font-bold">Stars:</p>
            {}
          </div>
        </div>
      <div className="w-[512px] h-[280px] absolute" style={{display:display == "block" ? "block" : "none"}}>
      <div className="w-full h-full relative "  >
       <button onClick={()=>(setDisplay("none"))} className="w-5 h-5 absolute z-10 right-3 top-3">
        x
       </button>
       <iframe className="w-full h-full absolute" title="trailer" src={`https://www.youtube.com//embed/${video}`}  allowFullScreen > </iframe>
        </div>
        {/* <iframe className="w-full h-full absolute" title="trailer" src={`https://www.youtube.com//embed/${video}`}  allowFullScreen > </iframe> */}
       
       
        </div>
      </div>
    );
  }
};
export default MovieDetails;
