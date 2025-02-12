"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Close = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1L1 9M1 1L9 9"
        stroke={theme === "dark" ? "black" : "white"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default Close;
