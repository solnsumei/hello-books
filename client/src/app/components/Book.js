import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 */
export default class Book extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    return (
      <div className="col s12 m6">
        <div className="row">
          <div className="col s4 m5">
            <Link to={this.props.link}>
              <img src={this.props.coverPic} className="img-thumbnail" />
            </Link>
          </div>
          <div className="col s8 m7">
            <h4>
              <Link to={this.props.link}>{this.props.title}</Link>
            </h4>
            <p className="offset-3">By {this.props.author}</p>
            <p>({this.props.category})</p>
            <p>{this.props.numberOfPages} pages</p>
            <p> <Link to={this.props.link}>Details »</Link></p>
          </div>
        </div>
        <div class="margin-2x"></div>
      </div>
    );
  }
}
