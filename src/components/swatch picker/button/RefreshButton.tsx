import React from "react";
import refreshIcon from "../../../assets/images/refresh_icon.svg";

interface ButtonActions {
  refreshClick: boolean;
  setRefreshClick: (arg: boolean) => void;
  setRefreshClickRotation: (arg: number) => void;
  handleRefresh: () => void;
  refreshClickRotation: number;
}

const RefreshButton = ({
  handleRefresh,
  setRefreshClick,
  setRefreshClickRotation,
  refreshClickRotation,
  refreshClick,
}: ButtonActions) => {
  return (
    <div className="button_area">
      <button
        onClick={() => {
          handleRefresh();
          setRefreshClick(true);
          setRefreshClickRotation(refreshClickRotation + 180);
        }}
      >
        refresh
      </button>
    </div>
  );
};

export default RefreshButton;
