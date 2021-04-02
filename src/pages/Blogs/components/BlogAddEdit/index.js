import { addPost } from 'actions/postAction';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import validation from 'utils/validation';
import Editor from '../Editor';
import './style.scss';

const BlogAddEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    body: '',
    name: '',
    description: '',
    author: '',
    error: '',
  });

  const handleOnChange = (html) => {
    setState((newState) => ({
      ...newState,
      body: html,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, author, body } = state;
    if (validation(name, description, author, body)) {
      const newPost = {
        name,
        author,
        body: body,
        description,
      };
      setState((newState) => ({
        ...newState,
        error: '',
      }));
      dispatch(addPost(newPost));
      history.push('/Blogs');
    } else {
      setState((newState) => ({
        ...newState,
        error: 'Vui lòng điền tất cả ô trống',
      }));
    }
  };

  return (
    <div className='blogAddEdit mt-44'>
      <h2 className='blogAddEdit__title text-50 text-purple font-bold inline-block mb-12'>
        Tạo bài viết
      </h2>
      <form
        onSubmit={handleSubmit}
        className='blogAddEdit__form flex flex-col w-1/2 m-auto'
      >
        {state.error ? (
          <div className='BlogAddEdit__error bg-red-100 mb-8 border border-red-500 text-18 py-4 px-6 text-red-500'>
            {state.error}
          </div>
        ) : null}
        <input
          placeholder='Điền tiêu đề'
          onChange={(e) => setState({ ...state, name: e.target.value })}
          className='blogAddEdit__input'
        />
        <input
          name='author'
          placeholder='Điền tên tác giả'
          onChange={(e) => setState({ ...state, author: e.target.value })}
          className='blogAddEdit__input'
        />
        <input
          placeholder='Điền mô tả bài viết'
          onChange={(e) => setState({ ...state, description: e.target.value })}
          className='blogAddEdit__input'
        />
        <Editor handleOnChange={handleOnChange} editorHtml={state.body} />
        <button
          type='submit'
          className='w-full mt-16 font-bold py-6 bg-orange text-20 transition duraion-200 text-white hover:bg-orange-hard'
        >
          ĐĂNG BÀI
        </button>
      </form>
    </div>
  );
};

export default BlogAddEdit;
