import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm';
import Register from './Register';
import Catalog from './Catalog';
import BookDetail from './BookDetail';
import BorrowHistory from './BorrowHistory';
import Profile from './Profile';

const Container = () => (
  <section id="content">
    <br/>
    <Switch>
      <Route exact path='/' component={LoginForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/register' component={Register} />
      <Route path='/catalog' component={Catalog} />
      <Route path='/book-detail' component={BookDetail} />
      <Route path='/borrow-history' component={BorrowHistory} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </section>
);

export default Container;
