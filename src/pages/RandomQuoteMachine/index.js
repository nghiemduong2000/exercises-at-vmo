import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQuotesData } from 'actions/quoteAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colorList } from './data';
import './style.scss';

const RandomQuoteMachine = () => {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quote.quotes);
  const loading = useSelector((state) => state.quote.loading);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [color, setColor] = useState('');
  const [active, setActive] = useState(false);

  const getRandomQuote = (data) => {
    return data[Math.floor(Math.random() * data.length)];
  };

  const getQuote = () => {
    const randomQuote = getRandomQuote(quotes);
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    setActive(false);
    setTimeout(() => {
      setQuote(randomQuote?.quote);
      setAuthor(randomQuote?.author);
      setColor(randomColor);
    }, 700);
  };

  useEffect(() => {
    dispatch(getQuotesData());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getQuote();
    //eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    setActive(true);
  }, [quote]);

  return (
    <div className='quote-wrap' style={{ backgroundColor: color }}>
      <div className='quote-box'>
        <div
          className={`quote-wrap-text transition duration-700 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='quote-text' style={{ color: color }}>
            <FontAwesomeIcon icon={faQuoteLeft} />
            <p>{quote}</p>
          </div>
          <div className='quote-author' style={{ color: color }}>
            <span>- </span>
            <span>{author}</span>
          </div>
        </div>
        <div className='button'>
          {/* eslint-disable-next-line */}
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
              '"' + quote + '" ' + author
            )}`}
            style={{ backgroundColor: color }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <button onClick={getQuote} style={{ backgroundColor: color }}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomQuoteMachine;
