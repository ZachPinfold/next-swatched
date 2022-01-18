import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Menu from "../../assets/images/Menu";
import Logo from "../../assets/images/swatched-logotype.svg";
import { SwatchObject } from "../../types/swatches";
import Dropdown from "../utils/Dropdown";
import MenuDropdown from "./MenuDropdown";
import Link from "next/link";
import { startIsCompact } from "../../actions/layout";

interface Actions {
  swatches: any;
  startIsCompact: (scrollY: number) => void;
}

const NavBar = ({ swatches, startIsCompact }: Actions) => {
  const wrapperRef = useRef<HTMLHeadingElement>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showText, setShowText] = useState(false);
  const [compact, setCompact] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    if (isClickedOutside) {
      setDropdownOpen(false);
      setIsClickedOutside(false);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    setTimeout(() => {
      !compact && setShowText(true);
    }, 200);
    compact && setShowText(false);
  }, [compact]);

  const trackScroll = () => {
    if (typeof window === "undefined") {
      return;
    } else {
      setCompact(window.scrollY >= 75);
      if (ref.current !== window.scrollY >= 75) startIsCompact(window.scrollY);
      ref.current = window.scrollY >= 75;
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", trackScroll);

    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <nav style={{ height: compact ? "55px" : "85px" }} className="wrapper">
      <div className="wrapper_inner inner_nav">
        <div className="left_area">
          <Link href="/">
            <a>
              <img
                style={{ width: compact ? "170px" : "180px" }}
                src={Logo.src}
                alt=""
              />
            </a>
            {/* <h1 style={{ fontSize: compact ? "30px" : "40px" }}>Swatched</h1> */}
          </Link>

          <p>
            Use <strong> deep learning</strong> to find and save colours to your
            swatch, powered by the <span>ColormindAPI</span>{" "}
          </p>
        </div>

        {swatches.length > 0 && (
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            className="menu_wrapper"
          >
            <Menu initialSwatches={swatches} hover={hover} />
            <div
              ref={isDropdownOpen ? wrapperRef : null}
              id="dropdown_comp"
              className="menu_overlay"
            ></div>
          </div>
        )}
        <Dropdown
          Component={
            <MenuDropdown
              isDropdownOpen={isDropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
          }
          setIsClickedOutside={setIsClickedOutside}
          wrapperRef={wrapperRef}
          refId="dropdown_comp"
          isDropdownOpen={isDropdownOpen}
        />
      </div>
    </nav>
  );
};

interface StateProps {
  swatches: SwatchObject[];
}

const mapStateToProps = (state: any): StateProps => ({
  swatches: state.swatches.swatches,
});

export default connect(mapStateToProps, { startIsCompact })(NavBar);
