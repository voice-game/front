import ACTION_TYPES from "./actionTypes.js";

export const playerLogin = (playerData) => {
  return {
    type: ACTION_TYPES.PLAYER_LOGIN,
    payload: playerData,
  };
};

export const playerLogout = () => {
  return {
    type: ACTION_TYPES.PLAYER_LOGOUT,
  };
};
