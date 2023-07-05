import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_rGPKsQNFaacf8ZKwo4FD76u3IIWhtdVGl17jsI1TgH9EBdH5SU9vWjNnqx35oYJz";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const loader = document.querySelector('.loader');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_rGPKsQNFaacf8ZKwo4FD76u3IIWhtdVGl17jsI1TgH9EBdH5SU9vWjNnqx35oYJz'
function fetchBreeds() {
  loader.style.display = 'none';
 return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(response => {
  if(!response.ok){
    Notify.failure(`${error.textContent}`);
  }
  return response.json()
 })
}

function fetchCatByBreed(breedId) {
  loader.style.display = 'none';
  const url = `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  return axios.get(url)
  .then(response => response.data)
}
export { fetchBreeds, fetchCatByBreed };




