import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_rGPKsQNFaacf8ZKwo4FD76u3IIWhtdVGl17jsI1TgH9EBdH5SU9vWjNnqx35oYJz";

import { fetchBreed } from './js/cat-api.js';
fetchBreed();

import { fetchCatByBreed } from './js/cat-api.js';
fetchCatByBreed();

import { loader } from "./js/cat-api.js";
window.onload = function () {
    loader.style.display = 'block';
};

