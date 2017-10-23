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
      <div className="top-padding">
        <div className="row">
          <div className="col s12">
            <h3 className="center-align">Admin Dashboard</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <div className="card">
              <br/>
              <Link to="/admin/membership-types">
                <div className="card-content center-align primary-color">
                  <i className="large material-icons">collections</i>
                  <br/>
                  <h4>Membership Types</h4>
                </div>
              </Link>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card">
              <br/>
              <Link to="/admin/books">
                <div className="card-content center-align primary-color">
                  <i className="large material-icons">book</i>
                  <br/>
                  <h4>Books</h4>
                </div>
              </Link>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card">
              <br/>
              <Link to="/admin/categories">
                <div className="card-content center-align primary-color">
                  <i className="large material-icons">collections_bookmark</i>
                  <br/>
                  <h4>Categories</h4>
                </div>
              </Link>
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
