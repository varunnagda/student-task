import { resultsType } from "../types/result.type";

const initialState = {
  loading: false,
  results: [],
};

export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case resultsType.CALL_HISTORY_REQUEST:
      return { ...initialState, loading: true };
    case resultsType.CALL_HISTORY_REQUEST_SUCCESS:
      return {
        ...initialState,
        results: action.results,
      };
    case resultsType.CALL_HISTORY_REQUEST_FAILURE:
      return { ...initialState, error: action.error };
    default:
      return state;
  }
};
