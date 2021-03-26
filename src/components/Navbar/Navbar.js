import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = (props) => {
  // const { location } = props;
  const location = useLocation();
  return (
    <div className='navbar__wrap fixed h-32 bg-primary top-0 w-full z-10'>
      <div className=' navbar container flex items-center h-full m-auto'>
        <Link to='/Blogs' className='mr-40'>
          <img
            src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1615915194/logoVMO-PNG-02_ybelrn.png'
            alt=''
          />
        </Link>
        {['Blogs', 'Todos', 'Calculator', 'RandomQuote', 'Counter'].map(
          (item, index) => {
            return (
              <Link
                key={index}
                className={`navbar__item ${
                  location.pathname.indexOf(item) !== -1 ? 'showUnderline' : ''
                }`}
                to={`/${item}`}
              >
                {item}
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Navbar;
