import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import slimSelect from 'slim-select';
import 'slim-select/styles';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.select-wrapper');
  const showBreedSelect = () => breedSelect.classList.remove('hide');
  const hideBreedSelect = () => breedSelect.classList.add('hide');

  const loader = document.querySelector('.loader-wrapper');
  const showLoader = () => loader.classList.remove('hide');
  const hideLoader = () => loader.classList.add('hide');

  const catInfo = document.querySelector('.cat-info');
  const showCatInfo = () => catInfo.classList.remove('hide');
  const hideCatInfo = () => catInfo.classList.add('hide');

  const showError = () => iziToast.error({
    title: 'Error',
    message: 'An error occurred. Please try again later.',
    position: 'topRight',
  });

  const populateBreeds = (breeds) => {
    const data = breeds.map(breed => ({ text: breed.name, value: breed.id }));

    new slimSelect({
      select: '#breed-select',
      placeholder: 'Select a breed',
      searchPlaceholder: 'Search a breed',
      data,
      events: {
        afterChange: newVal => getCatInfo(newVal[0].value),
      },
    });

    showBreedSelect();
  };

  const getCatInfo = id => {
    if (id) {
      hideCatInfo();
      showLoader();
      hideBreedSelect();
      fetchCatByBreed(id)
        .then(cat => {
          hideLoader();
          showBreedSelect();
          displayCatInfo(cat);
        })
        .catch(() => {
          hideLoader();
          showError();
        });
    }
  };

  const displayCatInfo = cat => {
    const breed = cat.breeds[0];
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${breed.name}" />
      <div class="details">
        <h2 class="title">${breed.name}</h2>
        <p class="description">${breed.description}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
      </div>
    `;
    showCatInfo();
  };

  showLoader();

  fetchBreeds()
    .then(breeds => {
      populateBreeds(breeds);
      hideLoader();
    })
    .catch(() => {
      hideLoader();
      showError();
    });
});
