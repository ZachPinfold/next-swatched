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
  const centerX = width / 2;
  const centerY = height / 2;
  const circleRadius = 28;

  const circleId: string = `${swatchId}_${index}`;

  console.log(image);

  return (
    <div>
      <svg width={width} height={height} className="menu_circle">
        <g transform={`translate(${centerX}, ${centerY}) rotate(30)`}>
          <circle cx={0} cy={0} r={circleRadius} fill="none" id={circleId} />{" "}
          <g
            transform={`translate(${imageXOffset}, ${imageYOffset}) rotate(-30)`}
            id={`${circleId}_img`}
            opacity={1}
          >
            <image
              href={image.src}
              height="27"
              width="27"
              id={`${circleId}_img`}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default RadialMenu;
