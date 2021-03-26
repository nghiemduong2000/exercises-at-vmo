import React from 'react';

const Button = (props) => {
  const {
    handleDecimal,
    handleOperators,
    handleNumbers,
    handleEvaluate,
    initialize,
  } = props;

  return (
    <div className='cal__tableButton grid gap-0.5 grid-cols-4 grid-flow-row'>
      <button className='col-span-2 remove bg-red-700' onClick={initialize}>
        AC
      </button>
      <button className='operator' value='/' onClick={handleOperators}>
        /
      </button>
      <button className='operator' value='x' onClick={handleOperators}>
        x
      </button>
      <button className='number' value='7' onClick={handleNumbers}>
        7
      </button>
      <button className='number' value='8' onClick={handleNumbers}>
        8
      </button>
      <button className='number' value='9' onClick={handleNumbers}>
        9
      </button>
      <button className='operator' value='+' onClick={handleOperators}>
        +
      </button>
      <button className='number' value='4' onClick={handleNumbers}>
        4
      </button>
      <button className='number' value='5' onClick={handleNumbers}>
        5
      </button>
      <button className='number' value='6' onClick={handleNumbers}>
        6
      </button>
      <button className='operator' value='-' onClick={handleOperators}>
        -
      </button>
      <button className='number' value='1' onClick={handleNumbers}>
        1
      </button>
      <button className='number' value='2' onClick={handleNumbers}>
        2
      </button>
      <button className='number' value='3' onClick={handleNumbers}>
        3
      </button>
      <button className='col-span-2 number' value='0' onClick={handleNumbers}>
        0
      </button>
      <button className='number' value='.' onClick={handleDecimal}>
        .
      </button>
      <button
        className='col-start-4 col-end-5 row-start-4 row-end-6 equal'
        value='='
        onClick={handleEvaluate}
      >
        =
      </button>
    </div>
  );
};

export default Button;
