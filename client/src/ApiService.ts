import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function getLondonSpots() {
  await axios.get(`${baseURL}/london`).then(spots => {
    console.log(spots);
  })

}