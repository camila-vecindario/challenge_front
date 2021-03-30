import { postData } from '../helpers/client';

export async function login(email = '', password = '') {
  const url = '/auth/login';
  return postData(url, { email, password });
}

export async function signUp(input) {
  return postData('/users', input);
}
