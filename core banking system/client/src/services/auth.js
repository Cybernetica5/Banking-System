import api from './api';
import Cookies from 'js-cookie';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (account_number, username, email, password) => {
  return api.post('/auth/signup', { account_number, username, email, password });
};

export const account_summary = (userId) => {
return api.get(`http://localhost:8800/accounts_summary?customer_id=${userId}`);
}


export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  Cookies.remove('userId');

  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  // localStorage.removeItem('token');
};