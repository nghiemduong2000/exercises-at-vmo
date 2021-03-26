import React from 'react';

const Spinner = (props) => {
  const {className} = props;
  return (
    <svg className={`animate-spin ${className}`} viewBox='0 0 24 24'>
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='#F37224'
        stroke-width='4'
        fill='transparent'
      />
      <path
        fill='#F37224'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  )
}

export default Spinner
