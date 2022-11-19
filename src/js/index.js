import '../scss/main.css';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';
import { lightbox } from './simple_lightbox';
import { smoothScroll } from './smoothscroll'

import API from './api';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryWrap: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let isShow = 0;

const gallery = new API();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.searchQuery.value;
  gallery.query = query;

  if (!query) {
    Notify.info('Please, enter search info');
    return;
  }
  refs.galleryWrap.innerHTML = '';
  gallery.resetPage();
  
  const response = await gallery.getImg();
  const { hits, totalHits, total } = response;

  if (!hits.length) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${totalHits} images`);
  }

  showListImg(hits);
  smoothScroll();

  if (isShow < total) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

async function onLoadMore() {
  gallery.incrementPage();
  refs.loadMoreBtn.classList.add('is-hidden');

  const response = await gallery.getImg();
  const { hits, total} = response;

  showListImg(hits);
  smoothScroll();

  isShow += hits.length;

  if (isShow >= total) {
    Notify.info(
      'We re sorry, but you have reached the end of search results.'
    );
  }

  if (isShow < total) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function showListImg(img) {
  const markup = img
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <a class="card" href="${largeImageURL}">
                <div class="card__container">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="card__info">
                        <p class="card__info-item">
                            <b>Likes</b>
                            <span class="card__item-count">${likes}</span>
                        </p>
                        <p class="card__info-item">
                            <b>Views</b>
                            <span class="card__item-count">${views}</span>
                        </p>
                        <p class="card__info-item">
                            <b>Comments</b>
                            <span class="card__item-count">${comments}</span>
                        </p>
                        <p class="card__info-item">
                            <b>Downloads</b>
                            <span class="card__item-count">${downloads}</span>
                        </p>
                    </div>
                </div>
            </a>`;
      }
    )
    .join('');

    refs.galleryWrap.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}


  

  
  

