import { TUser } from './types';

let usersStore: TUser[] = [];

export const usernames = (): string[] => usersStore.map((user) => user.username);

export const storeUser = (user: { id: string, username: string }): string[] => {
  usersStore = [...usersStore, user];
  return usernames();
};

export const getUser = (id: string): TUser => {
  if (usersStore !== []) return usersStore.filter((user) => user.id === id)[0];
  return { id: '', username: '' };
};

export const removeUser = (id: string): string[] => {
  usersStore = usersStore.filter((user) => user.id !== id);
  return usernames();
};
