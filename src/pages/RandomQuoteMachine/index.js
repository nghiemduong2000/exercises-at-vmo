import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuotesData } from '../../actions/quoteAction';
import { colorList } from './data';
import './style.scss';

const RandomQuoteMachine = () => {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quote.quotes);
  const loading = useSelector((state) => state.quote.loading);
  const [state, setState] = useState({
    quote: '',
    author: '',
    color: '',
  });

  const getRandomQuote = (data) => {
    return data[Math.floor(Math.random() * data.length)];
  };

  const getQuote = () => {
    const randomQuote = getRandomQuote(quotes);
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    setState((newState) => ({
      ...newState,
      author: randomQuote?.author,
      quote: randomQuote?.quote,
      color: randomColor,
    }));
  };

  useEffect(() => {
    dispatch(getQuotesData());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getQuote();
    //eslint-disable-next-line
  }, [loading]);

  return (
    <div className='quote-wrap' style={{ backgroundColor: state.color }}>
      <div className='quote-box'>
        <div className='quote-text' style={{ color: state.color }}>
          <FontAwesomeIcon icon={faQuoteLeft} />
          <p>{state.quote}</p>
        </div>
        <div className='quote-author' style={{ color: state.color }}>
          <span>- </span>
          <span>{state.author}</span>
        </div>
        <div className='button'>
          {/* eslint-disable-next-line */}
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
              '"' + state.quote + '" ' + state.author
            )}`}
            style={{ backgroundColor: state.color }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <button onClick={getQuote} style={{ backgroundColor: state.color }}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomQuoteMachine;
