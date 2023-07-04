
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import { loader } from './js/cat-api.js';

const error = document.querySelector('.error');

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



