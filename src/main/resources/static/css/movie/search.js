const apiKey = 'dfcdb12192ff1bc68ebd64bb5f86f67e'; // 여기에 발급받은 API Key를 입력합니다.

const form = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // 폼이 제출될 때 기본 동작을 막습니다.
  const searchTerm = searchInput.value; // 검색어를 가져옵니다.
  searchMovies(searchTerm); // 검색어를 기반으로 영화를 검색합니다.
});

async function searchMovies(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${searchTerm}`; // TMDB API에서 검색하는 URL을 생성합니다.
  const response = await fetch(url); // URL로 GET 요청을 보내고 응답을 기다립니다.
  const data = await response.json(); // 응답을 JSON으로 변환합니다.
  displayMovies(data.results); // 검색 결과를 출력합니다.
}

function displayMovies(movies) {
  moviesContainer.innerHTML = ''; // 이전 검색 결과를 지웁니다.
  movies.forEach((movie) => {
    const movieElement = document.createElement('div'); // 각 영화 정보를 담을 div 요소를 생성합니다.
    movieElement.classList.add('movie');
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // 포스터 이미지 URL을 생성합니다.
    const movieContent = `
      <img src="${imageUrl}">
      <h2>${movie.title}</h2>
      <p>${movie.release_date}</p>
    `; // 영화 제목, 개봉일, 포스터 이미지로 구성된 HTML을 작성합니다.
    movieElement.innerHTML = movieContent;
    moviesContainer.appendChild(movieElement); // 생성한 div 요소를 moviesContainer에 추가합니다.
  });
}
