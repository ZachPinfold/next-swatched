import React, { useEffect, useRef } from "react";

const Dropdown = ({ Component, setIsClickedOutside, wrapperRef }: any) => {
  // const wrapperRef = useRef<HTMLHeadingElement>(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref && ref.current && !ref.current.contains(event.target)) {
          setIsClickedOutside(true);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className="dropdown_component">
      {Component}
    </div>
  );
};

export default Dropdown;
