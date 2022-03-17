import React from "react";
interface Actions {
  color: string;
}

const Minus = ({ color }: Actions) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 81.38 13.61"
    >
      <g>
        <path
          fill={color}
          d="M40.64,13.6c-11.11,0-22.22,0.03-33.33-0.02c-5.27-0.02-8.64-4.62-6.79-9.2c1.12-2.78,3.3-4.35,6.33-4.35
		c22.5-0.04,44.99-0.05,67.49,0c4.05,0.01,7.08,3.09,7.05,6.82c-0.03,3.74-3.06,6.71-7.14,6.73C63.04,13.64,51.84,13.6,40.64,13.6z"
        />
      </g>
    </svg>
  );
};

export default Minus;
