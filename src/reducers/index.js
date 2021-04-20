import authReducer from "./authReducer";
import roomReducer from "./roomReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  authReducer,
  roomReducer,
});

export default reducer;
