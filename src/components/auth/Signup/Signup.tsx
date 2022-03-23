import { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { startSignup } from "../../../actions/auth";
import { validateEmail } from "../../../utils/auth";

interface Actions {
  startSignup: (email: string, password: string) => void;
}

interface InputDetails {
  email: string;
  password: string;
}

const Signup = ({ startSignup }: Actions) => {
  const [signupDetails, setSignupDetails] = useState<InputDetails>({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupDetails({
      ...signupDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(signupDetails.email))
      setEmailError("Please enter a valid email");
    else if (signupDetails.password.length < 8)
      setPasswordError("please enter a password with at least 8 charactes");
    else startSignup(signupDetails.email, signupDetails.password);
  };

  return (
    <div className="signup">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={onInputChange}
          value={signupDetails.email}
          type="email"
          placeholder="email"
          id="email"
        />
        {emailError && <p className="error">{emailError}</p>}
        <input
          onChange={onInputChange}
          value={signupDetails.password}
          type="password"
          placeholder="password"
          id="password"
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <input className="button_main" type="submit" />
      </form>
    </div>
  );
};

interface StateProps {
  username: string;
}

const mapStateToProps = (state: any): StateProps => ({
  username: state.auth.username,
});

export default connect(mapStateToProps, { startSignup })(Signup);
