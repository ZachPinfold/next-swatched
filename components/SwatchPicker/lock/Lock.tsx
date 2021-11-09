import React from "react";

interface Actions {
  setLockedSwatch: (swatch: number[] | null | string) => void;
  result: number[] | string;
  lockedSwatch: number[] | string | null;
}

const Lock = ({ setLockedSwatch, result, lockedSwatch }: Actions) => {
  return (
    <div
      onClick={() =>
        lockedSwatch !== result
          ? setLockedSwatch(result)
          : setLockedSwatch(null)
      }
      className='outer_lock'
    >
      <div className={"lock " + (lockedSwatch !== result && "unlocked")}></div>
    </div>
  );
};

export default Lock;
