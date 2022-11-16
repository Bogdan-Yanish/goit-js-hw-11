import './css/styles.css';

import 'regenerator-runtime/runtime';
import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const BASE_URL = 'https://pixabay.com/api/'
const KEY = '?key=31340613-a91609b1a3c337874966c6d08&'
async function getPhotos(params) {
    try {
        const response = await axios.get(`${BASE_URL}${KEY}q=yellow+flowers&image_type=photo`);
        const photoItems = response.data;
        console.log(`GET: Photos from Pixabay`, photoItems);
        return photoItems;
        } catch (errors) {
        console.error(errors);
        }
}  

getPhotos();

