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

/*
	<label class="card" for="item-2" id="song-2">
      <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="song">
    </label>
*/

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results.slice(0, 5);
    const infoareasContainer = document.getElementById('test');

    movies.forEach((movie, index) => {
      const songareaContainer = document.createElement('label');
      songareaContainer.classList.add('song-info');
      songareaContainer.setAttribute('id', `song-info-${index + 1}`);

      const titleElement = document.createElement('div');
      titleElement.classList.add('title');
      titleElement.textContent = movie.title;

      const subtitleContainer = document.createElement('div');
      subtitleContainer.classList.add('sub-line');

      const subtitleElement = document.createElement('div');
      subtitleElement.classList.add('subtitle');
      subtitleElement.textContent = "";

      const timeElement = document.createElement('div');
      timeElement.classList.add('time');
      timeElement.textContent = "4.05";

      subtitleContainer.appendChild(subtitleElement);
      subtitleContainer.appendChild(timeElement);

      songareaContainer.appendChild(titleElement);
      songareaContainer.appendChild(subtitleContainer);

      infoareasContainer.appendChild(songareaContainer);
    });
  })
  .catch(error => console.error(error));
