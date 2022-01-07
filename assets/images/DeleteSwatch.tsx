import React from "react";

interface AssetType {
  color: string;
}

const DeleteSwatch = ({ color }: AssetType) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 107.5 107.5"
    >
      <style type="text/css"></style>
      <g>
        <path
          className="st0"
          fill={color}
          d="M40.6,79.8c-3.7,3.7-7.3,7.5-11.1,11c-3.2,2.9-7.4,3.1-10.9,0.9c-3.6-2.3-5.3-6.6-3.8-10.6
		c0.7-1.9,2.1-3.6,3.5-5c6.5-6.6,13-13.2,19.6-19.6c2.1-2,2.3-3.2,0.1-5.4c-6.9-6.6-13.6-13.4-20.3-20.2c-3.6-3.6-4.4-7.6-2.5-11.3
		c2.8-5.6,9.8-7.1,14.4-2.7c6.9,6.5,13.4,13.3,20.2,19.9c4.5,4.4,3.2,4.5,7.7,0.1c6.7-6.6,13.2-13.3,19.9-19.8
		c3.2-3.2,7.6-3.6,11.2-1.4c3.7,2.3,5.6,6.5,4.1,10.4c-0.7,2-2.1,3.8-3.6,5.3C82.6,38.1,76,44.7,69.2,51.2c-2.2,2.1-1.9,3.2,0.1,5.2
		c7.2,7,14.3,14.2,21.3,21.4c2.6,2.7,3.1,6.1,1.7,9.5c-1.4,3.5-4.1,5.4-7.8,5.8c-3.4,0.4-5.9-1.3-8.2-3.6
		c-6.7-6.7-13.4-13.3-20-20.1c-1.9-2-3.1-2.3-5.2-0.1C47.8,73,44.2,76.4,40.6,79.8C40.6,79.9,40.6,79.9,40.6,79.8z"
        />
      </g>
    </svg>
  );
};

export default DeleteSwatch;
