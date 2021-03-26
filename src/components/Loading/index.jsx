import Spinner from 'components/Spinner';
import React from 'react';

const Loading = (props) => {
  const {className} = props;
  return (
    <div className='loading w-full h-30 flex justify-center items-center'>
      <Spinner className={className} />
    </div>
  )
}

export default Loading
