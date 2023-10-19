import axios from 'axios';

const baseURL = 'https://gestor-dsi-produccion2-production.up.railway.app/api';
const adminProy = axios.create({
  baseURL,
});

export default adminProy;