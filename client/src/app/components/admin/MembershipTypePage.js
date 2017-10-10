import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import MembershipTypeList from './MembershipTypeList';


/**
 * [className description]
 * @type {String}
 */
class MembershipTypePage extends React.Component {
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
            <h3 className="center-align teal-text">Membership Types</h3>
            <div className="divider"></div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <MembershipTypeList membershipTypes={this.props.membershipTypes} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  membershipTypes: state.membershipTypes,
});

MembershipTypePage.propTypes = {
  membershipTypes: PropTypes.array,
};

export default connect(mapStateToProps)(MembershipTypePage);
