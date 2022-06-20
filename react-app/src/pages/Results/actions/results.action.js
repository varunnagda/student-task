import { resultsType } from "../types/result.type";
export const resultsActions = {
  resultsRequest,
  resultsRequestSuccess,
  resultsRequestFailure,
};

function resultsRequest(request, token) {
  return { type: resultsType.CALL_HISTORY_REQUEST, request, token };
}
function resultsRequestSuccess(results) {
  return {
    type: resultsType.CALL_HISTORY_REQUEST_SUCCESS,
    results,
  };
}
function resultsRequestFailure(error) {
  return { type: resultsType.CALL_HISTORY_REQUEST_FAILURE, error };
}
