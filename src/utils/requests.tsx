import exp from "constants";

const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
    },
  };
 export const getGenre = async () => {
    const getGenres = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            options
          );
          const result = await response.json();
         return result
        } catch (error) {
          console.error("Error fetching genres:", error);
        }
      };
  };
//   export const
  