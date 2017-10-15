import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <div className="container">
          <div className="row">
            <div className="col s12 m4">
              <div className="card">
                <Link to="/admin/membership-types">
                  <div className="card-content">
                    <h1 className="center-align">
                      {this.props.membershipTypes}
                    </h1>
                    <h3 className="center-align">Membership Types</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="card">
                <Link to="/admin/books">
                  <div className="card-content">
                    <h1 className="center-align">{this.props.books}</h1>
                    <h3 className="center-align">Books in Library</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="card">
                <Link to="/admin/categories">
                  <div className="card-content">
                    <h1 className="center-align">{this.props.categories}</h1>
                    <h3 className="center-align">Categories Added</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  membershipTypes: state.membershipTypes.length,
  books: state.books.length,
  categories: state.categories.length
});

Dashboard.propTypes = {
  membershipTypes: PropTypes.number,
  books: PropTypes.number,
  categories: PropTypes.number
};

export default connect(mapStateToProps)(Dashboard);
