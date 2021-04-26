import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../shared/Button/Button";

const ModalContainer = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ManualImage = styled.img`
  display: block;
  width: 60%;
  max-width: 1000px;
  min-width: 600px;
  margin: 0 auto;
  margin-top: 20vh;
`;

const CloseContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: -150px;
  justify-content: center;
`;

const GameManual = ({ imgSrc }) => {
  const [isShow, setIsShow] = useState(true);

  const closeModal = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsShow(false);
    }
  }, []);

  return (
    <ModalContainer onClick={closeModal} isShow={isShow}>
      <ManualImage src={imgSrc} alt="manual Img" />
      <CloseContainer>
        <Button
          margin={[0, "auto", 0, "auto"]}
          onClick={closeModal}
          bgColor="#dfe6e9"
        >
          Close
        </Button>
      </CloseContainer>
    </ModalContainer>
  );
};

export default GameManual;
