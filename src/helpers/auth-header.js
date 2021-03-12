const authHeader = (contentType='application/json', user) => {
    if (user && user.token) {
        return new Headers({ 'Authorization': 'Bearer ' + user.token, 'Content-Type': contentType });
    } else {
        return new Headers({ 'Content-Type': contentType });
    }
}

export default authHeader;