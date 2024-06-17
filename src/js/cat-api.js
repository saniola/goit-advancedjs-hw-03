const API_KEY = 'live_qfpFZuQ1otKVFKxl4WKh5WQKamlGxuK4LMaKO1lHDDzVK00ThJZEjFtnx98ZGrG5';
const BASE_URL = 'https://api.thecatapi.com/v1';

export const fetchBreeds = () => {
  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY
    }
  })
  .then(response => response.json());
};

export const fetchCatByBreed = (breedId) => {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY
    }
  })
  .then(response => response.json())
  .then(data => data[0]);
};
