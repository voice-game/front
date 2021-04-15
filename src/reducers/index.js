import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  authReducer,
  gameReducer,
});

export default reducer;
