import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  isAuthorized: false,
  playerData: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.CHECK_AUTHORIZATION:
    case ACTION_TYPES.PLAYER_LOGIN:
      return {
        ...state,
        isAuthorized: false,
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS:
    case ACTION_TYPES.PLAYER_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        playerData: action.payload,
      };

    case ACTION_TYPES.CHECK_AUTHORIZATION_FAIL:
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
