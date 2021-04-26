import React from "react";
import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  position: absolute;
  padding: 20px 30px;
  top: 5px;
  left: 50vw;
  background-color: #ffebee;
  text-align: center;
  color: #d50000;
  font-size: 1.3rem;
  font-weight: 500;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const ErrorMessageText = styled.div`
  color: #e74c3c;
`;

const ErrorMessage = ({ error }) => {
  return (
    <ErrorMessageContainer>
      <ErrorMessageText>
        {error.length > 0 ? error : "무엇인가 잘못되었습니다."}
      </ErrorMessageText>
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
