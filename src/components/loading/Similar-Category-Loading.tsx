const SimilarCategoryLoading = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 1, 1];
    return(
        <div className="w-[1080px] py-[100px] animate-pulse flex flex-col items-center justify-center gap-8 ">
          <div className="w-full justify-between flex h-9">
            <div className="capitalize text-foreground text-2xl h-9 rounded-full w-[100px] bg-gray-500/30  text-white font-semibold xl:px-0 px-8">
            
            </div>
          </div>
          <div className="w-full grid grid-flow-row md:grid-cols-5 sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:px-0 px-8 gap-8">
            {data.map((el, index) => (
              <div
                key={index}
                className="rounded-lg relative h-[385px] bg-gray-500/30 overflow-hidden "
             
              >
              </div>
            ))}
          </div>

        </div>
    )
}
export default SimilarCategoryLoading