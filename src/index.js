import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_rGPKsQNFaacf8ZKwo4FD76u3IIWhtdVGl17jsI1TgH9EBdH5SU9vWjNnqx35oYJz";

import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

 fetchBreeds()
 .then(breeds => {
    loader.style.display = 'none';
    console.log(breeds); 
  })
  .catch(error => {
    loader.style.display = 'none';
    console.error(error);
  });

  const breedSelect = document.querySelector('.breed-select');
  breedSelect.addEventListener('change', function () {
    const selectedBreedId = this.value;
    loader.style.display = 'block';

    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        loader.style.display = 'none';
        console.log(catData); 
      })
      .catch(error => {
        loader.style.display = 'none';
        console.error(error);
      });
  });



