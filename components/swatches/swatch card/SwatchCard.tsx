import React, { useEffect, useState } from "react";
import { rgbToHex } from "../../../utils/swatch";
import CompareImage from "../../../assets/images/compare_swatch.svg";
import CopyImage from "../../../assets/images/copy_swatch.svg";
import { connect } from "react-redux";
import { startDeleteSwatchFromSwatchList } from "../../../actions/swatch";
import { SwatchObject } from "../../../types/swatches";
import RadialMenu from "../../radial menu/RadialMenu";
import { select } from "d3";

interface SwatchTypes {
  color: number[];
  setCompareArray: (userUid: number[][]) => void;
  selectSwatchToCompareRef: any;
  setOpenState: (setOpenState: boolean) => void;
  setNumberOfSwatches: (num: number) => void;
  openState: boolean;
  swatch: SwatchObject;
  startDeleteSwatchFromSwatchList: (hex: SwatchObject) => void;
  setSwatchToCompare: (num: number[]) => void;
}

const circleMenuArray = [
  { image: CompareImage },
  { image: CopyImage },
  { image: CompareImage },
];

const SwatchCard = ({
  color,
  setCompareArray,
  selectSwatchToCompareRef,
  setOpenState,
  setNumberOfSwatches,
  openState,
  swatch,
  startDeleteSwatchFromSwatchList,
  setSwatchToCompare,
}: SwatchTypes) => {
  const [copyClicked, setCopyClicked] = useState<boolean>(false);
  const [swatchHover, setSwatchHover] = useState<boolean>(false);
  const [swatchClicked, setSwatchClicked] = useState<boolean>(false);

  const width = 180;
  const height = 180;
  const imageXOffset = -20;
  const imageYOffset = -5;
  const circleRadius = 30;
  const centerY = height / 2 - circleRadius;
  const centerX = width / 2 - circleRadius;

  const setCompareClick = () => {
    if (openState) {
      // This booleon exists so the compare section stays in the same place, and only the colours change
      setOpenState(true);
      setSwatchToCompare(color);
    } else {
      // Here we need to clear out the array to ensure the compare array only appears when the colours have been filled
      setCompareArray([]);
      setSwatchToCompare(color);
      setOpenState(true);
      setNumberOfSwatches(2);
    }
  };

  const openMenu = () => {
    const radius = 50; // the radius as a constant
    /* THETA is the angle of separation between each elemtents */
    const theta = (2 * Math.PI) / circleMenuArray.length;

    circleMenuArray.forEach((e, i) => {
      let xPosition, yPosition;

      const currentAngle = i * theta + 0.5; // calculate the current angle
      /* Get the positions */
      xPosition = radius * Math.cos(currentAngle);
      yPosition = radius * Math.sin(currentAngle);

      select(`#${circleId}_${i}`)
        .transition()
        .duration(400)
        .attr("transform", `translate(${xPosition + 60}, ${yPosition + 60})`)
        .attr("opacity", "1");

      select(`#${circleId}_${i}_circle`)
        .transition()
        .duration(400)
        .attr("fill", "rgba(0, 0, 0, 0.15)");
    });
  };

  const closeMenu = () => {
    circleMenuArray.forEach((e, i) => {
      select(`#${circleId}_${i}`)
        .transition()
        .duration(400)
        .attr("transform", `translate(${centerX}, ${centerY})`)
        .attr("fill", rgbToHex(color))
        .attr("opacity", "0");
    });
  };

  // useEffect(() => {
  //   openMenu();
  // }, []);

  const circleId: string = `circle_${swatch.colourId}`;

  return (
    <div
      style={{ backgroundColor: rgbToHex(color) }}
      key={color[0]}
      className="swatch_card"
      onClick={() => {
        selectSwatchToCompareRef.current = true;
      }}
      onMouseEnter={() => setSwatchHover(true)}
      onMouseLeave={() => {
        setSwatchHover(false);
        setSwatchClicked(false);
        closeMenu();
      }}
    >
      <div
        onMouseEnter={() => {
          openMenu();
          setSwatchClicked(true);
        }}
        className="hover_button"
        style={{
          opacity: swatchClicked ? "0" : swatchHover ? "1" : "0",
          cursor: swatchClicked
            ? "inherit"
            : swatchHover
            ? "pointer"
            : "inherit",
        }}
      ></div>
      <div className="half_circle_hovers">
        {/* <div onClick={setCompareClick} className="half half_top">
          <img src={CompareImage.src} alt="compare_image" />
          <h4>compare swatch</h4>
        </div> */}

        {circleMenuArray.map((menu, index) => (
          <RadialMenu
            color={color}
            swatchId={circleId}
            index={index}
            image={menu.image}
            centerY={centerY}
            centerX={centerX}
            circleRadius={circleRadius}
          />
        ))}

        {/* <div
          onClick={() => {
            navigator.clipboard.writeText(rgbToHex(color));
            setCopyClicked(true);
          }}
          onMouseLeave={() => {
            setTimeout(function () {
              setCopyClicked(false);
            }, 200);
          }}
          className="half half_bottom"
        >
          <img src={CopyImage.src} alt="compare_image" />
          {!copyClicked ? <h4>copy hex</h4> : <h4>copied!</h4>}
        </div> */}
      </div>
      {/* <button onClick={() => startDeleteSwatchFromSwatchList(swatch)}>
        delete
      </button> */}
    </div>
  );
};

export default connect(null, { startDeleteSwatchFromSwatchList })(SwatchCard);
