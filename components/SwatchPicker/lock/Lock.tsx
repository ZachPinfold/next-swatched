import React from "react";

// Apply any to allow for includes() function

interface Actions {
  setLockedSwatches: (swatch: number[][]) => void;
  result: any;
  lockedSwatches: number[][];
  color: string;
}

const Lock = ({
  color,
  setLockedSwatches,
  result,
  lockedSwatches,
}: Actions) => {
  const removeFromSwatch = (result: number[]) => {
    setLockedSwatches(lockedSwatches.filter((r) => r !== result));
  };

  const someStyle: any = {
    "--colour": color,
    "--opacity": !lockedSwatches.includes(result) ? "30%" : "100%",
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
        style={someStyle}
        className={"lock " + (!lockedSwatches.includes(result) && "unlocked")}
      ></div>
    </div>
  );
};

export default Lock;
