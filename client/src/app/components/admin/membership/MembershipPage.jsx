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
class MembershipPage extends React.Component {
  /**
   * @method constructor
   * @param  {Object} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      membership: Object.assign({}, this.props.membership),
      errors: {}
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.updateMembershipType = this.updateMembershipType.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  /**
   * @memberof MembershipPage
   * @returns {void}
   */
  componentDidMount() {
    this.props.loadMemberships();
  }

  /**
   * Open modal to edit a membership type
   * @method onEdit
   * @param  {Object} membership
   * @return {void}
   */
  onEdit(membership) {
    this.setState({
      membership: Object.assign({}, membership),
      errors: {}
    });

    $('#membership-modal').modal('open');
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const membership = this.state.membership;
    membership[field] = event.target.value;
    return this.setState({ membership });
  }

  /**
   * [saveMembershipType description]
   * @method saveMembershipType
   * @param  {Object} event [description]
   * @return {void}
   */
  updateMembershipType(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.updateMembershipType(this.state.membership)
      .then(() => {
        $('.modal').modal('close');
        this.setState({ membership: {
          id: '',
          level: '',
          lendDuration: 1,
          maxBorrowable: 1
        } });
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        } else {
          toastr.error(response.data.error);
        }
      });
  }

  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <MembershipList
                  membership={this.props.memberships}
                  onEdit={this.onEdit}
                />
              </div>
            </div>
          </div>

        </div>
        { this.state.membership &&
          <MembershipModal
            membershipType={this.state.membership}
            errors={this.state.errors}
            onSubmit={this.updateMembershipType}
            onChange={this.updateFormState}
          />
        }
      </div>
    );
  }
}

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

const mapDispatchToProps = dispatch => ({
  updateMembershipType: membership =>
    dispatch(membershipActions(actionTypes.UPDATE_MEMBERSHIP_TYPE, membership)),
  loadMemberships: () => membershipActions(actionTypes.LOAD_MEMBERSHIP_TYPES)
});

MembershipPage.propTypes = {
  memberships: PropTypes.array,
  membership: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembershipPage);
