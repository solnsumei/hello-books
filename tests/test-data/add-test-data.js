import db from '../../server/models/index';
import Book from './book';
import User from './user';

const admin = new User('ejiro', 'ejiro@gmail.com', 'solomon1', true);
const user = new User('solking', 'solking@gmail.com', 'solomon1', false);

const book1 = new Book('Book One', 'Andela One', 'First book in library', 12, 'image1.jpg');
const book1 = new Book('Book Two', 'Ariel J', 'Second book in library', 4, 'image2.jpg');
const book1 = new Book('Book Three', 'Packard Bell', 'Third book in library', 3, 'image3.jpg');
const book1 = new Book('Book Four', 'Dunhill Mack', 'Four book in library', 1, 'image4.jpg');

export default testData = {
  createTestUsers(){
    return db.User.bulkCreate([admin, user], { individualHooks: true })
      .then(() => {
        return process.stdout.write('Test users created \n');
      });
  },

  createTestBooks(){
    return db.Book.bulkCreate([book1, book2, book3, book4], {})
      .then(() => {
        process.stdout.write('Test books created \n');
      });
  }
}




