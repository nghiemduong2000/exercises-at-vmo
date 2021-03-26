import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './style.scss';

const Counter = (props) => {
  const [screen, setScreen] = useState(0);

  return (
    <div className='counter flex items-center justify-center h-screen flex-col text-24'>
      <h1 className='counter__Screen text-140 mb-36 text-pri-2'>{screen}</h1>
      <div className='counter__btn flex mb-14'>
        <button
          onClick={() => setScreen(screen - 1)}
          disabled={screen === 0 ? true : false}
        >
          -
        </button>
        <button onClick={() => setScreen(screen + 1)}>+</button>
      </div>
      <FontAwesomeIcon
        icon={faRedo}
        className='counter__redo cursor-pointer'
        onClick={() => setScreen(0)}
      />
    </div>
  );
};

export default Counter;
