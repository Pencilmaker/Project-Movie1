const moviesContainer = document.getElementById('movies');

// URL에서 검색어를 가져옵니다.
const searchParams = new URLSearchParams(window.location.search);
const searchTerm = searchParams.get('searchinput');

// 검색 결과를 표시하는 함수 호출
searchMovies(searchTerm);

async function searchMovies(searchTerm) {
  const apiKey = 'dfcdb12192ff1bc68ebd64bb5f86f67e'; // 여기에 발급받은 API Key를 입력합니다.
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${searchTerm}`; // TMDB API에서 검색하는 URL을 생성합니다.

  try {
    const response = await fetch(url); // URL로 GET 요청을 보내고 응답을 기다립니다.
    const data = await response.json(); // 응답을 JSON으로 변환합니다.

    displayMovies(data.results); // 검색 결과를 출력합니다.
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = ''; // 이전 검색 결과를 지웁니다.

    movies.forEach(movie => {

      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const imgLinkElement = document.createElement('a');
      imgLinkElement.href = `http://localhost:9000/movie/movie?id=${movie.id}`;
      imgLinkElement.target = '_blank';

      const imgElement = document.createElement('img');
      imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      imgLinkElement.appendChild(imgElement);
      
      movieElement.appendChild(imgLinkElement);
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = movie.title;
      movieElement.appendChild(titleElement);

      imgLinkElement.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'movie/${movie.id}'); // 데이터를 보낼 URL 설정
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({ id: movie.id, title: movie.title, overview: movie.overview, poster_path: movie.poster_path })); // id 데이터 전송

        // alert(`Movie ID: ${movie.id}`); // 이미지 클릭 시 알림창
      });

      moviesContainer.appendChild(movieElement);
  });
}
