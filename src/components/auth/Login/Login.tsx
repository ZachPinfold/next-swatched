import { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { startLogin } from "../../../actions/auth";

interface Actions {
  startLogin: (email: string, password: string, func: null) => void;
}

interface InputDetails {
  email: string;
  password: string;
}

const Login = ({ startLogin }: Actions) => {
  const [loginDetails, setLoginDetails] = useState<InputDetails>({
    email: "",
    password: "",
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    startLogin(loginDetails.email, loginDetails.password, null);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onInputChange}
          value={loginDetails.email}
          type="text"
          placeholder="email"
          id="email"
          aria-label="email-input"
        />
        <input
          onChange={onInputChange}
          value={loginDetails.password}
          type="password"
          placeholder="password"
          id="password"
        />
        <input className="button_main" type="submit" />
      </form>
      <p>
        don't have an account? <span> Signup</span>
      </p>
    </div>
  );
};

interface StateProps {
  username: string;
}

const mapStateToProps = (state: any): StateProps => ({
  username: state.auth.username,
});

export default connect(mapStateToProps, { startLogin })(Login);
