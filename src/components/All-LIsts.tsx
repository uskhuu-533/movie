"use client";

import Lists from "./Lists";

const AllLists = () => {
  return (
    <div className="w-full flex h-auto justify-center pb-10">
      <div className="w-[1280px]  flex flex-col gap-14">
        <Lists title="Upcoming" />
        <Lists title="Popular" />
        <Lists title="Top Rated" />
      </div>
    </div>
  );
};
export default AllLists;
