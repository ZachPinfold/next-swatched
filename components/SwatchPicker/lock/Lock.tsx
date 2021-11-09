import React from "react";

interface Actions {
  setLockedSwatch: (swatch: string) => void;
  result: string;
  lockedSwatch: string | null;
}

const Lock = ({ setLockedSwatch, result, lockedSwatch }: Actions) => {
  return (
    <div onClick={() => setLockedSwatch(result)} className='outer_lock'>
      <div className={"lock " + (lockedSwatch === result && "unlocked")}></div>
    </div>
  );
};

export default Lock;
