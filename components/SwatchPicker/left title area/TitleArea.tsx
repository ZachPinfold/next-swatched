import React from "react";
import refreshIcon from "../../../assets/images/refresh_icon.svg";

interface Swatches {
  refreshClick: boolean;
  setRefreshClick: (arg: boolean) => void;
  setRefreshClickRotation: (arg: number) => void;
  handleRefresh: () => void;
  refreshClickRotation: number;
}

const TitleArea = ({
  setRefreshClick,
  refreshClick,
  setRefreshClickRotation,
  refreshClickRotation,
  handleRefresh,
}: Swatches) => {
  return (
    <div className='left_text_area'>
      <h1>Swatched</h1>
      <p>Wash your projects with color</p>
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
        onClick={() => {
          // handleRefresh();
          setRefreshClick(true);
          setRefreshClickRotation(refreshClickRotation + 180);
        }}
        src={refreshIcon.src}
        alt='refresh_icon'
        className={`refresh_icon `}
        style={{
          transform: `rotate(${refreshClick && `${refreshClickRotation}deg`})`,
        }}
      />
    </div>
  );
};

export default TitleArea;
