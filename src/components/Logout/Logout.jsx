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
  padding: 10px 20px;
  margin-left: 1vw;
  margin-top: 5vh;
  background-color: #ec6998;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  margin-left: 1vw;
  margin-top: 2vh;
  background-color: #636e72;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
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
      <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
      <CancelButton
        onClick={() => {
          history.push("/games");
        }}
      >
        게임창으로 돌아가기
      </CancelButton>
    </LogoutContainer>
  );
};

export default Logout;
