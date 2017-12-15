/**
 * Formats book object
 * @param {Object} book - book object
 * @param {Object} category - category object
 * 
 * @return {Object} formatted book object
 */
const formatBook = (book, category) => ({
  id: book.id,
  title: book.title,
  categoryId: book.categoryId,
  author: book.author,
  description: book.description,
  coverPic: book.coverPic,
  stockQuantity: book.stockQuantity,
  borrowedQuantity: book.borrowedQuantity,
  isDeleted: book.isDeleted,
  createdAt: book.createdAt,
  category: {
    name: category.name,
    slug: category.slug
  }
});

/**
 * Formats the borrowed book object
 * @param {Object} borrowedBook - borrowed book object
 * @param {Object} book - book object
 * 
 * @return {Object} borrowed book
 */
const formatBorrowedBook = (borrowedBook, book) => ({
  id: borrowedBook.id,
  bookId: borrowedBook.bookId,
  borrowDate: borrowedBook.borrowDate,
  returnDate: borrowedBook.returnDate,
  dueDate: borrowedBook.dueDate,
  returned: borrowedBook.returned,
  isSeen: borrowedBook.isSeen,
  book: { title: book.title, isDeleted: book.isDeleted }
});

/**
 * Formats user object
 * @param {Object} user - user object
 * 
 * @return {Object} formatted user object
 */
const formatUser = user => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  surname: user.surname,
  email: user.email,
  admin: user.admin,
  level: user.level,
  googleUser: user.googleUser,
  borrowedCount: user.borrowedCount || 0,
  notReturned: user.notReturned || 0,
});

export { formatBook, formatBorrowedBook, formatUser };
