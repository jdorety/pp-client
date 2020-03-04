import {
  PARTY_FAILURE,
  PARTY_LOADING,
  PARTY_SUCCESS,
} from "../util/actionVars";

export default function PartyReducer(state, action) {
  switch (action.type) {
    case PARTY_LOADING:
      return { ...state, loading: true };
    case PARTY_SUCCESS:
      return { ...state, ...action.party, loading: false };
    case PARTY_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
