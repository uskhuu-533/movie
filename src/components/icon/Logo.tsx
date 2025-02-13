"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type fill = {
    fill: string,

}

const Logo = ({fill}:fill) => {
   const [mounted, setMounted] = useState(false);
   const router = useRouter()
   const goHome = ()=> {
       router.push(`/`)
   }
      useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) {
        return null;
      }

  return (
    <>

    <svg
    onClick={()=>goHome()}
      width="93"
      height="21"
      viewBox="0 0 93 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83341 2.16663V18.8333M14.1667 2.16663V18.8333M1.66675 10.5H18.3334M1.66675 6.33329H5.83341M1.66675 14.6666H5.83341M14.1667 14.6666H18.3334M14.1667 6.33329H18.3334M3.48341 2.16663H16.5167C17.5201 2.16663 18.3334 2.97998 18.3334 3.98329V17.0166C18.3334 18.0199 17.5201 18.8333 16.5167 18.8333H3.48341C2.4801 18.8333 1.66675 18.0199 1.66675 17.0166V3.98329C1.66675 2.97998 2.4801 2.16663 3.48341 2.16663Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.2159 4.86364H33.25L35.1648 12.6818H35.3011L39.7955 4.86364H42.8295L40.8977 16.5H38.5114L39.7727 8.92614H39.6705L35.4205 16.4432H33.7898L32.0398 8.89773H31.9432L30.6705 16.5H28.2841L30.2159 4.86364ZM47.1538 16.6705C46.2637 16.6705 45.5269 16.4811 44.9436 16.1023C44.3602 15.7197 43.9493 15.1894 43.7106 14.5114C43.4758 13.8295 43.4322 13.036 43.5799 12.1307C43.7239 11.2367 44.0231 10.4545 44.4777 9.78409C44.9322 9.11364 45.5099 8.5928 46.2106 8.22159C46.9114 7.84659 47.7012 7.65909 48.5799 7.65909C49.4663 7.65909 50.2012 7.85038 50.7845 8.23295C51.3678 8.61174 51.7788 9.14205 52.0174 9.82386C52.2561 10.5057 52.3015 11.2992 52.1538 12.2045C52.0061 13.0947 51.703 13.875 51.2447 14.5455C50.7864 15.2159 50.2087 15.7386 49.5118 16.1136C48.8148 16.4848 48.0288 16.6705 47.1538 16.6705ZM47.3924 14.7955C47.8015 14.7955 48.1633 14.6799 48.4777 14.4489C48.7959 14.214 49.0591 13.8958 49.2674 13.4943C49.4796 13.089 49.6273 12.6307 49.7106 12.1193C49.794 11.6155 49.7996 11.1686 49.7277 10.7784C49.6557 10.3845 49.5042 10.0739 49.2731 9.84659C49.0459 9.61932 48.7334 9.50568 48.3356 9.50568C47.9265 9.50568 47.5629 9.62311 47.2447 9.85795C46.9265 10.089 46.6633 10.4072 46.4549 10.8125C46.2466 11.2178 46.1008 11.678 46.0174 12.1932C45.9379 12.6932 45.9322 13.1402 46.0004 13.5341C46.0686 13.9242 46.2182 14.233 46.4493 14.4602C46.6803 14.6837 46.9947 14.7955 47.3924 14.7955ZM62.6414 7.77273L58.1357 16.5H55.4085L53.8119 7.77273H56.2778L57.0505 14.017H57.1414L59.988 7.77273H62.6414ZM62.7455 16.5L64.2001 7.77273H66.6205L65.166 16.5H62.7455ZM65.6603 6.63636C65.3004 6.63636 65.0031 6.51705 64.7682 6.27841C64.5372 6.03598 64.4425 5.74811 64.4841 5.41477C64.5258 5.07386 64.6887 4.78598 64.9728 4.55114C65.2569 4.3125 65.5788 4.19318 65.9387 4.19318C66.2985 4.19318 66.5921 4.3125 66.8194 4.55114C67.0466 4.78598 67.1413 5.07386 67.1035 5.41477C67.0656 5.74811 66.9046 6.03598 66.6205 6.27841C66.3402 6.51705 66.0201 6.63636 65.6603 6.63636ZM71.3794 16.6705C70.4855 16.6705 69.745 16.4886 69.1578 16.125C68.5707 15.7576 68.1578 15.2386 67.9192 14.5682C67.6844 13.8939 67.6446 13.0966 67.7999 12.1761C67.9514 11.2784 68.2563 10.4905 68.7147 9.8125C69.1768 9.13447 69.7563 8.60606 70.4533 8.22727C71.1503 7.84848 71.9268 7.65909 72.7828 7.65909C73.3586 7.65909 73.8794 7.75189 74.3453 7.9375C74.815 8.11932 75.2052 8.39583 75.5158 8.76705C75.8264 9.13447 76.0385 9.5947 76.1522 10.1477C76.2696 10.7008 76.2677 11.3485 76.1465 12.0909L76.0385 12.7557H68.6749L68.9078 11.2557H73.9987C74.0556 10.9072 74.0328 10.5985 73.9306 10.3295C73.8283 10.0606 73.6578 9.85038 73.4192 9.69886C73.1806 9.54356 72.887 9.46591 72.5385 9.46591C72.1825 9.46591 71.8491 9.55303 71.5385 9.72727C71.2279 9.90151 70.9666 10.1307 70.7544 10.4148C70.5461 10.6951 70.4116 11 70.351 11.3295L70.084 12.8182C70.0082 13.2765 70.0234 13.6572 70.1294 13.9602C70.2393 14.2633 70.4287 14.4905 70.6976 14.642C70.9666 14.7898 71.3075 14.8636 71.7203 14.8636C71.9893 14.8636 72.2412 14.8258 72.476 14.75C72.7147 14.6742 72.9268 14.5625 73.1124 14.4148C73.298 14.2633 73.4495 14.0758 73.5669 13.8523L75.7772 14C75.5726 14.5379 75.262 15.0076 74.8453 15.4091C74.4287 15.8068 73.9268 16.1174 73.3397 16.3409C72.7563 16.5606 72.1029 16.6705 71.3794 16.6705ZM81.2666 16.5L81.5166 15.0398L88.6814 6.89205H82.8461L83.187 4.86364H92.0961L91.8518 6.32386L84.6814 14.4716H90.5166L90.1757 16.5H81.2666Z"
        fill={fill}
      />
    </svg>
    </>
  );
};
export default Logo;
