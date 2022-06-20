import { put, takeLatest, call } from "@redux-saga/core/effects";
import { ResultsActions } from "../actions/Results.action";
import { ResultsType } from "../types/result.type";
import { endpoint } from "../../../../../api/Url";
import { Api } from "../../../../../api";
import { loginActions } from "../../../../Login/actions/login.action";

export function* watchResults() {
  yield takeLatest(ResultsType.CALL_HISTORY_REQUEST, getResults);
}

function* getResults(action) {
  try {
    //   api call
    const data = yield call(Api, {
      endpoint: `${endpoint.getResults}?AdmissionID=${action.request.patientAdmissionId}`,
      method: "POST",
      jwt: "Bearer " + action.token,
    });

    const parsedData = JSON.parse(data);
    // parsedData.ResultsDetailList!==undefined && parsedData.ResultsDetailList.length>0
    // ? yield put(ResultsActions.ResultsRequestSuccess(parsedData.ResultsDetailList))
    // :  yield put(
    //   ResultsActions.ResultsRequestFailure("No data found")
    //  );
  } catch (error) {
    // if (error.code === 401 || error.code === 403)
    //   yield put(loginActions.logoutRequest());
    // yield put(ResultsActions.ResultsRequestFailure(error));
  }
}
