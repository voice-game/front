import React from "react";
import styled from "styled-components";
import Button from "../shared/Button/Button";
import { ROOM_STATUS } from "../../constants/constants";

const Counter = styled.h1`
  color: #f9ca24;
`;

const EnergyBattleController = ({ counter, roomStatus, onClick }) => {
  return (
    <>
      {counter.length > 0 && <Counter>{counter}</Counter>}
      {counter.length === 0 && roomStatus === ROOM_STATUS.WAITING && (
        <Button onClick={onClick}>{ROOM_STATUS.WAITING}</Button>
      )}
      {counter.length === 0 && roomStatus === ROOM_STATUS.READY && (
        <Button onClick={onClick}>{ROOM_STATUS.READY}</Button>
      )}
    </>
  );
};

export default EnergyBattleController;
