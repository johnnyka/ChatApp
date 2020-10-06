import { assert } from 'chai';
import messageObj from '../../utils/messages';
import { TMessage } from '../../utils/types';
import { hasSpecialChar, nameExist } from '../../utils/validation';
import { usernames } from '../../utils/users';

jest.mock('../../utils/users');
const { storeUser, removeUser } = jest.requireActual('../../utils/users');

const mockName = 'John';
const mockMsg = 'This is a message.';

describe('Username validation functions', () => {
  it('Should check for special characters', () => {
    const withSpecialChar = hasSpecialChar('John_1$');
    const withoutSpecialChar = hasSpecialChar('John_1');

    assert.equal(withSpecialChar, true);
    assert.equal(withoutSpecialChar, false);
  });

  it('Should check if name already exists', () => {
    const mockUsersStore: string[] = ['John', 'Jane'];
    const newUnvalidUsername = 'John';
    const newValidUsername = 'John2';

    (usernames as jest.Mock).mockReturnValue(mockUsersStore);

    assert.equal(nameExist(newUnvalidUsername), true);
    assert.equal(nameExist(newValidUsername), false);
    assert.equal((usernames as jest.Mock).mock.calls.length, 2); // Mock func called twice.
  });
});

describe('Message helper function', () => {
  it('Should return an object with correct data', () => {
    const response: TMessage = messageObj(mockName, mockMsg);
    const currentTime: string = (new Date()).toLocaleTimeString().slice(0, 5);

    assert.isObject(response);
    assert.hasAllKeys(response, ['author', 'time', 'message']);
    assert.equal(response.author, mockName);
    assert.equal(response.time, currentTime);
    assert.equal(response.message, mockMsg);
  });
});

describe('Users helper functions', () => {
  it('Should return correct array of usernames after storing data', () => {
    let users: string[] = storeUser({ id: '1', username: 'John' });

    assert.isArray(users);
    assert.sameMembers(users, ['John']);

    users = storeUser({ id: '2', username: 'Sara' });
    assert.lengthOf(users, 2);
    assert.sameMembers(users, ['John', 'Sara']);
  });

  it('Should return correct array of usernames after removal of data', () => {
    const users: string[] = removeUser('1');

    assert.lengthOf(users, 1);
    assert.sameMembers(users, ['Sara']);
  });
});
