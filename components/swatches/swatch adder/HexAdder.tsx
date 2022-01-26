import React, { Fragment } from "react";
import PlusHex from "../../../assets/images/PlusHex";

interface HexTypes {
  colourLoaded: boolean;

  handleHexAdd: (e: any) => void;
  hexInputValue: string;
  applyHexInput: (event: string) => void;
  hexFocus: any;
  rgbInput: boolean;
}

const HexAdder = ({
  colourLoaded,
  handleHexAdd,
  hexInputValue,
  applyHexInput,
  hexFocus,
  rgbInput,
}: HexTypes) => {
  return (
    <Fragment>
      <form
        style={{ right: colourLoaded ? "20px" : "0" }}
        className={`hex_input`}
        onSubmit={(e) => handleHexAdd(e)}
      >
        <span style={{ opacity: hexInputValue.length > 0 ? "1" : "0" }}>#</span>
        <input
          value={hexInputValue}
          onChange={(e) => applyHexInput(e.target.value)}
          type="text"
          placeholder="# add hex"
          style={{
            padding:
              hexInputValue.length < 1 ? "4px 6px 4px 6px" : "4px 6px 4px 15px",
          }}
          ref={hexFocus}
        />
      </form>
      <div style={{ opacity: colourLoaded ? "1" : "0" }} className="outer_svg">
        <PlusHex
          color={"white"}
          colourLoaded={colourLoaded}
          handleHexAdd={handleHexAdd}
          rgbInput={rgbInput}
        />
      </div>
    </Fragment>
  );
};

export default HexAdder;
