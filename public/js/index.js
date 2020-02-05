const movieForm = document.querySelector('form')
const search = document.querySelector('input')
const searchResultsEl = document.querySelector('.search-output')
const searchPagesContainerEl = document.querySelector('.search-output-pages')
const resultsTextEl = document.createElement('p')

const state = {}

const toggleLoader = () => {
  !searchResultsEl.classList.contains("spinner-1") ? searchResultsEl.classList.add("spinner-1") : searchResultsEl.classList.remove("spinner-1")
}

const renderSearchResults = (data) => {
  if (data.error) {
    searchResultsEl.insertAdjacentHTML("beforeend", `<p>${data.error}</p>`)
  } else {
    data.results.forEach((movie) => {
      const htmlTemplate =
        `
        <div class="card" data-movie-id="${movie.id}">
          <img class="card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title} poster">
          <div class="card-text-wrapper">
            <p class="card-title">${movie.original_title} (${movie.release_date ? movie.release_date.substring(0, 4) : 'unknown date'})</p>
          </div>
        </div>
      `
      searchResultsEl.insertAdjacentHTML("beforeend", htmlTemplate)
    })

    state.pageNumber = data.page
    state.totalPages = data.total_pages
    if (state.totalPages !== state.pageNumber && !document.querySelector('.nextBtn')) {
      if (state.pageNumber !== 1) {
        const prevTwentyBtnEl = document.createElement('button')
        prevTwentyBtnEl.classList.add('prevBtn')
        prevTwentyBtnEl.innerText = 'Prev. Page'
        searchPagesContainerEl.appendChild(prevTwentyBtnEl)
      }
      const nextTwentyBtnEl = document.createElement('button')
      nextTwentyBtnEl.classList.add('nextBtn')
      nextTwentyBtnEl.innerText = 'Next Page'
      searchPagesContainerEl.appendChild(nextTwentyBtnEl)
    }
    resultsTextEl.textContent = ''
    resultsTextEl.classList.add('search-info')
    resultsTextEl.innerHTML = `<p><em>Displaying results for: "${state.search}"</em></p>`
    movieForm.insertAdjacentElement('afterend', resultsTextEl)

    const pageNumberEl = document.createElement('p')
    pageNumberEl.classList.add('page-number')
    pageNumberEl.innerHTML = `<p>Page ${data.page} of ${data.total_pages}</p>`
    searchPagesContainerEl.appendChild(pageNumberEl)
  }
}

movieForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const movie = search.value
  state.search = movie
  movieForm.reset()
  searchResultsEl.textContent = ''
  toggleLoader()
  searchPagesContainerEl.textContent = ''
  fetch(`/movie?search=${movie}`).then(res => res.json()).then((data) => {
    toggleLoader()
    renderSearchResults(data)
    sessionStorage.setItem('state', JSON.stringify(state))
  })
})

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nextBtn')) {
    searchResultsEl.textContent = ''
    searchPagesContainerEl.textContent = ''
    toggleLoader()
    fetch(`/movie?search=${state.search}&page=${state.pageNumber + 1}`).then(res => res.json()).then((data) => {
      toggleLoader()
      renderSearchResults(data)
      sessionStorage.setItem('state', JSON.stringify(state))
    })
  }
})

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('prevBtn')) {
    searchResultsEl.textContent = ''
    searchPagesContainerEl.textContent = ''
    toggleLoader()
    fetch(`/movie?search=${state.search}&page=${state.pageNumber - 1}`).then(res => res.json()).then((data) => {
      toggleLoader()
      renderSearchResults(data)
      sessionStorage.setItem('state', JSON.stringify(state))
    })
  }
})

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card') || e.target.parentElement.classList.contains('card') || e.target.parentElement.parentElement.classList.contains('card')) {
    const movieID = e.target.dataset.movieId || e.target.parentElement.dataset.movieId || e.target.parentElement.parentElement.dataset.movieId
    sessionStorage.setItem('state', JSON.stringify(state))
    window.location = `/movie-info?id=${movieID}`
  }
})

window.addEventListener('load', () => {
  if (sessionStorage.getItem('state')) {
    const currentSearch = JSON.parse(sessionStorage.getItem('state'))
    if (currentSearch.search) {
      state.search = currentSearch.search
      state.pageNumber = currentSearch.pageNumber
      state.totalPages = currentSearch.totalPages
      toggleLoader()
      fetch(`/movie?search=${currentSearch.search}&page=${currentSearch.pageNumber || 1}`).then(res => res.json()).then((data) => {
        toggleLoader()
        renderSearchResults(data)
      })
    }
  }
})

