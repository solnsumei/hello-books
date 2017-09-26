import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import MembershipType from './MembershipType';


/**
 * [className description]
 * @type {String}
 */
class Dashboard extends React.Component {
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
            <h3 className="center-align teal-text">Admin Dashboard</h3>
            <div className="divider"></div>
          </div>
        </div>
        <div className="row">
          <MembershipType membershipTypes={this.props.membershipTypes} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  membershipTypes: state.membershipTypes,
});

Dashboard.propTypes = {
  membershipTypes: PropTypes.array,
};

export default connect(mapStateToProps)(Dashboard);
