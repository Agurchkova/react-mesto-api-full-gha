import { _checkResponse, BASE_URL } from './utils';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const registerSignUp = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => _checkResponse(res));
};

export const authorizeSignIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => _checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => _checkResponse(res));
};
