import getActionTypes from "../actions/actionTypes";

export const initialState = {};

const gameReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();

  switch (action.type) {
    case ACTION_TYPES.GAME1:
      return {
        ...state,
      };

    case ACTION_TYPES.GAME2:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default gameReducer;
