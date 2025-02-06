

const GenreLoading = () => {
    const movie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 1, 1];
    return( <><div className="text-xl w-[70%] animate-pulse font-semibold h-[15px]">
        
     
      </div>
      <div className="grid animate-pulse grid-flow-row grid-cols-4 gap-10">
        {movie?.map((el, index) => (
          <div
            key={index}
            className="overflow-hidden  h-[400px] bg-gray-500/30  relative bg-secondary rounded-lg group/item"
          
          >
       
          </div>
          
        ))}
      </div>
      
      </>)
} 
export default GenreLoading