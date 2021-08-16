import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../components/auth/Login/Login";

// const setup = () => {
//   const utils = render(<Login />);
//   const input = utils.getByLabelText("email-input");
//   return {
//     input,
//     ...utils,
//   };
// };

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Login />);

  //   const input = setup();
  //   expect(input).toBeInTheDocument();
});
