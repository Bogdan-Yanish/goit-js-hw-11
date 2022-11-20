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

  refs.galleryWrap.innerHTML = '';
  gallery.resetPage();
  getImg();

  const response = await gallery.getImg();
  const { hits, totalHits } = response;

  if (hits.length > 0) {
      Notify.success(`Hooray! We found ${totalHits} images`);
    }
}

function onLoadMore() {

  try {
    gallery.incrementPage();
    Loading.arrows();
    getImg();
    Loading.remove();
  } catch (error) {
    Notify.failure('Error')
    gallery.resetPage();
  }  
}

async function getImg() {
  refs.loadMoreBtn.classList.add('is-hidden');

  const response = await gallery.getImg();
  const { hits, totalHits } = response;

  if (!hits.length) {
    Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
    );
  } 
    
  showListImg(hits);
  smoothScroll();
    
  isShow += hits.length;
  if (isShow < totalHits) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }; 
  
  if (isShow > totalHits) {
    Notify.info(
      'We re sorry, but you have reached the end of search results.'
    );
  }
}




  

  
  

