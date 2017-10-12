
// format return attributes for books
const formatBookObject = (book, category) => ({
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
  Category: {
    name: category.name,
    slug: category.slug
  }
});

// Format borrowed book return type
const formatBorrowedBookObject = (borrowedBook, book) => ({
  id: borrowedBook.id,
  bookId: borrowedBook.bookId,
  createdAt: borrowedBook.createdAt,
  dueDate: borrowedBook.dueDate,
  returned: borrowedBook.returned,
  surcharge: borrowedBook.surcharge,
  Book: { title: book.title, isDeleted: book.isDeleted }
});

export { formatBookObject, formatBorrowedBookObject };
