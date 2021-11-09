import React from "react";

interface Actions {
  setLockedSwatches: (swatch: number[][]) => void;
  result: number[];
  lockedSwatches: number[][];
}

const Lock = ({ setLockedSwatches, result, lockedSwatches }: Actions) => {
  return (
    <div
      onClick={() =>
        lockedSwatches.includes(result)
          ? setLockedSwatches([...lockedSwatches, result])
          : setLockedSwatches(lockedSwatches)
      }
      className='outer_lock'
    >
      <div
        className={"lock " + (lockedSwatches.includes(result) && "unlocked")}
      ></div>
    </div>
  );
};

export default Lock;
