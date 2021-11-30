import React, { useState } from "react";
import { rgbToHex } from "../../utils/swatch";
import { select } from "d3";

interface SVGTypes {
  color: number[];
  swatchId: string;
  index: number;
  image: any;
  circleRadius: number;
  centerX: number;
  centerY: number;
}

const RadialMenu = ({
  color,
  swatchId,
  index,
  image,
  circleRadius,
  centerY,
  centerX,
}: SVGTypes) => {
  const circleId: string = `${swatchId}_${index}`;

  const [circleHover, setCircleHover] = useState(false);

  const setHoverOpacity = (open: boolean) => {
    select(`#${circleId}_img`)
      .transition()
      .duration(200)
      .attr("opacity", open ? "0" : "1");
    select(`#${circleId}_txt`)
      .transition()
      .duration(200)
      .attr("opacity", open ? "1" : "0");
  };

  return (
    <svg
      width={circleRadius * 2}
      height={circleRadius * 2}
      className="menu_circle"
      transform={`translate(${centerX}, ${centerY})`}
      id={circleId}
      opacity={0}
      onMouseEnter={() => setHoverOpacity(true)}
      onMouseLeave={() => setHoverOpacity(false)}
    >
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        fill={rgbToHex(color)}
        id={`${circleId}_circle`}
      />{" "}
      <g transform={`translate(${15}, ${15})`}>
        <image
          href={image.src}
          height="30"
          width="30"
          opacity={circleHover ? "0" : "1"}
          id={`${circleId}_img`}
        />
        <text
          id={`${circleId}_txt`}
          fill="black"
          x="25%"
          y="35%"
          text-anchor="middle"
          opacity={0}
        >
          compare
        </text>
      </g>
    </svg>
  );
};

export default RadialMenu;
