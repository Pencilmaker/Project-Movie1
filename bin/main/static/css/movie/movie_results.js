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

      const imgElement = document.createElement('img');
      imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      imgLinkElement.appendChild(imgElement);

      movieElement.appendChild(imgLinkElement);

      const titleElement = document.createElement('h2');
      titleElement.textContent = movie.title;
      movieElement.appendChild(titleElement);

      imgLinkElement.addEventListener('click', async () => {
				fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=ko-KR`)
					.then(response => response.json())
					.then(movieData => {
						const xhr = new XMLHttpRequest();
						xhr.open('POST', `movie/${movie.id}`); // 데이터를 보낼 URL 설정
						xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

						fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=ko-KR`)
							.then(response => response.json())
							.then(creditsData => {
								const castLimited = creditsData.cast.slice(0, 10); // 배우 정보 개수를 10개로 제한
								xhr.onreadystatechange = function () {
									if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
										window.location.href = `http://localhost:9000/movie/movie?movie_id=${movie.id}`;
									}
								};
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
										})),
										cast: castLimited.map(cast => ({
											movie_id: movie.id,
											actor_id: cast.id,
											actor_name: cast.name,
											profile_path: cast.profile_path,
											movie_character: cast.character,
											character_order: cast.order
										}))
									})
								);
							})
							.catch(error => {
								console.error('Error:', error);
							});
					})
					.catch(error => {
						console.error('Error:', error);
					});
			});

      moviesContainer.appendChild(movieElement);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
