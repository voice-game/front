import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";
import useErrorMessage from "../../hooks/useErrorMessage";
import { playerLogin } from "../../actions/actionCreators";

const LoginContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.div`
  font-size: 4rem;
  margin-bottom: 5vh;
`;

const Login = ({ authService }) => {
  const dispatch = useDispatch();
  const [error, showErrorMessage] = useErrorMessage("");

  const onLogin = useCallback(
    async (event) => {
      try {
        const loginData = await authService.login(event.target.name);
        const { email, uid, displayName } = loginData.user;
        dispatch(playerLogin({ email, uid, displayName }));
      } catch (err) {
        showErrorMessage("로그인에 실패하였습니다.");
      }
    },
    [authService, dispatch, showErrorMessage]
  );

  return (
    <LoginContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle>VOICE GAME</MainTitle>
      <Button
        name="Google"
        onClick={onLogin}
        margin={["5vh", "0", "0", "0"]}
      >
        Google Login
      </Button>
    </LoginContainer>
  );
};

export default Login;
