import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "../components/footer/Footer.tsx";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Footer />);
  expect(getByText("Privacy")).toBeInTheDocument();
});
