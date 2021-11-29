import React, { useState } from "react";

interface SVGTypes {
  color: number[];
  swatchId: string;
  index: number;
}

const RadialMenu = ({ color, swatchId, index }: SVGTypes) => {
  const width = 180;
  const height = 180;
  const centerX = width / 2;
  const centerY = height / 2;
  const eyeRadius = 20;

  const [eyeOffsetX, setEyeOffsetX] = useState(-90);
  const [eyeOffsetY, setEyeOffsetY] = useState(-90);

  const circleId: string = `${swatchId}_${index}`;

  return (
    <div>
      <svg width={width} height={height} className="menu_circle">
        <g
          fill="green"
          transform={`translate(${centerX}, ${centerY}) rotate(30)`}
        >
          <circle cx={0} cy={0} r={eyeRadius} fill="black" id={circleId} />
        </g>
      </svg>
    </div>
  );
};

export default RadialMenu;
