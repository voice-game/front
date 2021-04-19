import getActionTypes from "./actionTypes.js";
import { USER_SERVER } from "../constants/constants";
import Cookies from "universal-cookie";

export const checkAuthorization = () => async (dispatch) => {
  dispatch({ type: getActionTypes().CHECK_AUTHORIZATION });

  try {
    const cookies = new Cookies();
    const token = cookies.get("jwt");

    const response = await fetch(`${USER_SERVER}/check_auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (result.message === "Authorization Success") {
      dispatch({
        type: getActionTypes().CHECK_AUTHORIZATION_SUCCESS,
        payload: result.data,
      });
    } else {
      dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL });
    }
  } catch (err) {
    dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL });
  }
};

export const playerLogin = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().PLAYER_LOGIN });

  try {
    const response = await fetch(`${USER_SERVER}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const cookies = new Cookies();

    cookies.set("jwt", result.token);

    dispatch({
      type: getActionTypes().PLAYER_LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    dispatch({ type: getActionTypes().PLAYER_LOGIN_FAIL });
  }
};

export const playerLogout = () => {
  const cookies = new Cookies();

  cookies.remove("jwt");

  return {
    type: getActionTypes().PLAYER_LOGOUT,
  };
};

export const fetchRoomsDB = (gameTitle) => async (dispatch) => {
  dispatch({ type: getActionTypes().FETCH_ROOMS });

  try {
    const response = await fetch(`${USER_SERVER}/games/${gameTitle}`);
    const result = await response.json();

    dispatch({
      type: getActionTypes().FETCH_ROOMS_SUCCESS,
      payload: {
        gameTitle,
        rooms: result.data,
      },
    });
  } catch (e) {
    dispatch({ type: getActionTypes().FETCH_ROOMS_FAIL });
  }
};

export const createRoomDB = (gameTitle, newRoomId, createdBy) => async (
  dispatch
) => {
  dispatch({ type: getActionTypes().CREATE_ROOM });

  try {
    const response = await fetch(`${USER_SERVER}/games/${gameTitle}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameTitle, newRoomId, createdBy }),
    });

    const result = await response.json();

    dispatch({
      type: getActionTypes().CREATE_ROOM_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    dispatch({ type: getActionTypes().CREATE_ROOM_FAIL });
  }
};
