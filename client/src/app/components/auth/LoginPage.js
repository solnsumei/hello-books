import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';
import LoginForm from './LoginForm';
import { loginRequest } from '../../actions/userActions';

/**
 *
 */
class LoginPage extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loginParams: {
        username: '',
        password: ''
      },
      errors: {},
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * [componentDidMount description]
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    if (this.props.user.username) {
      this.props.history.replace('/profile');
    }
  }

  /**
   * [componentDidUpdate description]
   * @method componentDidUpdate
   * @param  {[type]}           prevProps [description]
   * @return {[type]}                     [description]
   */
  componentDidUpdate(prevProps) {
    const isLoggingIn = !prevProps.user.username && this.props.user.username;
    const loggedOut = prevProps.user.username && !this.props.user.username;

    if (isLoggingIn) {
      this.props.history.replace('/profile');
    }
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const loginParams = this.state.loginParams;
    loginParams[field] = event.target.value;
    return this.setState({ loginParams });
  }

  /**
   * @param {object} event
   * @return {object} state
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.loginUser(this.state.loginParams)
      .catch(({ response }) => this.setState({ errors: response.data }));
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <LoginForm
            loginParams={this.state.loginParams}
            onChange={this.updateFormState}
            onSubmit={this.onSubmit}
            errors={this.state.errors} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  loginUser: loginData => dispatch(loginRequest(loginData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
