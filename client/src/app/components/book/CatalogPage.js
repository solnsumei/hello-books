import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
/**
 *
 */
export default class CatalogPage extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <h4 className="center-align">Book Catalog</h4>
          </div>
          <div className="col s6">
            <h4>Book Catalog</h4>
          </div>
        </div>
        <div className="row">

          <Book
            title="Follow the Morning Star"
            coverPic="https://solnsumei.github.io/hello-books/template/img/page-3_img01.jpg"
            link="/book-detail"
            author="Di Morrissey"
            category="Fiction"
            numberOfPages="142" />

          <Book
            title="Kimberly Sun"
            coverPic="https://solnsumei.github.io/hello-books/template/img/page-3_img03.jpg"
            link="/book-detail"
            author="Di Morrissey"
            category="Fiction"
            numberOfPages="142" />

          <Book
            title="Ellis Chronicles"
            coverPic="https://solnsumei.github.io/hello-books/template/img/page-3_img02.jpg"
            link="/book-detail"
            author="John Madsen"
            category="Adventure"
            numberOfPages="1000" />

          <Book
            title="The Book Thief"
            coverPic="https://solnsumei.github.io/hello-books/template/img/page-3_img08.jpg"
            link="/book-detail"
            author="Marcus Zusak"
            category="Horror"
            numberOfPages="122" />

        </div>
      </div>
    );
  }
}
