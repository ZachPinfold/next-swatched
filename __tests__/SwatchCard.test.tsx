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

const lockedSwatches: [] = [];

const setState = jest.fn();

const useStateMock: any = (initState: any) => [initState, setState];

const store = createMockStore();

const TestComponent = (
  <Provider store={store()}>
    <SwatchPicker
      swatches={swatches}
      lockedSwatches={lockedSwatches}
      setLockedSwatches={useStateMock}
      initialLoadRef={true}
    />
  </Provider>
);

test("Check for Getting Started Text", () => {
  // const { container } =
  const className: any = render(TestComponent).container.firstChild;
  console.log(className.className);

  // console.log(container.children.className);

  // let link = screen.getAllByText("lock color")[0];
  // console.log(container.length);
  // console.log(container.firstChild);
  // expect(getByText("lock color")).toBeInTheDocument();
});
