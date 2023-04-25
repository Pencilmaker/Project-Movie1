const apiKey = 'dfcdb12192ff1bc68ebd64bb5f86f67e';
const moviesContainer = document.getElementById('movies');

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results.slice(0, 5); // 인기 영화 상위 5개만 가져오기

    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const imgElement = document.createElement('img');
      imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      movieElement.appendChild(imgElement);

      const titleElement = document.createElement('h2');
      titleElement.textContent = movie.title;
      movieElement.appendChild(titleElement);

      const releaseDateElement = document.createElement('p');
      releaseDateElement.textContent = `Release Date: ${movie.release_date}`;
      movieElement.appendChild(releaseDateElement);

      moviesContainer.appendChild(movieElement);
    });
  })
  .catch(error => console.error(error));