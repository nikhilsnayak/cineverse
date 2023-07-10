const AUTH_TOKEN = process.env.AUTH_TOKEN

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'

export async function loadMovies(url) {
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

    const cardContainer = document.querySelector('.card-container');

    cardContainer.innerHTML = '';

    movies.forEach((movie) => {
        if (movie.poster_path === null) {
            return
        }

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <img class="poster" src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}"/>
        <h3 class="title">${movie.title}</h3>
        <p class="release-date">${movie.release_date}</p>
        <span class="rating">${movie.vote_average}</span>
        `

        card.addEventListener('click', async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options);
            const data = await response.json();
            console.log(response);
        })

        cardContainer.appendChild(card);
    })

}




