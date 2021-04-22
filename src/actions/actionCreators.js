import getActionTypes from "./actionTypes.js";
import { USER_SERVER_API } from "../constants/constants";
import Cookies from "universal-cookie";

export const checkAuthorization = () => async (dispatch) => {
  dispatch({ type: getActionTypes().CHECK_AUTHORIZATION });

  try {
    const cookies = new Cookies();
    const token = cookies.get("jwt");

    const response = await fetch(`${USER_SERVER_API}/check_auth`, {
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
    const response = await fetch(`${USER_SERVER_API}/login`, {
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

export const fetchRoomsAction = (gameTitle) => async (dispatch) => {
  dispatch({ type: getActionTypes().FETCH_ROOMS });

  try {
    const response = await fetch(`${USER_SERVER_API}/games/${gameTitle}`);
    const result = await response.json();
    console.log(result);

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

export const createRoomAction = (gameTitle, newRoomId, createdBy) => async (
  dispatch,
) => {
  dispatch({ type: getActionTypes().CREATE_ROOM });

  try {
    const response = await fetch(`${USER_SERVER_API}/games/${gameTitle}`, {
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

export const joinRoomAction = (gameTitle, roomId, playerData) => async (
  dispatch,
) => {
  dispatch({ type: getActionTypes().JOIN_ROOM });

  try {
    const response = await fetch(
      `${USER_SERVER_API}/games/${gameTitle}/${roomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameTitle, roomId, playerData, type: "JOIN" }),
      },
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().JOIN_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (e) {
    dispatch({ type: getActionTypes().JOIN_ROOM_FAIL });
  }
};

export const leaveRoomAction = (gameTitle, roomId, playerData) => async (
  dispatch,
) => {
  dispatch({ type: getActionTypes().LEAVE_ROOM });

  try {
    const response = await fetch(
      `${USER_SERVER_API}/games/${gameTitle}/${roomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameTitle, roomId, playerData, type: "LEAVE" }),
      },
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().LEAVE_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (e) {
    dispatch({ type: getActionTypes().LEAVE_ROOM_FAIL });
  }
};

export const deleteRoomAction = (gameTitle, roomId) => async (dispatch) => {
  dispatch({ type: getActionTypes().DELETE_ROOM });

  try {
    const response = await fetch(
      `${USER_SERVER_API}/games/${gameTitle}/${roomId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameTitle, roomId }),
      },
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().DELETE_ROOM_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (e) {
    dispatch({ type: getActionTypes().DELETE_ROOM_FAIL });
  }
};

export const changeRoomStatus = (gameTitle, roomId, status) => async (
  dispatch,
) => {
  dispatch({ type: getActionTypes().CHANGE_ROOM_STATUS });

  try {
    const response = await fetch(`${USER_SERVER_API}/games/${gameTitle}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameTitle, roomId, status }),
    });

    const result = await response.json();

    dispatch({
      type: getActionTypes().CHANGE_ROOM_STATUS_SUCCESS,
      payload: {
        title: gameTitle,
        rooms: result.data,
      },
    });
  } catch (err) {
    dispatch({ type: getActionTypes().CHANGE_ROOM_STATUS_FAIL });
  }
};
