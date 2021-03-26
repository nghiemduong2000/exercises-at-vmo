import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateTodos } from 'actions/todoAction';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Todo = (props) => {
  const { item, index, handleCompleted, handleDestroy } = props;
  const data = useSelector((state) => state.todo.todos);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(item.content);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editing) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
    //eslint-disable-next-line
  }, [editing]);

  const handleClick = (e) => {
    const { target } = e;
    if (!wrapperRef.current.contains(target)) {
      setEditing(!editing);
    }
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmitEdit = (e) => {
    if (e.key === 'Enter') {
      const changeContent = [
        ...data.slice(0, index),
        {
          ...item,
          content: input,
        },
        ...data.slice(index + 1),
      ];
      dispatch(updateTodos(changeContent));
      setEditing(false);
    }
  };

  return (
    <li className='todos__item border-b overflow-hidden'>
      <div
        className={`todos__view ${
          editing ? 'hidden' : 'block'
        } flex items-center px-4 py-6 group`}
        onDoubleClick={() => {
          setEditing(true);
        }}
      >
        {item.completed ? (
          <FontAwesomeIcon
            icon={faCheckCircle}
            onClick={() => handleCompleted(item, index)}
            className='mr-4 text-turquoise'
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            onClick={() => handleCompleted(item, index)}
            className='mr-4 text-gray-300'
          />
        )}
        <span
          className={`todos__content ${item.completed ? 'destroy' : ''} ${
            item.completed ? 'line-through text-gray-300' : 'text-gray-700'
          } text-24 flex-1 text-left transition-colors`}
        >
          {item.content}
        </span>
        <button
          className='destroy text-24 w-3.6 outline-none transition-opacity focus:outline-none opacity-0 group-hover:opacity-100 text-red-400'
          onClick={() => handleDestroy(item.key)}
        >
          x
        </button>
      </div>
      <input
        className={`${
          editing ? 'block' : 'hidden'
        } text-24 ml-16 h-full px-4 py-6 w-50`}
        value={input}
        ref={wrapperRef}
        onChange={handleOnChange}
        onKeyDown={handleSubmitEdit}
      />
    </li>
  );
};

export default Todo;
