import React from "react";

interface Actions {
  setLockedSwatches: (swatch: number[][] | string[]) => void;
  result: any;
  lockedSwatches: number[][] | string[];
}

const Lock = ({ setLockedSwatches, result, lockedSwatches }: Actions) => {
  return (
    <div
      onClick={() =>
        !lockedSwatches.includes(result)
          ? setLockedSwatches(result)
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
