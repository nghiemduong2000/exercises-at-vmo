import Loading from 'components/Loading';
import dateFormat from 'dateformat';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './style.scss';

const BlogDetail = () => {
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);

  const [currentPost, setCurrentPost] = useState({
    date: new Date(),
  });

  const { id } = useParams();

  useEffect(() => {
    setCurrentPost(posts.find((post) => post._id === id));
    //eslint-disable-next-line
  }, [loading]);

  return (
    <div className='blogDetail mt-48 w-1/2 m-auto text-left'>
      {!loading ? (
        <Fragment>
          <div className='blogDetail__top flex justify-between'>
            <p className='blogDetail__author text-20 text-gray-600'>
              <strong>Tác giả:</strong>
              {` ${currentPost?.author}`}
            </p>
            <p className='blogDetail__date text-20 text-gray-600'>
              {currentPost
                ? dateFormat(
                    new Date(currentPost.date),
                    'dddd, mmmm dS, yyyy, h:MM TT'
                  )
                : ''}
            </p>
          </div>
          <h1 className='blogDetail__title my-12 text-40 font-bold text-purple'>
            {currentPost?.name}
          </h1>
          <p className='blogDetail__desc text-18 mb-12'>
            {currentPost?.description}
          </p>
          <div
            className='blogDetail__body mb-32'
            dangerouslySetInnerHTML={{
              __html: currentPost && currentPost.body,
            }}
          />
        </Fragment>
      ) : (
        <Loading className='h-28 w-28' />
      )}
    </div>
  );
};

export default BlogDetail;
