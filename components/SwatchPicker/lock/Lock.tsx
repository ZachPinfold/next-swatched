import React from "react";

// Apply any to allow for includes() function

interface Actions {
  setLockedSwatches: (swatch: number[][]) => void;
  result: any;
  lockedSwatches: number[][];
}

const Lock = ({ setLockedSwatches, result, lockedSwatches }: Actions) => {
  const removeFromSwatch = (result: number[]) => {
    setLockedSwatches(lockedSwatches.filter((r) => r !== result));
  };

  return (
    <div
      onClick={() =>
        !lockedSwatches.includes(result)
          ? setLockedSwatches([...lockedSwatches, result])
          : removeFromSwatch(result)
      }
      className='outer_lock'
    >
      <div
        className={"lock " + (!lockedSwatches.includes(result) && "unlocked")}
      ></div>
    </div>
  );
};

export default Lock;
