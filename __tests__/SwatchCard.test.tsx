import { shallow, mount } from "enzyme";
import React from "react";
import CopyImage from "../../assets/images/copy_swatch.svg";
import HomepageSwatchCard from "../components/swatch picker/swatch card/HomepageSwatchCard";
import createMockStore from "redux-mock-store";
import { CardHover } from "../types/swatches";
import { Provider } from "react-redux";

const swatch = [2, 3, 4];

const lockedSwatches: [] = [];

const setState = jest.fn();

const useStateMock: any = (initState: any) => [initState, setState];

const store = createMockStore();

const funcMock: any = (swatch: any) => {};

const cardHover: CardHover[] = [
  {
    type: "copy",
    image: CopyImage,
    message: "copy hex",
    clickedMessage: "hex copied!",
    func: funcMock,
  },
  {
    type: "copy",
    image: CopyImage,
    message: "save to swatch",
    clickedMessage: "hex copied!",
    func: funcMock,
  },
  {
    type: "copy",
    image: CopyImage,
    message: "lock color",
    clickedMessage: "hex copied!",
    func: funcMock,
  },
];

const TestComponent = (
  <Provider store={store()}>
    <HomepageSwatchCard
      swatch={swatch}
      index={1}
      setHoverSwatch={useStateMock}
      hoverSwatch={swatch}
      lockedSwatches={lockedSwatches}
      largeWindowSize={true}
      setClicked={useStateMock}
      clicked={false}
      cardHover={cardHover}
      initialLoadRef={true}
    />
  </Provider>
);

describe("With Enzyme", () => {
  it("The homepage renders out the appropriate text within the swatch cards", () => {
    const app = shallow(TestComponent).dive().dive();

    expect(app.find("h5").first().text()).toEqual(cardHover[0].message);
    expect(app.find("h5").at(1).text()).toEqual(cardHover[1].message);
    expect(app.find("h5").at(2).text()).toEqual(cardHover[2].message);
  });
  it("The homepage card renders out with approrpriate background colour", () => {
    const app = shallow(TestComponent).dive().dive();

    let containerStyle = app.find(".colour_card").get(0).props.style;

    expect(
      app.find(".colour_card").get(0).props.style.backgroundColor
    ).toContain("rgb(2,3,4)");
  });
});
