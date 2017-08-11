#hello-books

This app is hosted on [https://hello-book.herokuapp.com]

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books.

## Development
The application leverages NodeJS; Express JS for routing and sequelize ORM.

## Installation
- Install `node` and `postgres`
- Clone the repository git clone https://github.com/solnsumei/HelloBooks.git
- Switch to project directory `cd ../path/to/HelloBooks`
- Install dependencies `npm i`
- Test `npm test`
- Start app `npm start`
- Consume via postman

## Endpoints

### Users
- User Sign up  - POST api/v1/users/signup                - Registers a user
- User Sign in  - POST api/v1/users/signin                - Logs a user in
- Get Book     - GET api/v1/<userid>/books                - allows a user to view all books in the library
- Get Book     - GET api/v1/<userid>/books?returned=false - allows a user to view all books not yet returned
- Get Book     - GET api/v1/<userid>/books?returned=true  - allows a user to view all books that have been returned
- Borrow Book  - GET api/v1/<userid>/books                - allows a user to borrow books
- Return Book  - GET api/v1/<userid>/books                - allows a user to return borrowed books

### Admin
- User Signin  - api/v1/users/signin - Logs an admin in
- Add  Book    - api/v1/books        - allows an admin to add a book
- Edit Book  - api/v1/books          - allows an admin to modify a book


## Verbs
- GET
- POST
- PUT


#### Create User
- Endpoint: **POST** `api/v1/users/signup`
- Authorization: NA

```
Request
{
    "username": "solking",
    "email": "solking@gmail.com",,
    "password": "solomon1"
}

Response
{
   "message": "User created successfully",
   "user": {
       "username": "solking",
       "email": "solking@gmail.com",
   }
}

```
#### Sign in
- Endpoint: **POST** `api/v1/users/signin`
- Authorization: Yes

```
Request
{
    "username": "solking",
    "password": "solomon1"
}

Response
{
   "username": "solking",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJiYmJAZ21haWwuY29tIiwibWVtYmVyc2hpcCI6ImJyb256ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTAyMzc5MzM3LCJleHAiOjE1MDI0NjU3Mzd9.FjK888IV26y22zW5Lyrjefgs9TeMM2n22GgV_CcW5H4"
}