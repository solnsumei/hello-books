[![Build Status](https://travis-ci.org/solnsumei/hello-books.svg?branch=development)](https://travis-ci.org/solnsumei/hello-books)
[![Code Climate](https://codeclimate.com/github/solnsumei/hello-books/badges/gpa.svg)](https://codeclimate.com/github/solnsumei/hello-books)
[![Code Climate](https://codeclimate.com/github/solnsumei/hello-books/badges/coverage.svg)](https://codeclimate.com/github/solnsumei/hello-books/coverage)
[![Coverage Status](https://coveralls.io/repos/github/solnsumei/hello-books/badge.svg?branch=development)](https://coveralls.io/github/solnsumei/hello-books?branch=development)

# Hello-books

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books.

This app is hosted on [https://hello-book.herokuapp.com/]

## Application Features

The API has the following features

#### Unauthenticated Users

- Creating an account
- Signing in as an existing user
- Reset password

#### Authenticated Users

- View and update profile
- Change password
- View books
- Borrow and return borrowed books
- View borrowing history
- Receive email notification when a surcharge is place for late return of borrowed book

#### Admin

- Add, edit and delete books
- Add, edit and delete categories
- Group a books by category
- Edit membership types
- View and read borrowing notifications

## Built With
Hello-books was built with the following technologies:

*  **[Node.js](https://nodejs.org/en/)**
*  **[Express Js](https://expressjs.com/)** - Node express server
*  **[sequelize](https://www.npmjs.com/package/sequelize)** -  Database ORM
*  **[postgreSQL](https://www.postgresql.org/)** - Database server
*  **[React.js](https://reactjs.org/)** - Front-end 
*  **[Redux.js](http://redux.js.org/)** - Front-end

## Installation and setup
-  Navigate to a directory of choice on `terminal` or `cmd`.
-  Clone this repository on that directory.
    * `https://github.com/solnsumei/hello-books.git`

-  Navigate to the repo's folder on your computer
  *  `cd hello-books/`
-  Install the app's dependencies. For best results, using a node package manager.
  *  `npm install`
 
-  In order to use app dependencies, you need to install it through **npm**. You also need to have **node** and **postgres** installed on your system.

-  Run the app
  *  `npm run start`

That should start your server. You are ready to go from there

## Testing
-   Use separate databases for development and testing as shown in the .env.example file
-   Run server-side test with `npm test:local`
-   Run client-side test withh `npm run test:client`

## Documentation
For in depth documentation see: [https://hello-book.herokuapp.com/api/docs]

## Contributing to the Project
Contributions are welcome and appreciated. To contribute

-  Fork this repository [here](https://github.com/solnsumei/hello-books/)
-  Open a terminal and execute the following command to make a local copy
`$ git clone https://github.com/solnsumei/hello-books.git`
-  Run this code to navigate into the folder `cd hello-books`
-  Make your contributions to your local repo
-  Add a connection to the original repo using
`$ git remote add repo_nickname https://github.com/solnsumei/hello-books/`
-  Note that `repo_nickname` is a nickname you choose.
-  Run `git remote -v` to verify that the connection is established
-  Make your contributions to your local copy of the project
-  Run `git add` and `git commit` to commit your contributions to the project
-  Run `git push` to push your changes to your copy of the repository
-  If you feel you've made a contribution that will improve the project, raise a pull Request against the development branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done
-  I look forward to your pull requests!

## Limitations
Hello-books current limitations (aka features in development) include:
- Upload book by admin
- Users can contribute books by region
- Users ability to read books online

## License
  This project is available for use and modification under the MIT License. See the LICENSE file for more details.