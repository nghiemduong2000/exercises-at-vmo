import { ADD_POST, DELETE_POST, GET_POSTS, UPDATE_POST } from '../actions/type';

const initialState = {
  posts: [],
  loading: true,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST:
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, index),
          { ...action.payload },
          ...state.posts.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};

export default postReducer;
