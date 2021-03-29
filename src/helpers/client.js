import authHeader from '../helpers/auth-header';

export async function getData(url, abortController) {
  const response = await fetch(`${process.env.REACT_APP_SERVER}${url}`, {
    signal: abortController?.signal,
    headers: authHeader(),
  });

  const data = await response.json();

  if (response.status === 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}
