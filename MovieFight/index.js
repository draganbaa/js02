const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${imgSrc}" />
    ${movie.Title}
    (${movie.Year})
  `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: "9a5334d3",
          s: searchTerm,
        },
      });

      if (response.data.Error) {
        return [];
      }

      return response.data.Search;
    } catch (e) {
      console.log(e);
    }
  },
};

createAutoComplete({
  root: document.querySelector(".left-autocomplete"),
  ...autoCompleteConfig,
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  },
});

createAutoComplete({
  root: document.querySelector(".right-autocomplete"),
  ...autoCompleteConfig,
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});

let leftMovie, rightMovie;

async function onMovieSelect(movie, summaryEl, side) {
  const resposne = await await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "9a5334d3",
      i: movie.imdbID,
    },
  });
  summaryEl.innerHTML = movieTemplate(resposne.data);
  if (side === "left") {
    leftMovie = resposne.data;
  } else {
    rightMovie = resposne.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
}
function runComparison() {
  const leftStats = document.querySelectorAll("#left-summary .notification");
  const rightStats = document.querySelectorAll("#right-summary .notification");

  leftStats.forEach((leftStat, index) => {
    const rightStat = rightStats[index];
    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
}

function movieTemplate(movieDetails) {
  const dollars = parseInt(
    movieDetails.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metaScore = parseInt(movieDetails.Metascore);
  const imdbRating = parseFloat(movieDetails.imdbRating);
  const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ""));
  const award = movieDetails.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
  <article class="media">
  <figure class="media-left">
    <p class="image">
      <img src="${movieDetails.Poster}" />
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <h1>${movieDetails.Title}</h1>
      <h4>${movieDetails.Genre}</h4>
      <p>${movieDetails.Plot}</p>
    </div>
  </div>
</article>
<article data-value="${award}" class="notification is-primary">
  <p class="title">${movieDetails.Awards}</p>
  <p class="subtitle">Awards</p>
</article>
<article data-value="${dollars}" class="notification is-primary">
  <p class="title">${movieDetails.BoxOffice}</p>
  <p class="subtitle">BoxOffice</p>
</article>
<article data-value="${metaScore}" class="notification is-primary">
  <p class="title">${movieDetails.Metascore}</p>
  <p class="subtitle">Metascore</p>
</article>
<article data-value="${imdbRating}" class="notification is-primary">
  <p class="title">${movieDetails.imdbRating}</p>
  <p class="subtitle">IMDB Rating</p>
</article>
<article data-value="${imdbVotes}" class="notification is-primary">
  <p class="title">${movieDetails.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
</article>
  `;
}
