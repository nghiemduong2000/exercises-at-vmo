import { GET_TODOS, UPDATE_TODOS } from '../actions/type.js';

const initialState = {
  todos: [],
  loading: true,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case UPDATE_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
