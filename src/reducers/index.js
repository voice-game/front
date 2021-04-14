import ACTION_TYPES from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ACTION_NAME:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
