import { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { startSignup } from "../../../actions/auth";

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

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupDetails({
      ...signupDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    startSignup(signupDetails.email, signupDetails.password);
  };

  return (
    <div className="signup">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={onInputChange}
          value={signupDetails.email}
          type="text"
          placeholder="email"
          id="email"
        />
        <input
          onChange={onInputChange}
          value={signupDetails.password}
          type="password"
          placeholder="password"
          id="password"
        />
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
