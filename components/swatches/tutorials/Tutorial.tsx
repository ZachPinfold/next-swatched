import React, { FC } from "react";
import Tutorial1 from "../../../assets/images/tutorial/tutorial_1.gif";
import LockedImage from "../../../assets/images/LockedSwatch";
import CopySwatch from "../../../assets/images/CopySwatch";
import DeleteSwatch from "../../../assets/images/DeleteSwatch";

interface ComponentProps {
  color: string;
}

interface TutTypes {
  img: FC<ComponentProps>;
  text: string;
}

const tutorialObject: TutTypes[] = [
  { img: DeleteSwatch, text: "delete a swatch" },
  { img: LockedImage, text: "compare a colour" },
  { img: CopySwatch, text: "copy the hex" },
];

const Tutorial = () => {
  const iconColor: string = "#ff6459";

  return (
    <div className="tutorial_box">
      <h4>Hover over a colour swatch to see the options</h4>
      <div className="inner_tutorial">
        <div className="icons">
          {tutorialObject.map((tut) => {
            return (
              <div key={tut.text} className="inner_icon">
                {<tut.img color={iconColor} />}
                <p>{tut.text}</p>
              </div>
            );
          })}

          {/* <LockedImage color={iconColor} />
            <CopySwatch color={iconColor} /> */}
        </div>
        <img src={Tutorial1.src} alt="" />
      </div>
    </div>
  );
};

export default Tutorial;
