import axios from 'axios';

const apiUrl = '/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { $api };
