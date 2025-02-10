import { getGenre } from "@/utils/requests";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import Close from "./icon/Close";
import Right from "./icon/Right";
import { useTheme } from "next-themes";
type Data = {
  id: number;
  name: string;
};
type props = {
  theme: string | null;
};
const Genre = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [genreID, setGenreID] = useQueryState("genresid", {
    defaultValue: [],
    parse: (value) =>
      value
        .split(",")
        .map(Number)
        .filter((num) => num !== 0),
    serialize: (array) => array.join(","),
  });
  const [genre, setGenre] = useState<Data[]>([]);
  const [Page, setPage] = useState("");
  useEffect(() => {
    const fetchgetGenre = async () => {
      try {
        const data = await getGenre();
        setGenre(data.genres);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    fetchgetGenre();
  }, []);
  const toggleGenre = (id: number) => {
    const updatedGenres = genreID.includes(id)
      ? genreID.filter((genre) => genre !== id)
      : [...genreID, id];
    {
      Page == "genres" && setGenreID(updatedGenres);
      Page == "search" && setGenreID(updatedGenres)
    }
    const queryParam = updatedGenres.join(",");
    router.push(`/genres?genresid=${queryParam}`);
  };
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/search") {
      setPage("search");
    } else if (path === "/genres") {
      setPage("genres");
    } else {
      setPage("");
    }
  }, []);
  return (
    <>
      {genre.map((el) => (
        <div
          key={el.id}
          onClick={() => toggleGenre(el.id)}
          className="border border-[#27272A] rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-1 flex items-center "
          style={
            theme == "dark"
              ? {
                  background: genreID.includes(el.id) ? "white" : "none",
                  color: genreID.includes(el.id) ? "black" : "white",
                }
              : theme !== "dark"
              ? {
                  background: genreID.includes(el.id) ? "black" : "white",
                  color: genreID.includes(el.id) ? "white" : "black",
                }
              : theme == "dark"
              ? { background: "black", color: "white" }
              : theme !== "dark"
              ? { color: "white", background: "black" }
              : {}
          }
        >
          <p>{el.name}</p>
          {genreID.includes(el.id) ? <Close /> : <Right />}
        </div>
      ))}
    </>
  );
};
export default Genre;
