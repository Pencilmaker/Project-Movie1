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

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results.slice(0, 5);
    const infoareasContainer = document.getElementById('test');

    movies.forEach((movie, index) => {
      const songareaContainer = document.createElement('label');
      songareaContainer.classList.add('song-info');
      songareaContainer.setAttribute('id', `song-info-${index + 1}`);

      const titleLinkElement = document.createElement('a');
      titleLinkElement.href = `http://localhost:9000/movie/movie?id=${movie.id}`;
      titleLinkElement.target = '_top';

      const titleElement = document.createElement('div');
      titleElement.classList.add('title');
      titleElement.textContent = movie.title;
      
      titleLinkElement.appendChild(titleElement);
      songareaContainer.appendChild(titleLinkElement);

      const subtitleContainer = document.createElement('div');
      subtitleContainer.classList.add('sub-line');

      const subtitleElement = document.createElement('div');
      subtitleElement.classList.add('subtitle');
      subtitleElement.textContent = "subtitle";

      const timeElement = document.createElement('div');
      timeElement.classList.add('time');
      timeElement.textContent = "4.05";
      
      titleLinkElement.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost:9000/movie/${movie.id}`); // 데이터를 보낼 URL 설정
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({ id: movie.id, title: movie.title, overview: movie.overview, poster_path: movie.poster_path })); // id 데이터 전송

        /*alert(`Movie ID: ${movie.id}`); // 이미지 클릭 시 알림창*/
      });      

      subtitleContainer.appendChild(subtitleElement);
      subtitleContainer.appendChild(timeElement);

      songareaContainer.appendChild(subtitleContainer);

      infoareasContainer.appendChild(songareaContainer);
    });
  })
  .catch(error => console.error(error));

  