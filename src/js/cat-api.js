import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_rGPKsQNFaacf8ZKwo4FD76u3IIWhtdVGl17jsI1TgH9EBdH5SU9vWjNnqx35oYJz';
axios.defaults.headers.common['x-api-key'] = API_KEY;
export const loader = document.querySelector('.loader');
function fetchBreeds() {
  loader.style.display = 'none';
  const url = `${BASE_URL}breeds`;
  return axios.get(url).then(response => {
    if (response.status < 200 || response.status >= 300) {
      Notify.failure('Error fetching breeds');
    }
    return response.data;
  });
}
function fetchCatByBreed(breedId) {
  loader.style.display = 'none';
  const url = `${BASE_URL}images/search?breed_ids=${breedId}`;
  return axios.get(url).then(response => response.data);
}
export { fetchBreeds, fetchCatByBreed };





