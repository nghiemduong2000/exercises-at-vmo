import { call, put, takeEvery } from '@redux-saga/core/effects';
import { GET_QUOTES, GET_QUOTES_SUCCESS } from 'actions/type';
import { getQuotesApi } from 'apis/quoteApi';

function* getQuotesSaga() {
  try {
    const res = yield call(getQuotesApi);
    const { quotes } = res.data;
    yield put({
      type: GET_QUOTES_SUCCESS,
      payload: quotes,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchQuoteSaga() {
  yield takeEvery(GET_QUOTES, getQuotesSaga);
}
