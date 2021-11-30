import React, { useState } from "react";
import { rgbToHex } from "../../utils/swatch";

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

  return (
    <svg
      width={circleRadius * 2}
      height={circleRadius * 2}
      className="menu_circle"
      transform={`translate(${centerX}, ${centerY})`}
      id={circleId}
      opacity={0}
    >
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        fill={rgbToHex(color)}
        id={`${circleId}_circle`}
      />{" "}
      <g transform={`translate(${15}, ${15})`}>
        <image href={image.src} height="30" width="30" />
        <text fill="black" transform={`translate(${-3}, ${18})`}>
          compare
        </text>
      </g>
    </svg>
  );
};

export default RadialMenu;
