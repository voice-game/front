import getActionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  playerData: null,
};

const authReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();

  switch (action.type) {
    case ACTION_TYPES.CHECK_AUTHORIZATION:
      return {
        ...state,
        isLoggedIn: false,
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        playerData: action.payload,
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };

    case ACTION_TYPES.PLAYER_LOGIN:
      return {
        ...state,
        isLoggedIn: false,
      };

    case ACTION_TYPES.PLAYER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        playerData: action.payload,
      };

    case ACTION_TYPES.PLAYER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
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
