import { saveResultType } from "../types";
export const saveResultActions = {
  saveResultRequest,
  saveResultRequestSuccess,
  saveResultRequestFailure,
  saveResultRequestReset,
};

function saveResultRequest(request, token) {
  return {
    type: saveResultType.CALL_HISTORY_SAVE_REQUEST,
    request,
    token,
  };
}
function saveResultRequestReset() {
  return {
    type: saveResultType.CALL_HISTORY_SAVE_REQUEST_RESET,
  };
}
function saveResultRequestSuccess(message) {
  return {
    type: saveResultType.CALL_HISTORY_SAVE_REQUEST_SUCCESS,
    message,
  };
}
function saveResultRequestFailure(error) {
  return { type: saveResultType.CALL_HISTORY_SAVE_REQUEST_FAILURE, error };
}
