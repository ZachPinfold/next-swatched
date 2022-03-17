import React, { useEffect, useRef } from "react";

const Dropdown = ({
  Component,
  setIsClickedOutside,
  refId,
  isDropdownOpen,
}: any) => {
  const wrapperRef = useRef<HTMLHeadingElement>(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        console.log(ref.current.id !== event.target.id);

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
    <div
      ref={wrapperRef}
      id={refId}
      className={"dropdown_component " + (isDropdownOpen && "open_list")}
      // className="dropdown_component"
    >
      {Component}
    </div>
  );
};

export default Dropdown;
