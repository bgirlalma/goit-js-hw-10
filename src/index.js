
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import { loader } from './js/cat-api.js';

const errorMessange = document.querySelector('.error');

let chosenBred = null;
let breeds = [];

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

  breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;
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
          <img src="${cat.url}" alt="${catBreed.name}">
        </div>
      </div>
    `;
  }

  
 



