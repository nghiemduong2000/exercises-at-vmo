import { put, takeEvery } from '@redux-saga/core/effects';
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  UPDATE_TODOS,
  UPDATE_TODOS_SUCCESS,
} from 'actions/type';

function* getTodosSaga() {
  yield put({
    type: GET_TODOS_SUCCESS,
    payload: JSON.parse(localStorage.getItem('dataTodos')),
  });
}

function* updateTodosSaga(action) {
  const { data } = action;
  localStorage.setItem('dataTodos', JSON.stringify(data));
  yield put({
    type: UPDATE_TODOS_SUCCESS,
    payload: data,
  });
}

export default function* watchTodoSaga() {
  yield takeEvery(GET_TODOS, getTodosSaga);
  yield takeEvery(UPDATE_TODOS, updateTodosSaga);
}
