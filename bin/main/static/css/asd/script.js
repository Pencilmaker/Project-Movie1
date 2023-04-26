const apiKey = 'dfcdb12192ff1bc68ebd64bb5f86f67e';

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=2`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const moviesContainer = document.getElementById('movies');

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

      const releaseDateElement = document.createElement('p');
      releaseDateElement.textContent = `Release Date: ${movie.release_date}`;
      movieElement.appendChild(releaseDateElement);

      const idElement = document.createElement('p');
      idElement.textContent = `id: ${movie.id}`;
      movieElement.appendChild(idElement);

/*      const overviewElement = document.createElement('p');
      overviewElement.textContent = `Overview: ${movie.overview}`;
      movieElement.appendChild(overviewElement);*/

      imgLinkElement.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'movie/${movie.id}'); // 데이터를 보낼 URL 설정
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({ id: movie.id, title: movie.title, overview: movie.overview, poster_path: movie.poster_path })); // id 데이터 전송

        alert(`Movie ID: ${movie.id}`); // 이미지 클릭 시 알림창
      });

      moviesContainer.appendChild(movieElement);
    });
  })
  .catch(error => console.error(error));
