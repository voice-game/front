import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";
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
  font-size: 3rem;
  font-weight: 600;
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
      <LogoutMessage>Are You Leaving?</LogoutMessage>
      <Button
        onClick={onLogout}
        margin={["5vh", "0vw", "0vh", "1vw"]}
        bgColor={"#eb4d4b"}
        fontWeight={"600"}
      >
        Log Out
      </Button>
      <Button
        onClick={() => history.push("/games")}
        margin={["1vh", "0vw", "0vh", "1vw"]}
        fontWeight={"600"}
      >
        Back to game
      </Button>
    </LogoutContainer>
  );
};

export default Logout;
