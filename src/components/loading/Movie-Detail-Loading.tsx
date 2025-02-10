const MovieDetailLoading = () => {
  const genres = [1, 2, 3];
  const similaMovies = [1, 2, 3, 4, 5];
  return (
    <div className="max-w-[1080px] flex gap-6 animate-pulse items-center flex-col mt-[200px]">
      <div className="w-full h-[72px] flex justify-between xl:px-0 px-8">
        <div>
          <h1 className="text-3xl h-9 w-[100px] rounded-full bg-gray-500/30 font-bold"></h1>
          <p className="text-lg h-4 w-[80px] rounded-full bg-gray-500/30 "></p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm h-4 w-[80px] rounded-full bg-gray-500/30 "></p>
          <div className="flex">
            <div className="h-4 w-[80px] rounded-full bg-gray-500/30 ">
           
              <div className="bg-gray-500/30 rounded-full text-sm"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between h-[428px] px-9 xl:px-0 w-full">
        <div className="w-[28%] bg-gray-500/30  lg:block hidden h-full overflow-hidden rounded-sm"></div>
        <div className="lg:w-[70%] bg-gray-500/30 w-full h-auto relative rounded-sm overflow-hidden">
          
        </div>
      </div>
      <div className="flex w-full xl:px-0 px-8 gap-4 ">
        <div className="w-[28%] lg:hidden  h-full overflow-hidden bg-gray-500/30 rounded-sm"></div>
        <div className=" w-full flex flex-col gap-4">
          <div className="flex gap-2 w-full ">
            {genres.map((genre, index) => (
              <div
                className="flex bg-gray-500/30 h-[30px] w-[80px] px-2.5 py-0.5 font-semibold border border-[#27272A] rounded-full"
                key={index}
              ></div>
            ))}
          </div>
          <div className="text-lg h-6 w-10 bg-500/30"></div>
        </div>
      </div>
      <div className="w-full flex flex-col text-lg gap-4 xl:px-0 px-8">
        <div className="w-full border-b flex gap-5 border-b-[#27272A]">
          <p className="font-bold h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
          <p className="h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
        </div>
        <div className="w-full border-b flex gap-5 border-b-[#27272A]">
          <p className="font-bold h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
          <p className="h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
        </div>
        <div className="w-full border-b flex gap-5 border-b-[#27272A]">
          <p className="h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
          <p className="h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
          <p className="h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
          <p className="h-6 w-[60px] bg-gray-500/30 rounded-full"></p>
       
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 xl:px-0 px-8">
        <div className="flex w-full justify-between h-6 w-[60px] bg-500/30">
          <div className="text-2xl font-bold h-6 w-[60px] bg-500/30  "></div>
          <div className="flex items-center gap-1 font-semibold h-6 w-[60px] bg-500/30"></div>
        </div>
        <div className="w-full flex flex-wrap gap-8">
          {similaMovies.map((results, index) => (
            <div
              key={index}
              className="rounded-lg h-[381px] bg-gray-500/30 w-[190px] overflow-hidden"
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieDetailLoading;
