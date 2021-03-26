import Axios from 'axios';
import { ADD_POST, DELETE_POST, GET_POSTS, UPDATE_POST } from './type';

export const getPostsData = () => async (dispatch) => {
  const posts = await Axios.get('/api/posts');
  dispatch({
    type: GET_POSTS,
    payload: posts.data,
  });
};

export const addPost = (data) => async (dispatch) => {
  try {
    const posts = await Axios.post('/api/posts', data);
    dispatch({
      type: ADD_POST,
      payload: posts.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = ({ dataUpdate, postId }) => async (dispatch) => {
  try {
    const posts = await Axios.patch(`/api/posts/${postId}`, dataUpdate);
    dispatch({
      type: UPDATE_POST,
      payload: posts.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  await Axios.delete(`/api/posts/${id}`);
  dispatch({
    type: DELETE_POST,
    payload: id,
  });
};
