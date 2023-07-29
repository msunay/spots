import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function getLondonSpots() {
  return await axios.get(`${baseURL}/london`);
}