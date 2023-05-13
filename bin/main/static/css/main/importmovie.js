/* 슬라이드쇼 자동 변경을 위한 변수 및 함수 */
var currentSlide = 1;
var totalSlides = 5; // 전체 슬라이드 수

function showNextSlide() {
	var nextSlide = currentSlide + 1;
	if (nextSlide > totalSlides) {
		nextSlide = 1; // 마지막 슬라이드인 경우 첫 번째 슬라이드로 이동
	}

	var currentRadio = document.getElementById('item-' + currentSlide);
	var nextRadio = document.getElementById('item-' + nextSlide);

	currentRadio.checked = false;
	nextRadio.checked = true;

	currentSlide = nextSlide;
}

function showPreviousSlide() {
	var previousSlide = currentSlide - 1;
	if (previousSlide < 1) {
		previousSlide = totalSlides; // 첫 번째 슬라이드인 경우 마지막 슬라이드로 이동
	}

	var currentRadio = document.getElementById('item-' + currentSlide);
	var previousRadio = document.getElementById('item-' + previousSlide);

	currentRadio.checked = false;
	previousRadio.checked = true;

	currentSlide = previousSlide;
}

/* 일정 간격으로 슬라이드 변경 */
setInterval(showNextSlide, 5000);

// tmdb api
const apiKey = 'dfcdb12192ff1bc68ebd64bb5f86f67e';

/* section0 영화*/
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`)
	.then(response => response.json())
	.then(data => {
		const movies = data.results.slice(0, 5);
		const songsContainer = document.getElementById('songs');

		movies.forEach((movie, index) => {
			const songElement = document.createElement('label');
			songElement.classList.add('card');
			songElement.setAttribute('for', `item-${index + 1}`);
			songElement.setAttribute('id', `song-${index + 1}`);

			const imgLinkElement = document.createElement('a');
			imgLinkElement.href = `http://localhost:9000/movie/movie?movie_id=${movie.id}`;
			imgLinkElement.target = '_blank';

			const imgElement = document.createElement('img');
			imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
			imgElement.alt = movie.title;

			imgLinkElement.appendChild(imgElement);
			songElement.appendChild(imgLinkElement);
			songsContainer.appendChild(songElement);

			imgLinkElement.addEventListener('click', () => {
				fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=ko-KR`)
					.then(response => response.json())
					.then(movieData => {
						const xhr = new XMLHttpRequest();
						xhr.open('POST', 'movie/${movie.id}'); // 데이터를 보낼 URL 설정
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
					})
					.catch(error => {
						console.error('Error:', error);
					});
			});

		});
	})
	.catch(error => console.error(error));

/* section1 영화 */
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`)
	.then(response => response.json())
	.then(data => {
		const movies = data.results;
		const moviesContainer = document.getElementById('movies');

		movies.forEach(movie => {
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

			imgLinkElement.addEventListener('click', () => {
				fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=ko-KR`)
					.then(response => response.json())
					.then(movieData => {
						const xhr = new XMLHttpRequest();
						xhr.open('POST', 'movie/${movie.id}'); // 데이터를 보낼 URL 설정
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
					})
					.catch(error => {
						console.error('Error:', error);
					});
			});

			moviesContainer.appendChild(movieElement);
		});
	})
	.catch(error => {
		console.error('Error:', error);
	});

/* section2 영화 */
fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=1&region=KR`)
	.then(response => response.json())
	.then(data => {
		const movies = data.results;
		const moviesContainer = document.getElementById('toprate');

		movies.forEach(movie => {

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

			imgLinkElement.addEventListener('click', () => {
				fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=ko-KR`)
					.then(response => response.json())
					.then(movieData => {
						const xhr = new XMLHttpRequest();
						xhr.open('POST', 'movie/${movie.id}'); // 데이터를 보낼 URL 설정
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
					})
					.catch(error => {
						console.error('Error:', error);
					});
			});

			moviesContainer.appendChild(movieElement);
		});
	})
	.catch(error => {
		console.error('Error:', error);
	});