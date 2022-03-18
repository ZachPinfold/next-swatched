import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { startGetUserSwatches } from "../../../actions/swatch";
import DropDownArrow from "../../../assets/images/DropDownArrow";
import { ColorNamesType } from "../../../types/swatches";
import FilterListItem from "./FilterListItem";

interface Actions {
  startGetUserSwatches: (
    userUid: string,
    colorFilter: string,
    isInitialLoad: boolean
  ) => void;
  isClickedOutside: boolean;
  setIsClickedOutside: (close: boolean) => void;
  colorFilter: ColorNamesType;
  setColorFilter: (color: ColorNamesType) => void;
  setDropdownOpen: (open: boolean) => void;
  isDropdownOpen: boolean;
  refId: string;
  list: ColorNamesType[];
  userID: string;
}

const ColorFilter = ({
  startGetUserSwatches,
  isClickedOutside,
  setIsClickedOutside,
  setColorFilter,
  colorFilter,
  isDropdownOpen,
  setDropdownOpen,
  refId,
  list,
  userID,
}: Actions) => {
  const colorRef = useRef<string>();

  useEffect(() => {
    if (isClickedOutside) {
      setDropdownOpen(false);
      setIsClickedOutside(false);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    colorFilter &&
      userID.length > 0 &&
      colorRef.current &&
      colorFilter.name !== colorRef.current &&
      startGetUserSwatches(userID, colorFilter.name, false);
    colorRef.current = colorFilter.name;
  }, [colorFilter, userID]);

  const someStyle: any = {
    "--currentColor": colorFilter.rgb,
  };

  return (
    <div className="dropdown">
      <div
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="dropdown_selected"
        style={someStyle}
        id={refId}
      >
        <p id={refId}>{colorFilter.name}</p>
        <div
          className="dropdown_arrow_box"
          style={{
            transform: isDropdownOpen ? `rotate(180deg)` : `rotate(0deg)`,
            marginTop: isDropdownOpen ? `-4px` : `0`,
          }}
        >
          <DropDownArrow />
        </div>
        <div id={refId} className="menu_overlay"></div>
      </div>
      <div
        style={someStyle}
        className={"dropdown_list " + (isDropdownOpen && "open_list")}
      >
        {" "}
        <ul>
          {list.map((color) => {
            if (colorFilter.name !== color.name)
              return (
                <Fragment key={color.name}>
                  <FilterListItem
                    color={color}
                    setColorFilter={setColorFilter}
                    setDropdownOpen={setDropdownOpen}
                  />
                </Fragment>
              );
          })}
        </ul>
      </div>
    </div>
  );
};

interface StateProps {
  userID: string;
}

const mapStateToProps = (state: any): StateProps => ({
  userID: state.auth.userID,
});

export default connect(mapStateToProps, { startGetUserSwatches })(ColorFilter);
