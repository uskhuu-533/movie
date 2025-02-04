'use client'

import { useEffect, useState } from "react";
const SeeMore = () => {
  const [theme, setTheme] = useState<string | null> ("")
  useEffect(()=> {
    const theme = ()=> {
      const theme = localStorage.getItem("theme")
      setTheme(theme)
    }
    theme()
  })
  console.log(theme);
  
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.3335 6.00016H10.6668M10.6668 6.00016L6.00016 1.3335M10.6668 6.00016L6.00016 10.6668"
        stroke={theme == "dark" ? "black" : "white"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SeeMore;
