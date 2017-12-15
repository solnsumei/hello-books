import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import MembershipList from './MembershipList';
import MembershipModal from './MembershipModal';
import actionTypes from '../../../actions/actionTypes';
import membershipActions from '../../../actions/membershipActions';


/**
 * Membership type react component class
 * @type {String}
 */
export class MembershipPage extends React.Component {
  /**
   * Initializes object
   * @method constructor
   * @param  {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      membership: { ...this.props.membership },
      errors: {}
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.updateMembershipType = this.updateMembershipType.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  /**
   * Loads the membership types
   * when component mounts
   * @memberof MembershipPage
   * 
   * @returns {void}
   */
  componentDidMount() {
    this.props.loadMemberships();
    $('.modal').modal();
  }

  /**
   * Open modal to edit a membership type
   * @method onEdit
   * @param  {Object} membership
   * 
   * @return {void}
   */
  onEdit(membership) {
    this.setState({
      membership: { ...membership },
      errors: {}
    });

    $('#membership-modal').modal('open');
  }

  /**
   * Update form state
   * @param {object} event
   * 
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const membership = this.state.membership;
    membership[field] = event.target.value;
    return this.setState({ membership });
  }

  /**
   * Updates the membership type in redux store
   * @method saveMembershipType
   * @param  {Object} event
   * 
   * @return {void}
   */
  updateMembershipType(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.saveMembershipType(this.state.membership)
      .catch(({ response }) => {
        if (response.data.errors) {
          return this.setState({ errors: response.data.errors });
        }
        return toastr.error(response.data.error);
      });

    $('.modal').modal('close');
    return this.setState({
      membership: {
        id: '',
        level: '',
        lendDuration: 1,
        maxBorrowable: 1
      }
    });
  }

  /**
   * Renders the react component
   * @method render
   * 
   * @return {Object} jsx
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <MembershipList
                  memberships={this.props.memberships}
                  onEdit={this.onEdit}
                />
              </div>
            </div>
          </div>

        </div>
        { this.state.membership &&
          <MembershipModal
            membership={this.state.membership}
            errors={this.state.errors}
            onSubmit={this.updateMembershipType}
            onChange={this.updateFormState}
          />
        }
      </div>
    );
  }
}

/**
 * Maps redux state to class props
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} props
 */
const mapStateToProps = (state, ownProps) => {
  const membership = {
    id: '',
    level: '',
    lendDuration: 1,
    maxBorrowable: 1
  };

  return ({
    membership,
    memberships: state.memberships.sort((a, b) => (b.id - a.id)),
  });
};

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  saveMembershipType: membership =>
    dispatch(membershipActions(actionTypes.UPDATE_MEMBERSHIP_TYPE, membership)),
  loadMemberships: () => dispatch(membershipActions(actionTypes.LOAD_MEMBERSHIP_TYPES))
});

MembershipPage.propTypes = {
  memberships: PropTypes.array,
  membership: PropTypes.object,
  updateMembership: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MembershipPage);
