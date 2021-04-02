import { GET_TODOS_SUCCESS, UPDATE_TODOS_SUCCESS } from '../actions/type.js';

const initialState = {
  todos: [],
  loading: true,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case UPDATE_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
