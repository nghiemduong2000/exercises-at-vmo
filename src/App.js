import { getPostsData } from 'actions/postAction';
import axios from 'axios';
import BlogDetail from 'pages/BlogDetail';
import Blogs from 'pages/Blogs';
import BlogAddEdit from 'pages/Blogs/components/BlogAddEdit';
import Calculator from 'pages/Calculator';
import Counter from 'pages/Counter';
import RandomQuoteMachine from 'pages/RandomQuoteMachine';
import Todos from 'pages/Todos';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';

axios.defaults.baseURL = 'https://exercise-blog-api.herokuapp.com';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsData());
    //eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Redirect exact from='/' to='/Blogs' />
          <Route path='/Todos' component={Todos} />
          <Route path='/Calculator' component={Calculator} />
          <Route path='/RandomQuote' component={RandomQuoteMachine} />
          <Route path='/Counter' component={Counter} />
          <Route exact path='/Blogs' component={Blogs} />
          <Route exact path='/Blogs/edit/:id' component={BlogAddEdit} />
          <Route exact path='/Blogs/add' component={BlogAddEdit} />
          <Route path='/Blogs/:id' component={BlogDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
