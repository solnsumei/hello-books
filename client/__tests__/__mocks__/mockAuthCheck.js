import jwt from 'jsonwebtoken';
import mockLocalStorage from './mockLocalStorage';

const USERTOKEN = 'userToken';
const ADMIN = 'ADMIN';
const token = jwt.sign({ user: { id: 1 } }, 'shhhhh');

window.localStorage = mockLocalStorage;

const mockAuthCheck = jest.fn(() => {
  mockLocalStorage.setItem(USERTOKEN, token);
  mockLocalStorage.setItem(ADMIN, true);
  return true;
});

export default mockAuthCheck;
