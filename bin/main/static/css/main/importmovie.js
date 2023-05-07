const apiKey = 'dfcdb12192ff1bc68ebd64bb5f86f67e';

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

      const imgElement = document.createElement('img');
      imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      imgElement.alt = movie.title;

      songElement.appendChild(imgElement);

      songsContainer.appendChild(songElement);
    });
  })
  .catch(error => console.error(error));

/*fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`)
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

      imgLinkElement.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'movie/${movie.id}'); // 데이터를 보낼 URL 설정
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({ id: movie.id, title: movie.title, overview: movie.overview, poster_path: movie.poster_path })); // id 데이터 전송

        // alert(`Movie ID: ${movie.id}`); // 이미지 클릭 시 알림창
      });

      moviesContainer.appendChild(movieElement);
    });
  })*/
  
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`)
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
                  id: movie.id,
                  title: movie.title,
                  overview: movie.overview,
                  poster_path: movie.poster_path
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

  
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=1&region=KR`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const moviesContainer = document.getElementById('toprate');

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
  })
  
  .catch(error => console.error(error));