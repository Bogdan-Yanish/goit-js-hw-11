import axios from 'axios';

export default class API {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getImg() {
    const BASE_URL = `https://pixabay.com/api/`;
    const KEY = `31340613-a91609b1a3c337874966c6d08`;
    const OPTION = `image_type=photo&orientation=horizontal&safesearch=true&`;
    
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&${OPTION}&page=${this.page}&per_page=40`
    );
    const  imgItems = await response.data;
    return imgItems;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
