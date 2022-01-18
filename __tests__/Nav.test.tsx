import { shallow, mount } from "enzyme";
import React from "react";
import CopyImage from "../../assets/images/copy_swatch.svg";
import NavBar from "../components/nav/NavBar";
import createMockStore from "redux-mock-store";
import { CardHover, SwatchObject } from "../types/swatches";
import { Provider } from "react-redux";

const swatches: SwatchObject[] = [
  {
    color: [193, 48, 47],
    colourId: "dfd7a880-d2d3-4af7-867c-839c5048757c",
    timeAdded: new Date(),
  },
];

const swatch: SwatchObject = {
  color: [193, 48, 47],
  colourId: "dfd7a880-d2d3-4af7-867c-839c5048757c",
  timeAdded: new Date(),
};

// for (let i = 0; i < 9; i++) {
//   swatches.push(swatch);
// }

const store = createMockStore();

const funcMock: any = (scrollY: number) => {};
const initialState = { swatches: { swatches: [] } };
const st = store(initialState);

console.log(st.getState());

const TestComponent = (
  <Provider store={st}>
    <NavBar swatches={[]} />
  </Provider>
);

describe("With Enzyme", () => {
  it("The homepage renders out the appropriate text within the swatch cards", () => {
    const app = mount(TestComponent);
    console.log(app.debug());
  });
});
