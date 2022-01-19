import { shallow, mount } from "enzyme";
import React from "react";
import CopyImage from "../../assets/images/copy_swatch.svg";
import NavBar from "../components/nav/NavBar";
import createMockStore from "redux-mock-store";
import { CardHover, SwatchObject } from "../types/swatches";
import { Provider } from "react-redux";
import { rgbToHex } from "../utils/swatch";

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

for (let i = 0; i < 20; i++) {
  swatches.push(swatch);
}

const store = createMockStore();

const funcMock: any = (scrollY: number) => {};
const initialState = { swatches: { swatches: swatches } };
const st = store(initialState);

const TestComponent = (
  <Provider store={st}>
    <NavBar />
  </Provider>
);

describe("With Enzyme", () => {
  const app = mount(TestComponent);
  it("The nav renders out the logo", () => {
    expect(app.find(".nav_logo")).toBeDefined();
  });
  it("The nav renders out the tagline", () => {
    expect(app.find(".nav_text")).toBeDefined();
  });
  it("The nav renders out 3 items within the main dropdown menu", () => {
    expect(app.find(".menu_dropdown").children()).toHaveLength(3);
  });
  it("The menu renders with 9 circles, all with a colour fill from the swatch above", () => {
    expect(app.find(".menu_circle_svg").children()).toHaveLength(9);
    expect(app.find(".st0").first().props().fill).toContain(
      rgbToHex(swatch.color)
    );
  });
});
