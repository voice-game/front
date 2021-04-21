import getActionTypes from "../actions/actionTypes";

const initialState = {
  isAuthorized: false,
  playerData: null,
};

const authReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();

  switch (action.type) {
    case ACTION_TYPES.CHECK_AUTHORIZATION:
      return {
        ...state,
        isAuthorized: false,
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        playerData: action.payload,
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_FAIL:
      return {
        ...state,
        isAuthorized: false,
      };

    case ACTION_TYPES.PLAYER_LOGIN:
      return {
        ...state,
        isAuthorized: false,
      };

    case ACTION_TYPES.PLAYER_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        playerData: action.payload,
      };

    case ACTION_TYPES.PLAYER_LOGIN_FAIL:
      return {
        ...state,
        isAuthorized: false,
      };

    case ACTION_TYPES.PLAYER_LOGOUT:
      return {
        ...state,
        isAuthorized: false,
        playerData: null,
      };

    default:
      return state;
  }
};

export default authReducer;
