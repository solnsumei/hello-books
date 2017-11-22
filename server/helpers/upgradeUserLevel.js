import models from '../models/index';

const upgradeUserLevel = user =>
  models.BorrowedBook.count({
    where: {
      userId: user.id,
      returned: true,
    }
  })
    .then((result) => {
      if (result) {
        switch (true) {
          case (user.level === 'Silver' && result >= 50):
            user.level = 'Gold';
            break;

          case (user.level === 'Bronze' && result >= 20):
            user.level = 'Silver';
            break;

          case (user.level === 'Free' && result >= 10):
            user.level = 'Bronze';
            break;

          default:
            break;
        }

        return user.save()
          .then(() => true);
      }
    });

export default upgradeUserLevel;
