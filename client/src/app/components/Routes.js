import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import SignUpPage from './auth/SignUpPage';
import CatalogPage from './book/CatalogPage';
import BookDetailPage from './book/BookDetailPage';
import BorrowHistoryPage from './users/BorrowHistoryPage';
import ProfilePage from './users/ProfilePage';

const Routes = () => (
  <section id="content">
    <br/>
    <Switch>
      <Route exact path='/' component={LoginForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/register' component={SignUpPage} />
      <Route path='/catalog' component={CatalogPage} />
      <Route path='/book-detail' component={BookDetailPage} />
      <Route path='/borrow-history' component={BorrowHistoryPage} />
      <Route path="/profile" component={ProfilePage} />
    </Switch>
  </section>
);

export default Routes;
