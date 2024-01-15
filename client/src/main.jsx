import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/app.css';

axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  return config;
}, (error) => Promise.reject(error));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
