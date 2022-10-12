import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* setShelfList(action) {
  try {
    console.log("in the shelf saga");
    //get shelf from axios
    const shelf = yield axios.get("/api/shelf");

    //save shelf in reducer
    yield put({ type: "SET_SHELF", payload: shelf.data });
  } catch (error) {
    console.log("Error with shelf GET:", error);
  }
}

function* fetchShelf() {
  yield takeLatest("SET_SHELF_LIST", setShelfList);
}

export default fetchShelf;
