import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useErrorMessage from "../../hooks/useErrorMessage";
import { playerLogout } from "../../actions/actionCreators";

const LogoutContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoutMessage = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  margin-left: 1vw;
  margin-top: 5vh;
  background-color: #eb4d4b;
`;

const CancelButton = styled.button`
  margin-left: 1vw;
  margin-top: 2vh;
`;

const Logout = ({ authService }) => {
  const [error, showErrorMessage] = useErrorMessage("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (event) => {
    try {
      await authService.logout();
      dispatch(playerLogout());
      history.push("/");
    } catch {
      showErrorMessage("로그아웃에 실패하였습니다.");
    }
  };

  return (
    <LogoutContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <LogoutMessage>로그아웃 하시겠습니까?</LogoutMessage>
      <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
      <CancelButton
        onClick={() => {
          history.push("/games");
        }}
      >
        Back to game
      </CancelButton>
    </LogoutContainer>
  );
};

export default Logout;
