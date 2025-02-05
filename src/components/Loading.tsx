export default function Homeloading(){
  const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex animate-pulse flex-col gap-8 ">
      <div className="w-full justify-between flex px-4 h-9">
        <p className=""></p>
        <button className="font-semibold bg-black flex items-center gap-2">
          <p></p>
        </button>
      </div>
      <div className="w-full grid grid-flow-row md:grid-cols-4 sm:grid-cols-3 sm:px-8 md:px-8 gap-8 2xl:grid-cols-5 lg:grid-cols-5  xl:grid-cols-5 grid-cols-2 px-8">
        {movies.map((index) => (
          <div key={index} className="rounded-lg h-[300px] bg-gray-500/30 overflow-hidden relative ">
       
          </div>
        ))}
      </div>
    </div>
  );
};


