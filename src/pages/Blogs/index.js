import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Blog from './components/Blog';
import './style.scss';

const Blogs = (props) => {
  const [posts, setPosts] = useState([]);
  const data = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    setPosts(data);
    //eslint-disable-next-line
  }, [data]);

  return (
    <div className='blogs mt-44'>
      <Link
        className='blogs__btnAdd w-32 h-32 bg-orange bg-opacity-90 fixed bottom-52 right-64 rounded-full shadow-around cursor-pointer transition  duration-200 hover:bg-orange-hard'
        to='/Blogs/add'
      >
        <FontAwesomeIcon icon={faEdit} className='blogs__btnAdd-icon' />
      </Link>
      <h2 className='blogs__title text-50 mb-16 font-bold text-purple'>
        Blogs Javascript
      </h2>
      {!loading ? (
        <ul className='blogs__list w-1/2 m-auto'>
          {posts.map((item) => {
            return <Blog posts={item} key={item._id} />;
          })}
        </ul>
      ) : (
        <Loading className='h-28 w-28' />
      )}
    </div>
  );
};

export default Blogs;
