import authHeader from "../helpers/auth-header";

export async function login(email = '', password = '') {
  const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();

  if (response.status === 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}

export async function signUp(input) {
  const response = await fetch('', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (response.status === 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}
