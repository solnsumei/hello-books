import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import Modal from '../common/Modal';
/**
 *
 */
class BookDetailPage extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    const description =
    <article>
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
    </article>;

    return (
      <div className="container">
        <Book
          title="Follow the Morning Star"
          coverPic="https://solnsumei.github.io/hello-books/template/img/page-3_img01.jpg"
          author="Di Morrissey"
          category="Fiction"
          description={description}
          status="Available"
          numberOfPages="142" />

        <Modal id="modal1" title="Confirm Borrow" text="Do you want to borrow this book?"/>
      </div>
    );
  }
}

export default BookDetailPage;
