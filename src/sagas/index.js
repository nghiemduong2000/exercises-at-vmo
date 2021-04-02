import { all } from 'redux-saga/effects';
import watchPostSaga from './watchPostSaga';
import watchQuoteSaga from './watchQuoteSaga';
import watchTodoSaga from './watchTodoSaga';

function* rootSaga() {
  yield all([watchPostSaga(), watchQuoteSaga(), watchTodoSaga()]);
}

export default rootSaga;
