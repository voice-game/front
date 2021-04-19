import getActionTypes from "../actions/actionTypes";

const initialState = {
  fighterAttack: [],
  energyBattle: [],
};

const gameReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();

  switch (action.type) {
    case ACTION_TYPES.FETCH_ROOMS:
      return {
        ...state,
      };

    case ACTION_TYPES.FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        [action.payload.gameTitle]: action.payload.rooms,
      };

    case ACTION_TYPES.FETCH_ROOMS_FAIL:
      return {
        ...state,
      };

    case ACTION_TYPES.CREATE_ROOM:
      return {
        ...state,
      };

    case ACTION_TYPES.CREATE_ROOM_SUCCESS:
      return {
        ...state,
        [action.payload.title]: [
          ...state[action.payload.title],
          action.payload,
        ],
      };

    case ACTION_TYPES.CREATE_ROOM_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default gameReducer;
