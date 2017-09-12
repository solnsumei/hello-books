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
          <div className="col s12 m5">
            <h3>
              <strong>Fusce euismod consequat</strong>
            </h3>
            <p className="offset-3"><i>By Onetti, Juan Carlos</i></p>

            <p>
              Your cloud_name account parameter is required to build URLs
               for your media assets. api_key and api_secret are further needed
               to perform secure API calls to Cloudinary (e.g., image and video uploads).
               See Account and API setup for more details.
            </p>
            <p>
              Setting the configuration parameters can be done either
               programmatically in each call to a Cloudinary
                method or globally using an environment variable or the config method.
               You can find your configuration parameters
                in the dashboard of our Management Console.
            </p>
            <p>
              Here's an example of setting configuration parameters
               globally in your Node application:
            </p>

          </div>

          <div className="col s12 m4">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img src="https://solnsumei.github.io/hello-books/template/img/page-3_img01.jpg" />
              </div>
            </div>
          </div>

          <div className="col s12 m3">
            <p>(Paperback - 2014 English )</p>
            <p>142 pages</p>
            <p>Status: <label class="label label-success">Available</label> </p>
            <button className="btn teal" id="borrow-book">Borrow</button>
            <p><Link to="/catalog">Back to Catalog</Link></p>
          </div>
        </div>
      </div>
    );
  }
}
