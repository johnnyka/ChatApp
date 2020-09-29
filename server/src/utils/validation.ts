import { usernames } from './users';

export const hasSpecialChar = (username: string): boolean => /\W/.test(username);

export const nameExist = (username: string): boolean => {
  const allUsers = usernames();
  return allUsers.some((name) => new RegExp(username, 'i').test(name));
};
