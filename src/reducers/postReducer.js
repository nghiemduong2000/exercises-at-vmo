import {
  ADD_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  UPDATE_POST_SUCCESS,
} from '../actions/type';

const initialState = {
  posts: [],
  loading: true,
  errors: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST_SUCCESS:
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
