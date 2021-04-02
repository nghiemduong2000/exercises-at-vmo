import { call, put, takeEvery } from '@redux-saga/core/effects';
import {
  ADD_POST,
  ADD_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
} from 'actions/type';
import {
  addPostApi,
  deletePostApi,
  getPostsApi,
  updatePostApi,
} from 'apis/postApi';

function* getPostsSaga() {
  try {
    const res = yield call(getPostsApi);
    const { data } = res;
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* addPostSaga(action) {
  try {
    const { data } = action;
    const res = yield call(addPostApi, data);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* updatePostSaga(action) {
  try {
    const { dataUpdate, postId } = action.data;
    const res = yield call(updatePostApi, postId, dataUpdate);
    yield put({
      type: UPDATE_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* deletePostSaga(action) {
  try {
    const { id } = action;
    yield call(deletePostApi, id);
    yield put({
      type: DELETE_POST_SUCCESS,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchPostSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(ADD_POST, addPostSaga);
  yield takeEvery(UPDATE_POST, updatePostSaga);
  yield takeEvery(DELETE_POST, deletePostSaga);
}
