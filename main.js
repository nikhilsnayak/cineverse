import { navToggler } from "./scripts/navToggler";
import { cardScroller } from "./scripts/cardScroller";

import { loadMovies } from './scripts/loadMovies'

navToggler()
cardScroller()


const categorySelector = document.querySelector('select[name=categories]');
const regionSelector = document.querySelector('select[name=region]');

const searchBar = document.querySelector('#search-bar form')

let category = categorySelector.options[categorySelector.selectedIndex].value;
let region = regionSelector.options[regionSelector.selectedIndex].value;

document.querySelector('h1').innerText = categorySelector.options[categorySelector.selectedIndex].text
let url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&region=${region}`;

loadMovies(url)

async function changeMovies(url, heading) {
    document.querySelector('h1').innerText = heading
    document.getElementById('nav-toggle').click();
    await loadMovies(url);
    document.querySelector('.card-container').scrollLeft = 0;
}

const categoryChanger = async (e) => {
    if ((e.target.value === category) && !document.querySelector('h1').innerText.startsWith("Search Results for")) return
    category = e.target.value;
    url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&region=${region}`
    let heading = categorySelector.options[categorySelector.selectedIndex].text;
    await changeMovies(url, heading);
}

const regionChanger = async (e) => {
    if ((e.target.value === region) && !document.querySelector('h1').innerText.startsWith("Search Results for")) return
    region = e.target.value;
    url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&region=${region}`
    let heading = categorySelector.options[categorySelector.selectedIndex].text;
    await changeMovies(url, heading);
}

categorySelector.addEventListener("mousedown", categoryChanger);
categorySelector.addEventListener("change", categoryChanger);
regionSelector.addEventListener("mousedown", regionChanger);
regionSelector.addEventListener("change", regionChanger);

searchBar.addEventListener('submit', async (e) => {
    const input = searchBar.querySelector('input');
    e.preventDefault()
    const query = input.value;
    input.value = ''
    input.blur()
    if (query === '') return
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`
    let heading = `Search Results for "${query}"`;
    await changeMovies(url, heading);
})
