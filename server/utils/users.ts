import { TUser } from './types';

let usersStore: TUser[] = [];

export const usernames = (): string[] => usersStore.map((user) => user.username);

export const storeUser = (user: { id: string, username: string }): string[] => {
  usersStore = [...usersStore, user];
  return usernames();
};

export const getUser = (id: string): TUser | undefined => {
  return usersStore.find(user => user.id === id);
};

export const removeUser = (id: string): string[] => {
  usersStore = usersStore.filter(user => user.id !== id);
  return usernames();
};
