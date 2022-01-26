import React, { Fragment } from "react";
import PlusHex from "../../../assets/images/PlusHex";

interface HexTypes {
  colourLoaded: boolean;
  handleHexAdd: (event: any) => void;
  rgbInputValue: string[];
  applyRgbInput: (e: string, id: string) => void;
  rgbFocus1: any;
  rgbFocus2: any;
  rgbFocus3: any;
  handleRgbAdd: (event: any) => void;
  rgbInput: boolean;
}

const HexAdder = ({
  colourLoaded,
  handleHexAdd,
  rgbInputValue,
  applyRgbInput,
  rgbFocus1,
  rgbFocus2,
  rgbFocus3,

  handleRgbAdd,
  rgbInput,
}: HexTypes) => {
  return (
    <Fragment>
      <form
        style={{ right: colourLoaded ? "28px" : "0" }}
        className={`rgb_input`}
        onSubmit={(e) => handleHexAdd(e)}
      >
        <input
          value={rgbInputValue[0]}
          onChange={(e) => applyRgbInput(e.target.value, e.target.id)}
          type="text"
          id={"0"}
          ref={rgbFocus1}
        />
        <input
          value={rgbInputValue[1]}
          onChange={(e) => applyRgbInput(e.target.value, e.target.id)}
          type="text"
          id={"1"}
          ref={rgbFocus2}
        />
        <input
          value={rgbInputValue[2]}
          onChange={(e) => applyRgbInput(e.target.value, e.target.id)}
          type="text"
          id={"2"}
          ref={rgbFocus3}
        />
      </form>
      <div style={{ opacity: colourLoaded ? "1" : "0" }} className="outer_svg">
        <PlusHex
          color={"white"}
          colourLoaded={colourLoaded}
          handleHexAdd={handleRgbAdd}
          rgbInput={rgbInput}
        />
      </div>
    </Fragment>
  );
};

export default HexAdder;
