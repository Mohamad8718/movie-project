function searchActive(value) {
  const input = document.querySelector(".nav__input");
  input.focus();
}

async function searchBarEnter(event) {
  let value = document.querySelector(".nav__input").value;
  const input = document.querySelector(".nav__input");

  if (event.key == "Enter") {
    if (input === document.activeElement) {
      searchResult(value);
      await moviesSearch(value);
      setTimeout(() => loadingDone(), 1000);
    }
    value = document.querySelector(".movie__input").value;
    searchResult(value);
    await moviesSearch(value);
    setTimeout(() => loadingDone(), 1000);
  }
}

async function searchBarClick() {
  const value = document.querySelector(".movie__input").value;

  searchResult(value);
  await moviesSearch(value);
  setTimeout(() => loadingDone(), 1000);
}

function searchResult(value) {
  const searchBar = document.querySelector(".movies__search__result");

  const searchResult = document.querySelector(".movie__search__result");

  const searchBarHTML = `<h2 class="movies__title">
  Search results for:
  </h2>
  <h2 class="movie__search__result">"${value}"</h2>`;

  searchBar.innerHTML = searchBarHTML;

  searchBar.classList.add("movie__search__result__visible");
}

async function moviesSearch(value) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=739fd3c2&s=${value}`,
  );

  const searchResults = await response.json();

  const array = await searchResults.Search.slice(0, 6);

  const movies = document.querySelector(".movies__list");

  const moviesHTML = array
    .map(
      (movie) =>
        `<div class="movie movie__invisible">
                <figure class="movie__image__wrapper">
                  <img
                    src="${movie.Poster}"
                    alt=""
                    class="movie__image"
                  />
                  <h3 class="movie__info__title">
                    ${movie.Title}
                  </h3>
                  <div class="movie__info__list">
                    <div class="movie__info">
                      <i class="fa-solid fa-clock movie__info__icon"></i>
                      <p class="movie__info__text">136m</p>
                    </div>
                    <div class="movie__info">
                      <i class="fa-solid fa-star movie__info__icon"></i>
                      <p class="movie__info__text">4.5</p>
                    </div>
                    <div class="movie__info">
                      <i
                        class="fa-solid fa-earth-americas movie__info__icon"
                      ></i>
                      <p class="movie__info__text">English</p>
                    </div>
                  </div>
                </figure>
                <h4 class="movie__title">${movie.Title}</h4>
              </div>`,
    )
    .join("");

  movies.innerHTML =
    `<i class="fa-solid fa-spinner movies__list__loading movies__list__loading__visible"></i>` +
    moviesHTML;
}

function loadingDone() {
  const targetMovie = document.querySelectorAll(".movie");

  const targetLoading = document.querySelector(".movies__list__loading");

  targetLoading.classList.remove("movies__list__loading__visible");
  targetMovie.forEach((movie) => movie.classList.remove("movie__invisible"));
}
