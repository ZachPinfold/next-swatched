// import { shallow } from "enzyme";
// import React from "react";

// import App from "../pages/index";

// describe("With Enzyme", () => {
//   it('App shows "A simple example repo" in a <p> tag', () => {
//     const app = shallow(<App />);
//     expect(app.find("p").text()).toEqual("A simple example repo");
//   });
// });

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SwatchPicker from "../components/swatch picker/SwatchPicker";
import { Provider } from "react-redux";

import createMockStore from "redux-mock-store";

const swatches = [
  [2, 3, 4],
  [2, 3, 4],
  [2, 3, 4],
  [2, 3, 4],
  [2, 3, 4],
];

const lockedSwatches = [];

const store = createMockStore();

const TestComponent = (
  <Provider store={store()}>
    <SwatchPicker swatches={swatches} lockedSwatches={lockedSwatches} />
  </Provider>
);

test("Check for Getting Started Text", () => {
  const { container } = render(TestComponent);
  // let link = screen.getAllByText("lock color")[0];
  // console.log(container.length);
  // console.log(container.firstChild);
  // expect(getByText("lock color")).toBeInTheDocument();
});
