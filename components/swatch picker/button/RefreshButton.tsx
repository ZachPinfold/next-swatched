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
      <img
        src={refreshIcon.src}
        alt="refresh_icon"
        className={`refresh_icon `}
        style={{
          transform: `rotate(${refreshClick && `${refreshClickRotation}deg`})`,
        }}
      />
    </div>
  );
};

export default RefreshButton;
