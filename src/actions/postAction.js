import { ADD_POST, DELETE_POST, GET_POSTS, UPDATE_POST } from './type';

export const getPostsData = () => ({
  type: GET_POSTS,
});

export const addPost = (data) => ({
  type: ADD_POST,
  data,
});

export const updatePost = ({ dataUpdate, postId }) => ({
  type: UPDATE_POST,
  data: { dataUpdate, postId },
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});
