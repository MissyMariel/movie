const apiKey = '59cce6804530f5694ef1f7c260137749';
const apiUrl = 'https://api.themoviedb.org/3'; 
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; 

function fetchAndDisplayCarouselMovies() {
    fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.querySelector('.carousel-inner');
            carouselInner.innerHTML = ''; // Clear existing slides

            data.results.forEach((movie, index) => {
                const isActive = index === 0 ? ' active' : '';
                const slide = `
                    <div class="carousel-item${isActive}">
                        <img src="${imageBaseUrl}${movie.poster_path}" class="d-block w-100" alt="${movie.title}">
                    </div>
                `;
                carouselInner.innerHTML += slide;
            });

            // Initialize carousel to handle new items
            $('.carousel').carousel();
        });
}

// Function to fetch and display popular movies
function fetchPopularMovies() {
    fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const popularMoviesContainer = document.getElementById('popularMovies');
            popularMoviesContainer.innerHTML = ''; // Clear existing content

            data.results.forEach(item => {
                const itemElement = `
                    <div class="card mb-4" data-movie-id="${item.id}">
                        <img src="${imageBaseUrl}${item.poster_path}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                        </div>
                    </div>
                `;
                popularMoviesContainer.innerHTML += itemElement;
            });

            // Add event listeners to movie cards
            document.querySelectorAll('#popularMovies .card').forEach(card => {
                card.addEventListener('click', () => {
                    const movieId = card.getAttribute('data-movie-id');
                    showMovieEmbed(movieId);
                });
            });
        });
}

// Function to fetch and display TV series
function fetchTVSeries() {
    fetch(`${apiUrl}/tv/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const tvSeriesContainer = document.getElementById('tvSeriesList');
            tvSeriesContainer.innerHTML = ''; // Clear existing content

            data.results.forEach(item => {
                const itemElement = `
                    <div class="card mb-4" data-movie-id="${item.id}">
                        <img src="${imageBaseUrl}${item.poster_path}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                        </div>
                    </div>
                `;
                tvSeriesContainer.innerHTML += itemElement;
            });

            document.querySelectorAll('#tvSeriesList .card').forEach(card => {
                card.addEventListener('click', () => {
                    const movieId = card.getAttribute('data-movie-id');
                    showMovieEmbed(movieId);
                });
            });
        });
}

function searchMovies(query) {
    fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            const searchResultsContainer = document.getElementById('searchResults');
            searchResultsContainer.innerHTML = ''; 

            if (data.results.length === 0) {
                searchResultsContainer.innerHTML = '<p>No results found.</p>';
            } else {
                data.results.forEach(item => {
                    const itemElement = `
                        <div class="card mb-4" data-movie-id="${item.id}">
                            <img src="${imageBaseUrl}${item.poster_path}" class="card-img-top" alt="${item.title}">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                            </div>
                        </div>
                    `;
                    searchResultsContainer.innerHTML += itemElement;
                });

                document.querySelectorAll('#searchResults .card').forEach(card => {
                    card.addEventListener('click', () => {
                        const movieId = card.getAttribute('data-movie-id');
                        showMovieEmbed(movieId);
                    });
                });
            }

            document.getElementById('popularMovies').style.display = 'none';
            document.getElementById('tvSeriesList').style.display = 'none';
            document.querySelector('.carousel').style.display = 'none';
            document.getElementById('searchResults').style.display = 'flex'; 
            document.getElementById('videoEmbed').style.display = 'none'; 
        });
}

function showMovieEmbed(movieId) {
    const videoEmbed = document.getElementById('videoEmbed');
    const iframe = videoEmbed.querySelector('iframe');

    // Construct the embed URL with the movie ID
    iframe.src = `https://vidsrc.xyz/embed/movie/${movieId}`;
    videoEmbed.style.display = 'block'; 

    // Hide other elements
    document.getElementById('popularMovies').style.display = 'none'; 
    document.getElementById('tvSeriesList').style.display = 'none'; 
    document.querySelector('.carousel').style.display = 'none'; 
    document.getElementById('searchResults').style.display = 'none'; 
}

// Event listeners for navigation
document.getElementById('home').addEventListener('click', () => {
    fetchAndDisplayCarouselMovies();
    fetchPopularMovies();
    fetchTVSeries();
    document.getElementById('searchResults').innerHTML = ''; 
    document.getElementById('popularMovies').style.display = 'flex'; 
    document.getElementById('tvSeriesList').style.display = 'flex'; 
    document.querySelector('.carousel').style.display = 'flex'; 
    document.getElementById('searchResults').style.display = 'none'; 
    document.getElementById('videoEmbed').style.display = 'none'; 
});

document.getElementById('popular').addEventListener('click', () => {
    fetchPopularMovies();
    document.getElementById('searchResults').innerHTML = ''; 
    document.getElementById('popularMovies').style.display = 'flex'; 
    document.getElementById('tvSeriesList').style.display = 'none'; 
    document.querySelector('.carousel').style.display = 'none'; 
    document.getElementById('videoEmbed').style.display = 'none'; 
});

document.getElementById('tv-series').addEventListener('click', () => {
    fetchTVSeries();
    document.getElementById('searchResults').innerHTML = ''; 
    document.getElementById('popularMovies').style.display = 'none'; 
    document.getElementById('tvSeriesList').style.display = 'flex'; 
    document.querySelector('.carousel').style.display = 'none'; 
    document.getElementById('videoEmbed').style.display = 'none'; 
});

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) {
        searchMovies(query);
    }
});

fetchAndDisplayCarouselMovies();
fetchPopularMovies();
fetchTVSeries();
