const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzkzYzIwYjY0YjBjZGRmNWRjYTE2MmQyYzIzMDg4NSIsInN1YiI6IjY0YWExYTYyNjZhMGQzMDBlMzczN2Y0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3r5Y9X7SpVH27e2pAeKKU4h-WVK_mu1Zrt3MlRtGURo'

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'
const cardContainer = document.querySelector('.card-container');
const cardTemplate = document.getElementById('card-template');

export async function loadMovies(url, rewrite, heading) {

    try {

        if (rewrite) {
            document.querySelector('h1').innerHTML = '<div class="skeleton skeleton-text"></div>'
            cardContainer.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                cardContainer.append(cardTemplate.content.cloneNode(true))
            }
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${AUTH_TOKEN}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();

        const movies = data.results;

        if (rewrite) {
            cardContainer.innerHTML = '';
            document.querySelector('h1').textContent = heading;
        }
        

        movies.forEach((movie) => {
            if (movie.poster_path === null) {
                return
            }

            const card = cardTemplate.content.cloneNode(true);
            card.querySelector('img').src = IMG_BASE_URL + movie.poster_path;
            card.querySelector('img').alt = IMG_BASE_URL + movie.title;
            card.querySelector('.title').textContent = movie.title;
            card.querySelector('.release-date').textContent = movie.release_date;
            card.querySelector('.rating').textContent = movie.vote_average;
            cardContainer.append(card);
        })

    } catch (error) {
        console.log(error);
    }


}




