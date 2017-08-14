# hello-books

This app is hosted on [https://hello-book.herokuapp.com/]

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
- Get Book     - GET api/v1/{userid}/books                - allows a user to view all books in the library
- Get Book     - GET api/v1/{userid}/books?returned=false - allows a user to view all books not yet returned
- Get Book     - GET api/v1/{userid}/books?returned=true  - allows a user to view all books that have been returned
- Borrow Book  - GET api/v1/{userid}/books                - allows a user to borrow books
- Return Book  - GET api/v1/{userid>}/books                - allows a user to return borrowed books

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

```

#### Get All Books
- Endpoint: **GET** `api/v1/books`
- Authorization: Yes
- Header Token 'x-token'

```
Response
[
    {
        "id": 1,
        "title": "Ocean Eleven",
        "author": "Mr Brown",
        "description": "Old Series 2",
        "coverPic": "image1.jpg"
    },
    {
        "id": 2,
        "title": "Hello Books",
        "author": "Solomon",
        "description": "first book in library",
        "coverPic": "image12.jpg"
    },
    {
        "id": 3,
        "title": "Hello Books1",
        "author": "Solomon",
        "description": "first book in library",
        "coverPic": "image13.jpg"
    }
]

```

#### Borrow Book
- Endpoint: **POST** `api/v1/users/{userid}/books`
- Authorization: Yes
- Header Token 'x-token'

```
Request
{
    "bookId": 1,
}

Response
{
    "message": "Book borrowed successfully",
    "book": {
        "title": "Hello Books1",
        "returnDate": "2017-08-25T15:04:26.697Z",
        "returned": false
    }
}

```

#### GET Borrow History
- Endpoint: **GET** `api/v1/users/{userid}/books`
- Authorization: Yes
- Header Token 'x-token'

```

Response
[
    {
        "userId": 2,
        "bookId": 2,
        "dueDate": "2017-08-25T11:44:40.566Z",
        "returned": false,
        "createdAt": "2017-08-11T11:44:40.568Z",
        "updatedAt": "2017-08-11T11:44:40.568Z",
        "Book": {
            "title": "Hello Books",
            "author": "Solomon"
        }
    },
    {
        "userId": 2,
        "bookId": 3,
        "dueDate": "2017-08-25T11:45:48.793Z",
        "returned": true,
        "createdAt": "2017-08-11T11:45:48.793Z",
        "updatedAt": "2017-08-11T11:46:19.179Z",
        "Book": {
            "title": "Hello Books1",
            "author": "Solomon"
        }
    },
    {
        "userId": 2,
        "bookId": 3,
        "dueDate": "2017-08-25T15:04:26.697Z",
        "returned": true,
        "createdAt": "2017-08-11T15:04:26.717Z",
        "updatedAt": "2017-08-11T15:07:27.389Z",
        "Book": {
            "title": "Hello Books1",
            "author": "Solomon"
        }
    }
]

```

#### GET Borrowed books not returned
- Endpoint: **GET** `api/v1/users/{userid}/books?returned=false`
- Authorization: Yes
- Header Token 'x-token'

```

Response
[
    {
        "userId": 2,
        "bookId": 2,
        "dueDate": "2017-08-25T11:44:40.566Z",
        "returned": false,
        "createdAt": "2017-08-11T11:44:40.568Z",
        "updatedAt": "2017-08-11T11:44:40.568Z",
        "Book": {
            "title": "Hello Books",
            "author": "Solomon"
        }
    }
]

```

#### Return Borrowed Book
- Endpoint: **PUT** `api/v1/users/{userid}/books`
- Authorization: Yes
- Header Token 'x-token'

```
Request
{
    "bookId": 1,
}

Response
{
    "message": "Book was returned successfully",
    "book": {
        "title": "Hello Books1",
        "returned": true
    }
}

```

### Admins

#### Add Book
- Endpoint: **POST** `api/v1/books`
- Authorization: Yes
- Header Token 'x-token'

```

Request
{
    "title": "Hello Books 3",
    "author": "Solomon",
    "description": "first book in library",
    "coverPic": "image14.jpg",
    "stockQuantity": 40,
}

Response
{
    "borrowedQuantity": 0,
    "id": 4,
    "title": "Hello Books 3",
    "author": "Solomon",
    "description": "first book in library",
    "coverPic": "image14.jpg",
    "stockQuantity": 40,
    "updatedAt": "2017-08-11T15:25:38.586Z",
    "createdAt": "2017-08-11T15:25:38.586Z",
    "isBorrowed": false,
    "isDeleted": false
}


```

#### Edit Book
- Endpoint: **PUT** `api/v1/books/{bookId}`
- Authorization: Yes
- Header Token 'x-token'

```

Request
{
    "title": "Hello Books 3",
    "author": "Solomon",
    "description": "first book in library",
    "coverPic": "image14.jpg",
}

Response
{
    "borrowedQuantity": 0,
    "id": 4,
    "title": "Hello Books 3",
    "author": "Solomon",
    "description": "first book in library",
    "coverPic": "image14.jpg",
    "stockQuantity": 40,
    "updatedAt": "2017-08-11T15:25:38.586Z",
    "createdAt": "2017-08-11T15:25:38.586Z",
    "isBorrowed": false,
    "isDeleted": false
}


```
