import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTodos, updateTodos } from 'actions/todoAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from './components/Todo';
import './style.scss';

const Todos = (props) => {
  const data = useSelector((state) => state.todo.todos);
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    input: '',
    filter: 'All',
    dataFilter: [],
  });

  useEffect(() => {
    setState((newState) => ({
      ...newState,
      dataFilter: data,
    }));
    //eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('dataTodos'))) {
      localStorage.setItem('dataTodos', '[]');
    }
    dispatch(getTodos());
    //eslint-disable-next-line
  }, []);

  // Handle Completed
  const handleCompleted = (item, index) => {
    const checkTodo = [
      ...data.slice(0, index),
      {
        ...item,
        completed: !item.completed,
      },
      ...data.slice(index + 1),
    ];
    dispatch(updateTodos(checkTodo));
  };

  // Handle Completed All
  const handleCompletedAll = () => {
    const uncompleted = data.filter((item) => {
      return item.completed === false;
    });
    if (uncompleted.length > 0) {
      changeCompletedAll(true);
    } else if (uncompleted.length === 0) {
      changeCompletedAll(false);
    }
  };

  // Change Completed All
  const changeCompletedAll = (bool) => {
    const changeCompletedAll = data.map((item) => {
      return {
        ...item,
        completed: bool,
      };
    });
    dispatch(updateTodos(changeCompletedAll));
  };

  // Handle Add Todo
  const handleAddTodo = (e) => {
    if (e.key === 'Enter') {
      const newTodo = {
        key: data.length === 0 ? 1 : data[data.length - 1].key + 1,
        content: state.input,
        completed: false,
      };
      dispatch(updateTodos([...data, newTodo]));
      setState((newState) => ({
        ...newState,
        input: '',
      }));
    }
  };

  // Handle Destroy
  const handleDestroy = (key) => {
    const filter = data.filter((item) => {
      return item.key !== key;
    });
    dispatch(updateTodos(filter));
  };

  // Handle onChange
  const handleOnChange = (e) => {
    e.persist();
    setState((newState) => ({
      ...newState,
      input: e.target.value,
    }));
  };

  // Handle Filter
  const handleFilter = () => {
    return data.filter((currentVal) => {
      switch (state.filter) {
        case 'Active':
          return currentVal.completed === false;
        case 'Completed':
          return currentVal.completed === true;
        default:
          return currentVal;
      }
    });
  };

  return (
    <div className='wrapTodos flex justify-center items-center h-screen bg-gray-l'>
      <div className='todos w-55 shadow-around bg-white'>
        <div className='todos__header border-b-2 px-6 flex items-center'>
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={handleCompletedAll}
            className='todos__checkAll text-gray-500 mr-4'
          />
          <input
            value={state.input}
            placeholder='What needs to be done?'
            onKeyDown={handleAddTodo}
            onChange={handleOnChange}
            className='todos__inputHeader text-24 placeholder-gray-200 flex-1 outline-none py-6'
          />
        </div>
        <ul className='todos__list'>
          {handleFilter().map((item, index) => {
            return (
              <Todo
                item={item}
                index={index}
                key={index}
                handleCompleted={handleCompleted}
                handleDestroy={handleDestroy}
              />
            );
          })}
        </ul>
        <footer
          className={`py-4 px-6 ${
            data.length > 0 ? 'block' : 'hidden'
          } relative`}
        >
          <span className='float-left text-14 absolute top-1/2 left-6 todos__total'>{`${
            data.length
          } ${data.length > 1 ? 'items left' : 'item left'}`}</span>
          <ul className='inline-block text-14'>
            {['All', 'Active', 'Completed'].map((item, index) => {
              return (
                <li
                  key={index}
                  className={`todos__filter-btn ${
                    state.filter === `${item}` ? 'active' : ''
                  }`}
                  onClick={() => {
                    setState({ ...state, filter: item });
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Todos;
