import axios from 'axios';

const path = '/api/posts';

export const getPostsApi = async () => {
  try {
    return await axios.get(path);
  } catch (err) {
    console.log(err);
  }
};

export const addPostApi = async (data) => {
  try {
    console.log(data);
    return await axios.post(path, data);
  } catch (err) {
    console.log(err);
  }
};

export const updatePostApi = async (id, data) => {
  try {
    return await axios.patch(`${path}/${id}`, data);
  } catch (err) {
    console.log(err);
  }
};

export const deletePostApi = async (id) => {
  try {
    await axios.delete(`${path}/${id}`);
  } catch (err) {
    console.log(err);
  }
};
