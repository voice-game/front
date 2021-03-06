const getActionTypes = () => ({
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  CHECK_AUTHORIZATION_SUCCESS: "CHECK_AUTHORIZATION_SUCCESS",
  CHECK_AUTHORIZATION_FAIL: "CHECK_AUTHORIZATION_FAIL",

  PLAYER_MIC_ON: "PLAYER_MIC_ON",

  PLAYER_LOGIN: "PLAYER_LOGIN",
  PLAYER_LOGIN_SUCCESS: "PLAYER_LOGIN_SUCCESS",
  PLAYER_LOGIN_FAIL: "PLAYER_LOGIN_FAIL",

  PLAYER_LOGOUT: "PLAYER_LOGOUT",
  PLAYER_LOGOUT_SUCCESS: "PLAYER_LOGOUT",
  PLAYER_LOGOUT_FAIL: "PLAYER_LOGOUT",

  UNAUTH_MODE: "UNAUTH_MODE",
  UNAUTH_MODE_SUCCESS: "UNAUTH_MODE_SUCCESS",
  UNAUTH_MODE_FAIL: "UNAUTH_MODE_FAIL",

  STOP_UNAUTH_MODE: "STOP_UNAUTH_MODE",

  FETCH_ROOMS: "FETCH_ROOMS",
  FETCH_ROOMS_SUCCESS: "FETCH_ROOMS_SUCCESS",
  FETCH_ROOMS_FAIL: "FETCH_ROOMS_FAIL",

  CREATE_ROOM: "CREATE_ROOM",
  CREATE_ROOM_SUCCESS: "CREATE_ROOM_SUCCESS",
  CREATE_ROOM_FAIL: "CREATE_ROOM_FAIL",

  JOIN_ROOM: "JOIN_ROOM",
  JOIN_ROOM_SUCCESS: "JOIN_ROOM_SUCCESS",
  JOIN_ROOM_FAIL: "JOIN_ROOM_FAIL",

  LEAVE_ROOM: "LEAVE_ROOM",
  LEAVE_ROOM_SUCCESS: "LEAVE_ROOM_SUCCESS",
  LEAVE_ROOM_FAIL: "LEAVE_ROOM_FAIL",

  DELETE_ROOM: "DELETE_ROOM",
  DELETE_ROOM_SUCCESS: "DELETE_ROOM_SUCCESS",
  DELETE_ROOM_FAIL: "DELETE_ROOM_FAIL",

  CHANGE_ROOM_STATUS: "CHANGE_ROOM_STATUS",
  CHANGE_ROOM_STATUS_SUCCESS: "CHANGE_ROOM_STATUS_SUCCESS",
  CHANGE_ROOM_STATUS_FAIL: "CHANGE_ROOM_STATUS_FAIL",

  PATCH_RESULT: "PATCH_RESULT",
  PATCH_RESULT_SUCCESS: "PATCH_RESULT_SUCCESS",
  PATCH_RESULT_FAIL: "PATCH_RESULT_FAIL",

  STORE_IMAGE: "STORE_IMAGE",
});

export default getActionTypes;
