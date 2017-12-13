export default {
  user: {
    id: 1,
    username: 'ejiro',
    firstName: 'Chuks',
    surname: 'Solomon',
    email: 'ejiro@gmail.com',
    admin: true,
    level: 'Free',
    googleUser: false,
    borrowedCount: 0,
    notReturned: 0
  },
  user2: {
    id: 1,
    username: 'ejiro',
    firstName: 'Chuks',
    surname: 'Solomon',
    email: 'ejiro@gmail.com',
    admin: false,
    level: 'Free',
    googleUser: false,
    borrowedCount: 0,
    notReturned: 0
  },
  memberships: [
    {
      level: 'Free',
      id: 4,
      lendDuration: 8,
      maxBorrowable: 2
    },
    {
      level: 'Bronze',
      id: 3,
      lendDuration: 14,
      maxBorrowable: 4
    },
    {
      level: 'Silver',
      id: 2,
      lendDuration: 24,
      maxBorrowable: 9
    },
    {
      level: 'Gold',
      id: 1,
      lendDuration: 30,
      maxBorrowable: 12
    }
  ],
  categories: [
    {
      id: 5,
      name: 'Pretty Development',
      slug: 'pretty-development'
    },
    {
      id: 7,
      name: 'New category',
      slug: 'new-category'
    },
    {
      id: 8,
      name: 'Whats Up Category',
      slug: 'whats-up-category'
    }
  ],
  books: [
    {
      id: 1,
      title: 'Javascript For Beginners',
      categoryId: 3,
      author: 'Andela Cohorts',
      description: 'Lovely book for beginners',
      coverPic: 'http://res.cloudinary.com/solmei/image/upload/v1511255710/xunarbshtsrjbx4nm4wp.jpg',
      isDeleted: false,
      stockQuantity: 13,
      borrowedQuantity: 1,
      isBorrowed: true,
      createdAt: '2017-11-15T10:29:22.998Z',
      category: {
        name: 'Melodies for comedy',
        slug: 'melodies-for-comedy'
      }
    },
    {
      id: 2,
      title: 'Book of Android',
      categoryId: 2,
      author: 'Andelans Class',
      description: 'Lovely book for beginners',
      coverPic: 'http://res.cloudinary.com/solmei/image/upload/v1511255729/a0rbqsiejdahhogamb22.png',
      isDeleted: false,
      stockQuantity: 36,
      borrowedQuantity: 1,
      isBorrowed: true,
      createdAt: '2017-11-15T10:28:56.397Z',
      category: {
        name: 'Android',
        slug: 'android'
      }
    }
  ],
  borrowedBooks: [{
    id: 220,
    bookId: 1,
    borrowDate: '2017-11-04T09:32:46.573Z',
    dueDate: '2017-11-25T09:32:46.573Z',
    returned: false,
    returnDate: null,
    book: {
      title: 'Book of Android',
      isDeleted: false
    }
  },
  {
    id: 219,
    bookId: 2,
    borrowDate: '2017-11-02T09:32:26.480Z',
    dueDate: '2017-12-01T09:32:26.480Z',
    returned: true,
    returnDate: '2017-11-02T09:32:26.480Z',
    book: {
      title: 'Javascript For Beginners',
      isDeleted: true
    },
  }],
  notifications: [
    {
      id: 220,
      borrowDate: '2017-11-04T09:32:46.573Z',
      dueDate: '2017-11-25T09:32:46.573Z',
      returned: false,
      returnDate: null,
      isSeen: false,
      book: {
        title: 'Book of Android'
      },
      user: {
        firstName: 'Ifelunwa',
        surname: 'Ejiro',
        username: 'solking'
      }
    },
    {
      id: 219,
      borrowDate: '2017-11-02T09:32:26.480Z',
      dueDate: '2017-12-01T09:32:26.480Z',
      returned: true,
      returnDate: '2017-11-02T09:32:26.480Z',
      isSeen: false,
      book: {
        title: 'Javascript For Beginners'
      },
      user: {
        firstName: 'Ifelunwa',
        surname: 'Ejiro',
        username: 'solking'
      }
    }
  ],
  itemCount: {
    borrowedBooks: 0,
    notifications: 2,
    books: 2,
    categories: 5
  }
};
