
[![Build Status](https://travis-ci.org/solnsumei/hello-books.svg?branch=development)](https://travis-ci.org/solnsumei/hello-books)
[![Code Climate](https://codeclimate.com/github/solnsumei/hello-books/badges/gpa.svg)](https://codeclimate.com/github/solnsumei/hello-books)
[![Code Climate](https://codeclimate.com/github/solnsumei/hello-books/badges/coverage.svg)](https://codeclimate.com/github/solnsumei/hello-books/coverage)
[![Coverage Status](https://coveralls.io/repos/github/solnsumei/hello-books/badge.svg?branch=development)](https://coveralls.io/github/solnsumei/hello-books?branch=development)

# Hello-books

This app is hosted on [https://hello-book.herokuapp.com/]

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books.

## Built With
Hello-books was built with Node.js/Express.js, Postgres and Sequelize-ORM on the back-end. It's currently hosted on heroku.

## Installation
- Install `node` and `postgres`
- Clone the repository git clone https://github.com/solnsumei/hello-books.git
- Switch to project directory `cd ../path/to/hello-books`
- Install dependencies `npm i`
- Test `npm run test`
- Start app `npm run start`
- Consume API

## Endpoints

### Users
- User sign up          - POST api/v1/users/signup             - Registers a user
- User sign in          - POST api/v1/users/signin             - Logs a user in
- Get all books         - GET api/v1/books                     - allows a user to view all books in the library
- Get borrowed books    - GET api/v1/users/{userid}/books?returned=false - allows a user to view all books not yet returned
- Get borrowed books    - GET api/v1/users/{userid}/books?returned=true  - allows a user to view all books that have been returned
- Borrow Book  - GET api/v1/users/{userid}/books                - allows a user to borrow a book
- Return Book  - GET api/v1/users/{userid>}/books               - allows a user to return a borrowed book

### Admin
- User Signin  - api/v1/users/signin    - Logs an admin in
- Add  Book    - api/v1/books           - allows an admin to add a book
- Edit Book    - api/v1/books           - allows an admin to modify a book

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
