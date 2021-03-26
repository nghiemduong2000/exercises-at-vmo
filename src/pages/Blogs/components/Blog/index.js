import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Blog = (props) => {
  const { name, description, _id } = props.posts;
  return (
    <li className='blog mb-32 shadow-around rounded-2xl overflow-hidden'>
      <Link to={`/Blogs/${_id}`}>
        <img
          src='https://loremflickr.com/640/360'
          alt='Anh nen'
          className='blog__img w-full h-30 object-cover transition duration-200'
        />
        <div className='blog__content px-8 pt-6 pb-8'>
          <h3 className='text-24 font-bold mb-2 text-purple'>{name}</h3>
          <p className='blog__content-desc text-14'>{description}</p>
        </div>
      </Link>
    </li>
  );
};

export default Blog;
