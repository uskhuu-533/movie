type Props = {
  width :string,
  height : string
}
const Star = ({width, height}:Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99967 3.3335L10.0597 7.50683L14.6663 8.18016L11.333 11.4268L12.1197 16.0135L7.99967 13.8468L3.87967 16.0135L4.66634 11.4268L1.33301 8.18016L5.93967 7.50683L7.99967 3.3335Z"
        fill="#FDE047"
        stroke="#FDE047"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default Star;
