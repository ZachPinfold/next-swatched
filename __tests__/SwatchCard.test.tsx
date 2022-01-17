import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomepageSwatchCard from "../components/swatch picker/swatch card/HomepageSwatchCard";
import { Provider } from "react-redux";
import CopyImage from "../../assets/images/copy_swatch.svg";

import createMockStore from "redux-mock-store";
import { CardHover } from "../types/swatches";

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

test("Check for Getting Started Text", () => {
  const cards: any = render(TestComponent).container.firstChild;
  const { className } = cards;
  expect(className).toEqual("colour_card");
  expect(cards).toHaveLength(2);
});
