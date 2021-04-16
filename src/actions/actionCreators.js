import getActionTypes from "./actionTypes.js";

export const playerLogin = (playerData) => ({
  type: getActionTypes().PLAYER_LOGIN,
  payload: playerData,
});

export const playerLogout = () => {
  return {
    type: getActionTypes().PLAYER_LOGOUT,
  };
};
