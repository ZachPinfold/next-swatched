import React from "react";

interface Actions {
  setLockedSwatches: (swatch: number[][] | null[] | string[]) => void;
  result: number[] | (string | null | never);
  lockedSwatches: number[][] | string[] | null[];
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
