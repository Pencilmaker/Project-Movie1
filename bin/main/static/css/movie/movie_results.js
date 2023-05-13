const apiKey = 'dfcdb12192ff1bc68ebd64bb5f86f67e'; // 여기에 발급받은 API Key를 입력합니다.

const moviesContainer = document.getElementById('movies');

// URL에서 검색어를 가져옵니다.
const searchParams = new URLSearchParams(window.location.search);
const searchTerm = searchParams.get('searchinput');

// 검색 결과를 표시하는 함수 호출
searchMovies(searchTerm);

async function searchMovies(searchTerm) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${searchTerm}`);
    const data = await response.json();
    const movies = data.results;

    for (const movie of movies) {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const imgLinkElement = document.createElement('a');
      imgLinkElement.href = `http://localhost:9000/movie/movie?movie_id=${movie.id}`;
      imgLinkElement.target = '_blank';

      const imgElement = document.createElement('img');
      imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      imgLinkElement.appendChild(imgElement);

      movieElement.appendChild(imgLinkElement);

      const titleElement = document.createElement('h2');
      titleElement.textContent = movie.title;
      movieElement.appendChild(titleElement);

      imgLinkElement.addEventListener('click', async () => {
        try {
          const movieDataResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=ko-KR`);
          const movieData = await movieDataResponse.json();

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `movie/${movie.id}`);
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          xhr.send(
            JSON.stringify({
              movie: {
                movie_id: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average
              },
              genre: movieData.genres.map(genre => ({
                movie_id: movie.id,
                genre_id: genre.id,
                genre_name: genre.name
              }))
            })
          );
        } catch (error) {
          console.error('Error:', error);
        }
      });

      moviesContainer.appendChild(movieElement);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
