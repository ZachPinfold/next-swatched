import React, { useState } from "react";
import { connect } from "react-redux";
import { startAddSwatchToSwatchList } from "../../../actions/swatch";
import Plus from "../../../assets/images/Plus";

import { getContrastYIQ, isHexColor } from "../../../utils/swatch";
interface SwatchTypes {
  color: number[];
  startAddSwatchToSwatchList: (hex: string) => void;
}

const SwatchAdderCard = ({ startAddSwatchToSwatchList }: SwatchTypes) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [colourLoaded, setColourLoaded] = useState<boolean>(false);

  const applyHexInput = (e: string) => {
    const str: string = e.replace("#", "");

    const isHexColour: boolean = isHexColor(str);

    setInputValue(str);
    isHexColour ? setColourLoaded(true) : setColourLoaded(false);
  };

  const handleHexAdd = (e: any) => {
    e.preventDefault();
    if (colourLoaded) startAddSwatchToSwatchList(`#${inputValue}`);
  };

  return (
    <div
      className="swatch_adder_card swatch_card"
      style={{
        backgroundColor:
          inputValue.length === 0
            ? "rgb(6, 214, 160, 0.3)"
            : inputValue.length === 6
            ? `#${inputValue}`
            : "rgb(255, 100, 89, 0.4)",
      }}
    >
      <form
        style={{ marginLeft: colourLoaded ? "-40px" : "-15px" }}
        className={colourLoaded ? "colour_loaded" : ""}
        onSubmit={(e) => handleHexAdd(e)}
      >
        <span style={{ opacity: inputValue.length > 0 ? "1" : "0" }}>#</span>
        <input
          value={inputValue}
          onChange={(e) => applyHexInput(e.target.value)}
          type="text"
          placeholder="# add hex"
          style={{
            padding:
              inputValue.length < 1 ? "4px 6px 4px 6px" : "4px 6px 4px 15px",
          }}
        />
        <div
          style={{ opacity: colourLoaded ? "1" : "0" }}
          className="outer_svg"
          onSubmit={(e) => handleHexAdd(e)}
        >
          <Plus color={getContrastYIQ(`#${inputValue}`)} />
        </div>
      </form>
    </div>
  );
};

export default connect(null, { startAddSwatchToSwatchList })(SwatchAdderCard);
