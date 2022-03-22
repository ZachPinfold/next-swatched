import React, { FC, Fragment, useEffect } from "react";
import Tutorial2 from "../../../assets/images/tutorial/tutorial_1.gif";
import Tutorial1 from "../../../assets/images/tutorial/add_tut.gif";
import LockedImage from "../../../assets/images/LockedSwatch";
import CopySwatch from "../../../assets/images/CopySwatch";
import DeleteSwatch from "../../../assets/images/DeleteSwatch";
import { Carousel } from "react-responsive-carousel";
import { TutTypes } from "../../../types/swatches";
import HashTagImage from "../../../assets/images/HashTag";
import UploadImage from "../../../assets/images/UploadImage";
import RGBImage from "../../../assets/images/RGBImage";

const tutorialArray: TutTypes[][] = [];

const tutorial1ObjectArray: TutTypes[] = [
  { img: RGBImage, text: "Add RGB colour" },
  { img: UploadImage, text: "Pull colour from image" },
  { img: HashTagImage, text: "Add hex colour" },
];

const tutorial2ObjectArray: TutTypes[] = [
  { img: DeleteSwatch, text: "delete a swatch" },
  { img: LockedImage, text: "compare a colour" },
  { img: CopySwatch, text: "copy the hex" },
];

tutorialArray.push(tutorial1ObjectArray);
tutorialArray.push(tutorial2ObjectArray);

const Tutorial = ({
  isDropdownOpen,
  refId,
  largeWindowSize,
}: {
  isDropdownOpen: boolean;
  refId: string;
  largeWindowSize: boolean;
}) => {
  const iconColor: string = "#4eadab";

  useEffect(() => {
    // We need to add the ID into the elements within the dropdown to prevent
    // an 'outside of the box' trogger event

    const slide: NodeListOf<Element> = document.querySelectorAll(".slide");

    slide &&
      slide.forEach((element) => {
        element.id = refId;
      });

    const dotsArea: HTMLCollectionOf<Element> =
      document.getElementsByClassName("control-dots");

    dotsArea && (dotsArea[0].id = refId);

    const dots: NodeListOf<Element> = document.querySelectorAll(".dot");

    dots &&
      dots.forEach((dot) => {
        dot.id = refId;
      });
  }, []);

  return (
    <div className={"tutorial_box " + (isDropdownOpen && "open_list")}>
      <Carousel showThumbs={false}>
        {tutorialArray.map((tutorialArray, i) => {
          return (
            <Fragment key={i}>
              {i === 0 ? (
                <h4>
                  {largeWindowSize ? "Hover over" : "press"} the plus to add new
                  colours to your swatch
                </h4>
              ) : (
                <h4>
                  {largeWindowSize ? "Hover over" : "press"} the middle of a
                  colour to see the options
                </h4>
              )}
              <div className="inner_tutorial">
                <div id={refId} className="overlay"></div>

                <div className="icons">
                  {tutorialArray.map((tut, i) => {
                    return (
                      <div key={tut.text} className="inner_icon">
                        {<tut.img color={iconColor} />}
                        <p>{tut.text}</p>
                      </div>
                    );
                  })}
                </div>
                <img src={i === 0 ? Tutorial1.src : Tutorial2.src} alt="" />
              </div>
            </Fragment>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Tutorial;
