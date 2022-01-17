import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SwatchPicker from "../components/swatch picker/SwatchPicker";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<SwatchPicker />);
  expect(getByText("Privacy")).toBeInTheDocument();
});
