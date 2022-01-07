import { select, selectAll } from "d3";
import { rgbToHex } from "./swatch";

export const openCircleMenuD3 = (
  circleId: string,
  i: number,
  xPosition: number,
  yPosition: number,
  localSwatchId: string,
  largeWindowSize: Boolean | null
) => {
  let actionAttachment: string = "";
  let windowSizeOffset: number = 0;

  largeWindowSize ? (windowSizeOffset = 0) : (windowSizeOffset = 5);

  !circleId.includes("decider")
    ? (actionAttachment = "action_circles")
    : (actionAttachment = "action_decider");

  select(`#${circleId}_${i}`)
    .transition()
    .duration(400)
    .attr(
      "transform",
      `translate(${xPosition + 55 - windowSizeOffset}, ${
        yPosition + 55 - windowSizeOffset
      })`
    )
    .attr("opacity", "1")
    .attr("class", `${actionAttachment} circle_${localSwatchId}_active`);

  select(`#${circleId}_${i}_circle`)
    .transition()
    .duration(400)
    .attr("fill", "rgba(0, 0, 0, 0.15)");
};

export const closeNotActiceMenuCirclesD3 = (
  swatchId: string,
  centerX: number,
  centerY: number,
  color: number[]
) => {
  selectAll(`.action_circles:not(.circle_${swatchId}_active)`)
    .transition()
    .duration(400)
    .attr("transform", `translate(${centerX}, ${centerY})`)
    .attr("fill", rgbToHex(color))
    .attr("opacity", "0");
};

export const closeMenuOnHoverLeaveD3 = (
  circleId: string,
  i: number,
  centerX: number,
  centerY: number,
  color: number[]
) => {
  select(`#${circleId}_${i}`)
    .transition()
    .duration(400)
    .attr("transform", `translate(${centerX}, ${centerY})`)
    .attr("fill", rgbToHex(color))
    .attr("opacity", "0");
};
