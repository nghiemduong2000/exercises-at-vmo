import Axios from 'axios';
import { GET_QUOTES } from './type';

export const getQuotesData = () => async (dispatch) => {
  const quotes = await Axios.get(
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
  );
  dispatch({
    type: GET_QUOTES,
    payload: quotes.data.quotes,
  });
};
