import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import SignUpPage from './auth/SignUpPage';
import ForgotPasswordPage from './password/ForgotPasswordPage';
import ResetPasswordPage from './password/ResetPasswordPage';
import ProfilePage from './users/ProfilePage';
import CatalogPage from './book/CatalogPage';
import BookDetailPage from './book/BookDetailPage';
import ChangePasswordPage from './users/ChangePasswordPage';
import BorrowHistoryPage from './users/BorrowHistoryPage';
import AuthRoute from './middlewares/AuthRoute';
import IsAdmin from './common/IsAdmin';
import PreventAuthenticated from './middlewares/PreventAuthenticated';
import NotFound from './NotFound';

/**
 * Routes component to render
 * respective routes
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const Routes = props => (
  <main className={props.user.id ? 'main' : 'top-padding'}>
    <Switch>
      <Route exact path='/' render={() => PreventAuthenticated(LoginPage, props)} />
      <Route path='/login' render={() => PreventAuthenticated(LoginPage, props)} />
      <Route path='/register' render={() => PreventAuthenticated(SignUpPage, props)} />
      <Route path='/forgot-password' render={() =>
        PreventAuthenticated(ForgotPasswordPage, props)} />
      <Route path='/reset-password' render={() =>
        PreventAuthenticated(ResetPasswordPage, props)} />
      <AuthRoute path='/profile' component={ProfilePage} {...props} />
      <AuthRoute path='/change-password' component={ChangePasswordPage} {...props} />
      <AuthRoute exact path='/books' component={CatalogPage} {...props} />
      <AuthRoute path='/books/:id' component={BookDetailPage} {...props} />
      <AuthRoute path='/borrow-history' component={BorrowHistoryPage} {...props} />
      <AuthRoute component={IsAdmin} {...props} />
      <AuthRoute path="*" component={NotFound} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </main>
);

export default Routes;
