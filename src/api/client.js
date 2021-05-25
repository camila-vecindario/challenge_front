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

export async function postData(url, body) {
  const response = await fetch(`${process.env.REACT_APP_SERVER}${url}`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (response.status === 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}

export async function postFormData(url, body) {
  const formData = new FormData();
  Object.keys(body).forEach(key => {
    formData.append(key, body[key]);
  });

  const response = await fetch(`${process.env.REACT_APP_SERVER}${url}`, {
    method: 'POST',
    headers: authHeader('multipart/form-data'),
    body: formData,
  });
  console.log(response);
  const data = await response.json();

  if (response.status === 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}
