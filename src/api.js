// api.js
import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000' // ou a URL do seu servidor
});

export default api;

