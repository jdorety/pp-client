import {
  TODO_LOAD,
  TODO_UPDATE,
  TODO_FAILURE,
  TOGGLE_START,
  TOGGLE_SUCCESS,
  TOGGLE_FAILURE
} from "../util/actionVars";

export default function TodoReducer(state, action) {
  switch (action.type) {
    case TODO_LOAD:
      return { ...state, loading: true, error: "" };
    case TODO_UPDATE:
      return { ...state, todos: [...action.list], loading: false };
    case TODO_FAILURE:
      return { ...state, loading: false, error: action.error };
    case TOGGLE_START:
      const copyList = [...state.todos];
      copyList[action.index] = action.item;
      return { ...state, todos: copyList, updating: true, error: "" };
    case TOGGLE_SUCCESS:
      return { ...state, updating: false, error: "" };
    case TOGGLE_FAILURE:
      return { ...state, updating: false, error: action.error };
    default:
      return state;
  }
}
