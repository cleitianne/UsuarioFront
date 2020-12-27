import axios from 'axios';

const baseURL = 'http://10.0.2.2:5000/';
const api = axios.create({ baseURL });

export default api;