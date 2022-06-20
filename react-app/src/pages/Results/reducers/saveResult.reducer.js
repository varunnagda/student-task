import { resultSaveType } from "../types";

const initialState = {
  loading: false,
  message: "",
};

export const resultSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case resultSaveType.CALL_HISTORY_SAVE_REQUEST:
      return { ...initialState, loading: true };
    case resultSaveType.CALL_HISTORY_SAVE_REQUEST_SUCCESS:
      return { ...initialState, message: action.message };
    case resultSaveType.CALL_HISTORY_SAVE_REQUEST_FAILURE:
      return { ...initialState, error: action.error };
    case resultSaveType.CALL_HISTORY_SAVE_REQUEST_RESET:
      return initialState;
    default:
      return state;
  }
};
