const authHeader = (contentType = 'application/json') => {
  const token = localStorage.getItem('token');
  if (token) {
    return new Headers({ Authorization: 'Bearer ' + token, 'Content-Type': contentType });
  } else {
    return new Headers({ 'Content-Type': contentType });
  }
};

export default authHeader;
