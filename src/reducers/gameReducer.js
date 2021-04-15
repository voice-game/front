import ACTION_TYPES from "../actions/actionTypes";

export const initialState = {};

const gameReducer = (state = initialState, action) => {
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
