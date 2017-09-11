import React from 'react';
import { Link } from 'react-router-dom';
/**
 *
 */
export default class Home extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h4 className="center-align">Book Catalog</h4>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m3">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="http://materializecss.com/images/office.jpg" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title <i className="material-icons right">more_vert</i></span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title
                  <i className="material-icons right">close</i></span>
                <p>Here is some more information about this
                    product that is only revealed once clicked on.
                </p>
                <p><Link to="book-detail">View more</Link></p>
              </div>
            </div>
          </div>

          <div className="col s12 m3">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="http://materializecss.com/images/office.jpg" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title <i className="material-icons right">more_vert</i></span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title
                  <i className="material-icons right">close</i></span>
                <p>Here is some more information about this
                    product that is only revealed once clicked on.
                </p>
                <p><Link to="book-detail">View more</Link></p>
              </div>
            </div>
          </div>

          <div className="col s12 m3">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="http://materializecss.com/images/office.jpg" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title <i className="material-icons right">more_vert</i></span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title
                  <i className="material-icons right">close</i></span>
                <p>Here is some more information about this
                    product that is only revealed once clicked on.
                </p>
                <p><Link to="book-detail">View more</Link></p>
              </div>
            </div>
          </div>


          <div className="col s12 m3">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="http://materializecss.com/images/office.jpg" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title <i className="material-icons right">more_vert</i></span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title
                  <i className="material-icons right">close</i></span>
                <p>Here is some more information about this
                    product that is only revealed once clicked on.
                </p>
                <p><Link to="book-detail">View more</Link></p>
              </div>
            </div>
          </div>


          <div className="col s12 m3">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="http://materializecss.com/images/office.jpg" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title
                  <i className="material-icons right">close</i></span>
                <p>Here is some more information about this
                    product that is only revealed once clicked on.
                </p>
                <p><Link to="book-detail">View more</Link></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
