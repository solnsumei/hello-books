import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import MembershipTypeList from './MembershipTypeList';
import MembershipTypeModal from './MembershipTypeModal';
import actionTypes from '../../../actions/actionTypes';
import membershipTypeActions from '../../../actions/membershipTypeActions';


/**
 * Membership type react component class
 * @type {String}
 */
class MembershipTypePage extends React.Component {
  /**
   * @method constructor
   * @param  {Object} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      membershipType: Object.assign({}, this.props.membershipType),
      errors: {}
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.updateMembershipType = this.updateMembershipType.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  /**
   * Open modal to edit a membership type
   * @method onEdit
   * @param  {Object} membershipType
   * @return {void}
   */
  onEdit(membershipType) {
    this.setState({
      membershipType: Object.assign({}, membershipType),
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
    const membershipType = this.state.membershipType;
    membershipType[field] = event.target.value;
    return this.setState({ membershipType });
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
    this.props.updateMembershipType(this.state.membershipType)
      .then(() => {
        $('.modal').modal('close');
        this.setState({ membershipType: {
          id: '',
          membershipType: '',
          lendDuration: 1,
          maxBorrowable: 1
        } });
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
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
                <MembershipTypeList
                  membershipTypes={this.props.membershipTypes}
                  onEdit={this.onEdit}
                />
              </div>
            </div>
          </div>

        </div>
        { this.state.membershipType &&
          <MembershipTypeModal
            membershipType={this.state.membershipType}
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
  const membershipType = {
    id: '',
    membershipType: '',
    lendDuration: 1,
    maxBorrowable: 1
  };

  return ({
    membershipType,
    membershipTypes: state.membershipTypes.sort((a, b) => (b.id - a.id)),
  });
};

const mapDispatchToProps = dispatch => ({
  updateMembershipType: membershipType =>
    dispatch(membershipTypeActions(actionTypes.UPDATE_MEMBERSHIP_TYPE, membershipType))
});

MembershipTypePage.propTypes = {
  membershipTypes: PropTypes.array,
  membershipType: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembershipTypePage);
