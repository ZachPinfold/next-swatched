import { NextRouter, useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearErrors, startLogin } from "../../../actions/auth";
import { startShowModal } from "../../../actions/layout";

interface Actions {
  startLogin: (
    email: string,
    password: string,
    func: null,
    router: NextRouter
  ) => void;
  error: string;
  startShowModal: (openModal: boolean, type: string) => void;
  clearErrors: () => void;
}

interface InputDetails {
  email: string;
  password: string;
}

const Login = ({ startLogin, error, startShowModal, clearErrors }: Actions) => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    return () => clearErrors();
  }, []);

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
    startLogin(loginDetails.email, loginDetails.password, null, router);
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
        {error.length > 0 && <p className="error">{error}</p>}
        <input className="button_main" type="submit" />
      </form>
      <p>
        don't have an account?{" "}
        <span onClick={() => startShowModal(true, "signup")}>signup</span>{" "}
      </p>
    </div>
  );
};

interface StateProps {
  username: string;
  error: string;
}

const mapStateToProps = (state: any): StateProps => ({
  username: state.auth.username,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  startLogin,
  startShowModal,
  clearErrors,
})(Login);
