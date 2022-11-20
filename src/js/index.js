import '../scss/main.css';

import { Notify } from 'notiflix';
import { Loading } from 'notiflix';
import { refs } from './refs';
import { smoothScroll } from './smoothscroll'
import { showListImg } from './markup';
import API from './api';

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
  isShow = 0;
  resetPage();
  
  refs.loadMoreBtn.classList.add('is-hidden');

  const response = await gallery.getImg();
  const { hits, totalHits } = response;

  showListImg(hits);

  isShow += hits.length;
  if (isShow < totalHits) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }; 

  if (!hits.length) {
    Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
    );
  } 

  if (hits.length > 0) {
      Notify.success(`Hooray! We found ${totalHits} images`);
    }
}

async function onLoadMore() {
  gallery.incrementPage();
  Loading.arrows();
  refs.loadMoreBtn.classList.add('is-hidden');

  const response = await gallery.getImg();
  const { hits, totalHits } = response;

  showListImg(hits);
  smoothScroll();
    
  isShow += hits.length;
  if (isShow < totalHits) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }; 
  
  if (isShow > totalHits) {
    Notify.success(
      'We re sorry, but you have reached the end of search results.'
    );
  }
  Loading.remove();
}

function resetPage() {
  refs.galleryWrap.innerHTML = '';
  gallery.resetPage();
}


  

  
  

