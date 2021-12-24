import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../../../actions/swatch";

const colorNames: string[] = [
  "all",
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "magenta",
  "pink",
];

interface Actions {
  startGetUserSwatches: (userUid: string, colorFilter: string) => void;
}

const ColorFilter = ({ startGetUserSwatches }: Actions) => {
  const [colorFilter, setColorFilter] = useState<string>();
  const colorRef = useRef<string>();

  useEffect(() => {
    colorFilter &&
      colorFilter !== colorRef.current &&
      startGetUserSwatches("", colorFilter);
    colorRef.current = colorFilter;
  }, [colorFilter]);

  return (
    <ul className="color_name_list">
      {colorNames.map((color) => {
        return (
          <li onClick={() => setColorFilter(color)} key={color}>
            {color}
          </li>
        );
      })}
    </ul>
  );
};

export default connect(null, { startGetUserSwatches })(ColorFilter);
