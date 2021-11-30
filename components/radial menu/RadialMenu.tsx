import React, { useEffect, useRef, useState } from "react";
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
  text: string;
  menuOpen: boolean;
  func: any;
}

const RadialMenu = ({
  color,
  swatchId,
  index,
  image,
  circleRadius,
  centerY,
  centerX,
  text,
  menuOpen,
  func,
}: SVGTypes) => {
  const circleId: string = `${swatchId}_${index}`;

  const initialLoad = useRef(false);

  console.log(menuOpen);

  const setHoverOpacity = (open: boolean) => {
    if (initialLoad.current === true) {
      select(`#${circleId}_img`)
        .transition()
        .duration(300)
        .attr("opacity", open ? "0" : "1");
      select(`#${circleId}_txt`)
        .transition()
        .duration(300)
        .attr("opacity", open ? "1" : "0");
    }
  };

  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => {
        initialLoad.current = true;
      }, 0);
    } else initialLoad.current = false;
  }, [menuOpen]);

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
      onClick={func}
    >
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        fill={rgbToHex(color)}
        id={`${circleId}_circle`}
      />{" "}
      <g transform={`translate(${17}, ${18})`}>
        <image href={image.src} height="35" width="35" id={`${circleId}_img`} />
        <text
          id={`${circleId}_txt`}
          fill="white"
          x="25%"
          y="35%"
          text-anchor="middle"
          opacity={0}
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

export default RadialMenu;
