import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  fighterAttack: [],
  energyBattle: [],
};

const roomReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.FETCH_ROOMS_SUCCESS:
      copiedState[action.payload.gameTitle] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.CREATE_ROOM_SUCCESS:
      copiedState[action.payload.title].push(action.payload);
      return copiedState;

    case ACTION_TYPES.JOIN_ROOM_SUCCESS:
      copiedState[action.payload.title] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.LEAVE_ROOM_SUCCESS:
      copiedState[action.payload.title] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.DELETE_ROOM_SUCCESS:
      copiedState[action.payload.title] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.CHANGE_ROOM_STATUS_SUCCESS:
      copiedState[action.payload.title] = action.payload.rooms;
      return copiedState;

    default:
      return state;
  }
};

export default roomReducer;