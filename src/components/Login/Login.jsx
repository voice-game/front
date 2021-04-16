import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { playerLogin } from "../../actions/actionCreators";
import useErrorMessage from "../../hooks/useErrorMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const LoginContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  padding: 10px;
  width: 180px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  margin-top: 1vh;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;

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
    <LoginContainer>
      {error.length > 0 && <ErrorMessage />}
      <h1>Log In</h1>
      <LoginButton name="Google" onClick={onLogIn}>
        구글 로그인
      </LoginButton>
      <LoginButton name="Github" onClick={onLogIn}>
        깃허브 로그인
      </LoginButton>
      <LoginButton name="Facebook" onClick={onLogIn}>
        페이스북 로그인
      </LoginButton>
    </LoginContainer>
  );
};

export default LogIn;
