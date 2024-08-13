import {jwtDecode} from 'jwt-decode';

const isTokenExpired = () => {
    const tokenData = JSON.parse(localStorage.getItem('token'));
    if (!tokenData || !tokenData.expiry) {
        return true;
    }
    const currentTime = new Date().getTime();
    return currentTime > tokenData.expiry;
};

const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }
};

export {isTokenExpired, decodeToken}