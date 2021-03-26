import { GET_TODOS, UPDATE_TODOS } from './type';

export const getTodos = () => {
  return {
    type: GET_TODOS,
    payload: JSON.parse(localStorage.getItem('dataTodos')),
  };
};

export const updateTodos = (data) => {
  localStorage.setItem('dataTodos', JSON.stringify(data));
  return {
    type: UPDATE_TODOS,
    payload: data,
  };
};
