import { ADMIN, CLIENT, HOST } from '../constants/userConstants';

export const formatCurrency = (price = 0) => {
  return new Intl.NumberFormat('es-CO').format(price);
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = key => {
  localStorage.removeItem(key);
};

export const resolveUserRole = () => {
  const user = JSON.parse(getFromLocalStorage('user'));
  const token = getFromLocalStorage('token');
  const role = user && token ? (user.isAdmin ? ADMIN : CLIENT) : HOST;

  return role;
};

export const signOut = () => {
  removeFromLocalStorage('token');
  removeFromLocalStorage('user');
};

export const redirect = (path = '') => {
  window.location.href = path;
};
