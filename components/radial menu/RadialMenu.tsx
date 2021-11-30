import React, { useState } from "react";

interface SVGTypes {
  color: number[];
  swatchId: string;
  index: number;
  image: any;
  imageYOffset: number;
  imageXOffset: number;
}

const RadialMenu = ({
  color,
  swatchId,
  index,
  image,
  imageXOffset,
  imageYOffset,
}: SVGTypes) => {
  const width = 180;
  const height = 180;
  const circleRadius = 30;
  const centerY = height / 2 - circleRadius;
  const centerX = width / 2 - circleRadius;

  const circleId: string = `${swatchId}_${index}`;

  const [circleHover, setCircleHover] = useState(false);

  return (
    <svg
      width={circleRadius * 2}
      height={circleRadius * 2}
      className="menu_circle"
      transform={`translate(${centerX}, ${centerY})`}
      id={circleId}
    >
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        fill="green"
      />{" "}
      <g
      // transform={`translate(${imageXOffset}, ${imageYOffset}) rotate(-30)`}
      // id={`${circleId}_img`}
      // opacity={0}
      >
        <image href={image.src} height="27" width="27" />
        <text>copy</text>
      </g>
      {/* <g
        transform={`translate(${centerX}, ${centerY}) rotate(30)`}
        style={{ cursor: "pointer", zIndex: "1" }}
        onMouseEnter={() => setCircleHover(!circleHover)}
      >
      </g> */}
    </svg>
  );
};

export default RadialMenu;
