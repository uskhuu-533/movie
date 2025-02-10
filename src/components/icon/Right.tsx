'use client'

import { useTheme } from "next-themes";

const Right = () => {
  const {theme} = useTheme()
  if(theme){
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 9L5 5L1 1"
        stroke={theme == "dark" ? "white" : "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
};
export default Right;
