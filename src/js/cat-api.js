import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'

export const loader = document.querySelector('.loader');

const breedEl = document.querySelector('.breed-select');
const errorEl = document.querySelector('.error');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_rGPKsQNFaacf8ZKwo4FD76u3IIWhtdVGl17jsI1TgH9EBdH5SU9vWjNnqx35oYJz'

let chosenBred = null;
let breeds = [];
let slimSelect =  new SlimSelect({
    select: '.breed-select',
    placeholder: 'Loading breeds...',
    allowDeselect: true,
    showFirstOption: false,
    onChange: info => {
        let selectedBreed = info[0].value;
        if (selectedBreed) {
          fetchCatByBreed(selectedBreed);
    }
    },
});

errorEl.style.display = 'none';

function createBreedsMarkup(items){
    slimSelect.setData([{text: '', value: ''}].concat(items.map(item =>{
        return {text: item.name, value: item.id}
    })))
};

export function fetchBreed() {
    loader.style.display = 'block';
    fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(response => {
if(!response.ok){
    Notify.failure(`${errorEl.textContent}`)
}
return response.json()
    }).then(data => {
        breeds = data;
        createBreedsMarkup(data);
        loader.style.display = 'none';
    }).catch(error =>{
        console.log(error);
        loader.style.display = 'none';
    })
};

 export function fetchCatByBreed(breedId){
  if(!breedId) {
    return;
  }
  fetch(`${BASE_URL}images/search?breed_ids=${breedId}`)
  .then(response => {
    if (!response.ok) {
      Notify.failure('Котик не знайдений');
    }
    return response.json();
  }).then(data => {
    breedEl.innerHTML = createCatInfo(data, breedId);
    loader.style.display = 'none';
  }).catch(error => {
    Notify.failure("this cat wasn't found :(", 'okay');
    console.log(error);
    loader.style.display = 'none';
  })

}

breedEl.addEventListener('change', e => {
    e.preventDefault()
    chosenBred = e.target.value;
    if(chosenBred){
        fetchCatByBreed(chosenBred);
    }
});

function  getBreedById(id){
    return breeds.find(breedId=> breedId.id === id);
};

function createCatInfo(catData, id){
    const cat = catData[0];
    const catBreed = getBreedById(id);
    return `<div class="cat-info-container">
    <div class="cat-text">
      <h2>${catBreed.name}</h2>
      <p>${catBreed.temperament}</p>
      <p>${catBreed.description}</p>
    </div>
    <div class="cat-image">
      <img src="${cat.url}" alt="${catBreed.name}">
    </div>
  </div>`;
}

