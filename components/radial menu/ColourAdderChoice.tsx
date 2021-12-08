import React, { useEffect, useRef } from "react";
import { rgbToHex } from "../../utils/swatch";
import { select } from "d3";

interface SVGTypes {
  index: number;
  image: any;
  circleRadius: number;
  centerX: number;
  centerY: number;
  text: string;
  menuOpen: boolean;
  func: any;
}

const ColourAdderChoice = ({
  index,
  image,
  circleRadius,
  centerY,
  centerX,
  text,
  menuOpen,
  func,
}: SVGTypes) => {
  const circleId: string = `decider_${text}_${index}`;

  const initialLoad = useRef(false);

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
    <g
      width={circleRadius * 2}
      height={circleRadius * 2}
      // className={`action_decider`}
      transform={`translate(${centerX}, ${centerY})`}
      id={`${circleId}`}
      onMouseEnter={() => setHoverOpacity(true)}
      onMouseLeave={() => {
        setHoverOpacity(false);
      }}
      onClick={func}
      opacity={0}
    >
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        id={`${circleId}_circle`}
      />{" "}
      <g transform={`translate(${22}, ${21})`}>
        <image href={image.src} height="26" width="26" id={`${circleId}_img`} />
        <text
          id={`${circleId}_txt`}
          fill="white"
          x="7%"
          y="10%"
          text-anchor="middle"
          opacity={0}
        >
          {text}
        </text>
      </g>
    </g>
  );
};

export default ColourAdderChoice;
