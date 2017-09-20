import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const SignUpSuccess = ({ data }) => {
  if (data) {
    return (
      <div className="col s12">
        <h4 className="center-align teal-text">
          Hello {data.user.name}, thank you for registering with us
          <br/>
          <small>
            <Link to="/login">
              Click here to login to your account
            </Link>
          </small>
        </h4>
      </div>
    );
  }
};

SignUpSuccess.propTypes = {
  data: PropTypes.object.isRequired
};

export default SignUpSuccess;
