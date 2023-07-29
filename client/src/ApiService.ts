import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function getLondonSpots() {
  const response = await axios.get(`${baseURL}/london`);
  return response.data;
}