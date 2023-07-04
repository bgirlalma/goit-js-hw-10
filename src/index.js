
import { fetchBreeds, fetchCatByBreed, loader, error } from './js/cat-api.js';

import SlimSelect from 'slim-select'

new SlimSelect({
  select: '#selectElement',
  allowDeselect: true,
  showFirstOption: false,
})

import { Notify } from 'notiflix/build/notiflix-notify-aio';
fetchBreeds()

  .then(breedsData => {
    loader.style.display = 'none';
    breeds = breedsData;
    const breedSelect = document.querySelector('.breed-select');
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
      
  })
  .catch(error => {
    loader.style.display = 'none';
    console.error(error);
  });
const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  loader.style.display = 'block';
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      loader.style.display = 'none';
      const catInfo = createCatInfo(catData, selectedBreedId);
      catInfoDiv.innerHTML = catInfo;
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error(error);
    });
});

function getBreedById(id) {
  return breeds.find(breed => breed.id === id);
}

  function createCatInfo(catData, id) {
    const cat = catData[0];
    const catBreed = getBreedById(id);
    return `
      <div class="cat-info-container">
        <div class="cat-text">
          <h2>${catBreed.name}</h2>
          <p>${catBreed.temperament}</p>
          <p>${catBreed.description}</p>
        </div>
        <div class="cat-image">
          <img src="${cat.url}" alt="${catBreed.name}" width="500">
        </div>
      </div>
    `;
  }

  
 



