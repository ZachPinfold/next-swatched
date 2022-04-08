import React, { useEffect, useRef } from "react";
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
  swatchToCompare: number[];
  isCopied: boolean;
  setIsCopied: (isCOpied: boolean) => void;
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
  swatchToCompare,
  isCopied,
  setIsCopied,
}: SVGTypes) => {
  const circleId: string = `${swatchId}_${index}`;

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
      transform={`translate(${centerX}, ${centerY})`}
      id={`${circleId}`}
      onMouseEnter={() => setHoverOpacity(true)}
      onMouseLeave={() => {
        setHoverOpacity(false);
        setTimeout(() => {
          setIsCopied(false);
        }, 300);
      }}
      onClick={func}
      opacity={0}
    >
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        fill={rgbToHex(color)}
        id={`${circleId}_circle`}
      />{" "}
      <g
        transform={`translate(${text === "match" ? 20 : 22}, ${
          text === "match" ? 20 : 22
        })`}
      >
        <image
          href={image.src}
          height={text === "match" ? "30" : "26"}
          width={text === "match" ? "30" : "26"}
          id={`${circleId}_img`}
        />
        <text
          id={`${circleId}_txt`}
          fill="white"
          x="7%"
          y="10%"
          textAnchor="middle"
          opacity={0}
        >
          {text === "lock" && color === swatchToCompare
            ? "locked"
            : text === "lock" && color !== swatchToCompare
            ? "lock"
            : text === "copy" && isCopied
            ? "copied"
            : text === "copy" && !isCopied
            ? text
            : text}
        </text>
      </g>
    </g>
  );
};

export default RadialMenu;
