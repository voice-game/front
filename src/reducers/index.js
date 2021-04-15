import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import ACTION_TYPES from "../actions/actionTypes";
import { combineReducers } from "redux";

const initialState = {};

const reducer = combineReducers({
  index: (state = initialState, action) => {
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
  },
  authReducer,
  gameReducer,
});

export default reducer;
