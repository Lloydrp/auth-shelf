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

function* addToShelf(action) {
  try {
    console.log('in addToShelf:');
    yield axios.post('/api/shelf/', action.payload);
    yield put({ type: 'SET_SHELF_LIST'});
  } catch (err) {
    console.log('Error in adding new item: ', err);
  }
}

function* deleteItem(action) {
  try {
    yield console.log('in Delete Item');
    yield console.log(action.payload);
    yield axios.delete(`/api/shelf/${action.payload.id}`);
    yield put({type: 'SET_SHELF_LIST'});
  } catch(err) {
    console.log('Error in delete saga', err);
    // if(err.status === 401) {
    //   yield alert('You are unauthorized :(');
    // }
  }
}

function* fetchShelf() {
  yield takeLatest("SET_SHELF_LIST", setShelfList);
  yield takeLatest('ADD_TO_SHELF', addToShelf);
  yield takeLatest('DELETE_ITEM', deleteItem);
}

export default fetchShelf;
