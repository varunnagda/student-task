import { put, takeLatest, call } from "@redux-saga/core/effects";
import { ResultsaveActions } from "../actions";
import { ResultsaveType } from "../types";
import { endpoint } from "../../../../../api/Url";
import { Api } from "../../../../../api";
import { loginActions } from "../../../../Login/actions/login.action";

export function* watchResultsave() {
  yield takeLatest(ResultsaveType.CALL_HISTORY_SAVE_REQUEST, saveCallHistory);
}

function* saveCallHistory(action) {
  try {
    //   api call
    const message = yield call(Api, {
      endpoint: endpoint.saveCallHistory,
      method: "POST",
      jwt: "Bearer " + action.token,
      body: action.request,
    });
    const parsedMessage = JSON.parse(message);

    // yield put(
    //   ResultsaveActions.ResultsaveRequestSuccess(parsedMessage[0])
    // );
  } catch (error) {
    // if (error.code === 401 || error.code === 403)
    //   yield put(loginActions.logoutRequest());
    // yield put(ResultsaveActions.ResultsaveRequestFailure(error));
  }
}
