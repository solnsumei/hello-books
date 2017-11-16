import { User, Category, Book } from './dataholder';

export const users = {
    admin: new User('Ejiro', 'Chuks', 'ejiro', 'ejiro@gmail.com', 'solomon1', true),
    freeUser: new User('Solmei', 'Ejiroh', 'solking', 'solking@gmail.com', 'solomon1', false),
    silverUser: new User('Solo', 'Ejiroh', 'solking1', 'solking1@gmail.com', 'solomon1', false, 'Silver'),
};

export const categoriesForUserTest = {
  category1: new Category('Fiction', 'fiction'),
  category2: new Category('Programming', 'programming')
};

export const categoriesForBooksTest = {
    category1: new Category('Fiction', 'fiction'),
    category2: new Category('Programming', 'programming')
};

export const booksForUserTest = {
    book1: new Book('Book One', 1, 'Andela One', 'First book in library', 1, 'image1.jpg'),
    book2: new Book('Book Two', 2, 'Ariel J', 'Second book in library', 2, 'image2.jpg'),
    book3: new Book('Book Three', 2, 'Packard Bell', 'Third book in library', 1, 'image3.jpg'),
    book4: new Book('Book Four', 50, 'Dunhill Mack', 'Four book in library', 5, 'image4.jpg'),
};

export const booksForBookTest = {
  book1: new Book('Book One', 1, 'Andela One', 'First book in library', 1, 'image1.jpg'),
  book2: new Book('Book Two', 2, 'Ariel J', 'Second book in library', 2, 'image2.jpg'),
  book3: new Book('Book Three', 2, 'Packard Bell', 'Third book in library', 1, 'image3.jpg'),
  book4: new Book('Book Four', 50, 'Dunhill Mack', 'Four book in library', 5, 'image4.jpg'),
};

export const invalidBooks = {
    book1: new Book('Invalid Book One', 80, 'Andela One', 'First book in library', 12, 'image5.jpg'),
    book2: new Book('Invalid Book Two', 'hello', 'Andel Two', 'Second book in library', 5, 'image6.jpg'),
};