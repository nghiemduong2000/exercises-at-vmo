import { combineReducers } from 'redux';
import postReducer from './postReducer';
import quoteReducer from './quoteReducer';
import todoReducer from './todoReducer';

export default combineReducers({
  todo: todoReducer,
  quote: quoteReducer,
  post: postReducer,
});
