import React from "react";
import { useDispatch } from "react-redux";

import { playerLogin } from "../../actions/actionCreators";
import useErrorMessage from "../../hooks/useErrorMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const LogIn = ({ authService }) => {
  const [error, showErrorMessage] = useErrorMessage("");
  const dispatch = useDispatch();

  const onLogIn = async (event) => {
    try {
      const loginData = await authService.login(event.target.name);
      dispatch(playerLogin(loginData));
    } catch {
      showErrorMessage("Login Fail");
    }
  };

  return (
    <section>
      {error.length > 0 && <ErrorMessage />}
      <h1>Log In</h1>
      <button name="Google" onClick={onLogIn}>
        구글 로그인
      </button>
      <button name="Github" onClick={onLogIn}>
        깃허브 로그인
      </button>
      <button name="Facebook" onClick={onLogIn}>
        페이스북 로그인
      </button>
    </section>
  );
};

export default LogIn;
