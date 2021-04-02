import { GET_QUOTES_SUCCESS } from '../actions/type';

const initialState = {
  quotes: [],
  loading: true,
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTES_SUCCESS:
      return {
        ...state,
        quotes: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default quoteReducer;
