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
import ChangePasswordPage from './users/ChangePasswordPage';
import BorrowHistoryPage from './users/BorrowHistoryPage';
import IsAdmin from './common/IsAdmin';

const Routes = ({ user }) => (
  <main className={user.username ? 'main' : 'top-padding'}>
    <Switch>
      <Route exact path='/' component={PreventAuthenticatedUsers(LoginPage)} />
      <Route path='/login' component={PreventAuthenticatedUsers(LoginPage)} />
      <Route path='/register' component={PreventAuthenticatedUsers(SignUpPage)} />
      <Route path='/profile' component={IsAuthenticated(ProfilePage)} />
      <Route path='/change-password' component={IsAuthenticated(ChangePasswordPage)} />
      <Route exact path='/books' component={IsAuthenticated(CatalogPage)} />
      <Route path='/books/:id' component={IsAuthenticated(BookDetailPage)} />
      <Route path='/borrow-history' component={IsAuthenticated(BorrowHistoryPage)} />
      <Route component={IsAuthenticated(IsAdmin)} />
    </Switch>
  </main>
);

Routes.propTypes = {
  user: PropTypes.object
};

export default Routes;
