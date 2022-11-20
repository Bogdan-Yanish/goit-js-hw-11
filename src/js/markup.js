import { refs } from './refs';
import { lightbox } from './simple_lightbox';

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

export { showListImg };