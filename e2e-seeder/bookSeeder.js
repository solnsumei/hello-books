import models from '../server/models/index';

const book = {
  title: 'Title',
  author: 'Author',
  categoryId: 1,
  stockQuantity: 20,
  description: 'New book',
  coverPic: 'http://res.cloudinary.com/solmei/image/upload/v1513617506/gpprtr2al9iiaphtxbso.jpg'
};

models.Book.bulkCreate([book], {})
  .then(() => {
    process.stdout.write('Test book created \n');
    process.exit();
  });
