import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import SignUpPage from './auth/SignUpPage';
import IsAuthenticated from './common/IsAuthenticated';
import PreventAuthenticatedUsers from './common/PreventAuthenticatedUsers';
import ProfilePage from './users/ProfilePage';
import CatalogPage from './book/CatalogPage';
import BookDetailPage from './book/BookDetailPage';
import BorrowHistoryPage from './users/BorrowHistoryPage';

const Routes = props => (
  <main className="top-padding">
    <Switch>
      <Route exact path='/' component={PreventAuthenticatedUsers(LoginPage)} />
      <Route path='/login' component={PreventAuthenticatedUsers(LoginPage)} />
      <Route path='/register' component={PreventAuthenticatedUsers(SignUpPage)} />
      <Route path='/profile' component={IsAuthenticated(ProfilePage)} />
      <Route path='/book-detail' component={IsAuthenticated(BookDetailPage)} />
      <Route path='/catalog' component={IsAuthenticated(CatalogPage)} />
      <Route path='/borrow-history' component={IsAuthenticated(BorrowHistoryPage)} />
    </Switch>
  </main>
);

Routes.propTypes = {
  user: PropTypes.object
};

export default Routes;
