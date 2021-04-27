import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { playerMicOn } from "../actions/actionCreators";
import getMedia from "../utils/getMedia";
/**
 * function for confirm mic input
 *
 */
const useMicInput = (showErrorMessage) => {
  const dispatch = useDispatch();

  const confirmMicInput = useCallback(async () => {
    try {
      const mediaStream = await getMedia({ audio: true });

      mediaStream.getTracks()[0].stop();
      dispatch(playerMicOn());
    } catch (err) {
      showErrorMessage("마이크를 허용하고 새로고침 해주세요 🥲");
    }
  }, [dispatch, showErrorMessage]);

  useEffect(() => {
    confirmMicInput();
  }, [confirmMicInput]);
};

export default useMicInput;
