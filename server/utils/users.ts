import { TUser } from './types';

let users: TUser[] = [];

export const usernames = (): string[] => users.map((user) => user.username);

export const storeUser = (user: { id: string, username: string }): string[] => {
  users = [...users, user];
  return usernames();
};
