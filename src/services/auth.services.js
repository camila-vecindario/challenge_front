export async function login(email = '', password = '') {
  const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    'Content-Type': 'application/json',
    Accept: '*/*',
  });
  console.log(response);
  const data = await response.json();

  if (response.status === 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}

export async function signUp(input) {
  const response = await fetch('', {
    method: 'POST',
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (response.status === 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}
