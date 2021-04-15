import ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  isLoggedIn: true,
  playerData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.PLAYER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        playerData: action.payload,
      };

    case ACTION_TYPES.PLAYER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        playerData: null,
      };

    default:
      return state;
  }
};

export default authReducer;
