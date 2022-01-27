import React, { useEffect, useRef } from "react";
import { calculateDimensionsOnWindowChange } from "../../utils/swatch";

const Responsive = (startIsResponsive: (isLarge: boolean) => void) => {
  const widthRef = useRef<string | null>(null);

  const setRef = (size: string) => {
    widthRef.current = size;
  };

  const widthChange = () => {
    calculateDimensionsOnWindowChange(
      widthRef.current,
      startIsResponsive,
      setRef
    );
  };

  useEffect(() => {
    window.addEventListener("resize", widthChange, true);
    calculateDimensionsOnWindowChange(
      widthRef.current,
      startIsResponsive,
      setRef
    );
  }, [calculateDimensionsOnWindowChange]);
};

export default Responsive;
