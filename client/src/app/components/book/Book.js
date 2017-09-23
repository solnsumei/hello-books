import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 */
class Book extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    if (!this.props.link) {
      return (
        <div className="row">
          <div className="col s12 m5">
            <h3>
              <strong>{this.props.title}</strong>
            </h3>
            <p className="offset-3"><i>By {this.props.author}</i></p>

            {this.props.description}

          </div>

          <div className="col s12 m4">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img src={this.props.coverPic} />
              </div>
            </div>
          </div>

          <div className="col s12 m3">
            <p>({this.props.category})</p>
            <p>{this.props.numberOfPages} pages</p>
            <p>Status: <label className="label label-success">{this.props.status}</label> </p>
            <button data-target="modal1" className="btn modal-trigger">
              Borrow
            </button>
            <p><Link to="/catalog">Back to Catalog</Link></p>
          </div>
        </div>

      );
    }

    return (
      <div className="col s12 m6">
        <div className="row">
          <div className="col s4 m5">
            <Link to={this.props.link}>
              <img src={this.props.coverPic} className="img-thumbnail" />
            </Link>
          </div>
          <div className="col s8 m7">
            <h4 className="top">
              <Link to={this.props.link}>{this.props.title}</Link>
            </h4>
            <div className="book-details">
              <p className="offset-3">By {this.props.author}</p>
              <p>({this.props.category})</p>
              <p>{this.props.numberOfPages} pages</p>
            </div>
            <p> <Link to={this.props.link}>Details »</Link></p>
          </div>
        </div>
        <div className="margin-2x"></div>
      </div>
    );
  }
}

export default Book;
