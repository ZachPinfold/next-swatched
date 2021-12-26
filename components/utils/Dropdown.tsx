import React, { useEffect, useRef } from "react";

const Dropdown = ({ Component, setIsClickedOutside, wrapperRef }: any) => {
  // const wrapperRef = useRef<HTMLHeadingElement>(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        ref &&
          ref.current &&
          console.log("ref", ref.current.id, "event", event.target.id);
        if (ref && ref.current && ref.current.id !== event.target.id) {
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
    <div ref={wrapperRef} id="dropdown_comp" className="dropdown_component">
      {Component}
    </div>
  );
};

export default Dropdown;
