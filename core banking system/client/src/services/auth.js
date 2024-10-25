import api from './api';
import Cookies from 'js-cookie';

export const login = async (email, password) => {
  try {
    return await api.post('/auth/login', { email, password });
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const register = async (account_number, username, email, password) => {
  try {
    return await api.post('/auth/signup', { account_number, username, email, password });
  } catch (error) {
    console.error('Register error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const account_summary = async (userId) => {
  try {
    return await api.get(`http://localhost:8800/accounts_summary?customer_id=${userId}`);
  } catch (error) {
    console.error('Account summary error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logout = async (token) => {
  try {
    console.log('Deleting all cookies');
    const allCookies = Cookies.get();
    
    for(let cookie in allCookies) {
      Cookies.remove(cookie);
    }

    console.log('Clearing local storage');
    localStorage.clear();

    return await api.post('/logout', { token });
  } catch (error) {
    console.error('Logout error:', error.response ? error.response.data : error.message);
    throw error;
  }
};