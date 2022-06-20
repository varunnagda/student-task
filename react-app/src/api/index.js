import { call, put } from "redux-saga/effects";
import { loginActions } from "../pages/auth/Login/actions/login.action";
import { Url } from "./Url";

export function* Api({ endpoint, method, jwt = null, body = null }) {
  const res = yield call(makeRequest, {
    endpoint,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({ ...body }),
  });

  //   if (res.status === 401) {
  //     // Log the user out
  //     // Explain that they need to log back in
  //   }

  const parsedResponse = yield call(parseResponse, res);
  if (!res.ok) {
    // Handle bad response here
    if (res.status === 401) {
      // auto logout if 401 response returned from api
      // logout();
      // location.reload(true);
      //   throw { code: 401, message: "Unauthorized" };
      yield put(loginActions.logoutRequest());
      throw { code: 401, message: "Unauthorized" };
    } else if (res.status === 403) {
      //   throw { code: 403, message: "Something went wrong" };
      yield put(loginActions.logoutRequest());
      throw { code: 403, message: "Something went wrong" };
    }
    // const error =
    //   (parsedResponse && parsedResponse.error.message) || res.statusText;
    // throw { code: res.status, message: "Something went wrong" };
    yield put(loginActions.logoutRequest());
    throw { code: res.status, message: "Unauthorized" };
  } else {
    return parsedResponse;
  }
}

const makeRequest = async ({ endpoint, method, headers, body = null }) => {
  return fetch(Url.baseURL + endpoint, {
    //Url.baseURL+endpoint //old
    method,
    headers,
    body: body === "{}" ? undefined : body,
  });
};

const parseResponse = async (response) => {
  let parsedResponse;
  try {
    parsedResponse = await response.clone().json();
  } catch (error) {
    parsedResponse = await response.text();
  }
  return parsedResponse;
};
