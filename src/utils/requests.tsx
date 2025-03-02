const key = "2e484ac3ed90b99b5bad898e86132c71";

// const key = process.env.NEXT_PUBLIC_API_KEY


export const getGenre = async () => {

  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${key}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching genres:", error);
  }
};
export const getMovieNowPlaying = async () => {
  
  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${key}`
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getMovieDetail = async (
  movieID: string | string[] | undefined
) => {
  try {
    const [movieResponse, creditsResponse, videoResponse, similarResponse] =
      await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US&api_key=${key}`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US&api_key=${key}`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US&api_key=${key}`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1&api_key=${key}`
        ),
      ]);

    const [movieDetails, actorsDetails, trailer, similaMovies] =
      await Promise.all([
        movieResponse.json(),
        creditsResponse.json(),
        videoResponse.json(),
        similarResponse.json(),
      ]);
    return {
      movieDetails,
      actorsDetails,
      trailer,
      similaMovies: similaMovies.results,
    };
  } catch (error) {
    console.log("Error fetching movie details:", error);
  }
};
export const getMovieGenres = async (
  genreID: number[],
  currentPage: number
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreID}&page=${currentPage}&api_key=${key}`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getTailer = async (movieID: string | string[] | undefined) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US&api_key=${key}`
    );
    const result = await response.json();
    console.log(result.results, "temdeg");
    return result.results[0].key;
  } catch (error) {
    console.log(error);
  }
};
export const getCategoryMovie = async (
  category: string | string[] | undefined,
  currenrPage: number
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${currenrPage}&api_key=${key}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getsearchMovie = async (
  searchValue: string,
  currentPage: number
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en&page=${currentPage}&api_key=${key}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getSimilarMovie = async (
  movieID: string | string[] | undefined,
  currenrPage: number
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=${currenrPage}&api_key=${key}`
    );
    const results = await response.json();
    console.log(results);

    return results;
  } catch (error) {
    console.log(error);
  }
};
