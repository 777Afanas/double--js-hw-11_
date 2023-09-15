const refs = {
  searchForm: document.querySelector('.search-form'),
  photosContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// let isAlertVisible = false;
// Controls the group number
let page = 1;
// Controls the number of items in the group
let per_page = 40;
// let totalHits;
// // In our case total number of pages is calculated on frontend
// const totalPages = 100 / limit;
let query;
refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoad);

function onSearch(e) {
  e.preventDefault();

  refs.loadMoreBtn.classList.add('is-hidden');

 clearPhotosContainer();

  page = 1;
  query = e.currentTarget.elements.searchQuery.value;

  if (!query) {
    alert(`Pole puste`);
    return;
  }

  fetchPhotos()
    .then(data => {
      if (data.hits.length == 0) {
        alert(`Sorry, there are no images matching your 
              search query. Please try again`);
        return;
      }
      console.log(data);
      renderHits(data.hits);
    })
    .catch(error => console.log(error));

  refs.loadMoreBtn.classList.remove('is-hidden');
}

function onLoad() {
  page += 1;

  fetchPhotos()
    .then(data => {
        console.log(data.totalHits);
      if ((page - 1) > data.totalHits/per_page) {
        alert(`We're sorry, but you've reached the end of 
         search results.`);
        return;
      }

        renderHits(data.hits);  

    })
    .catch(error => console.log(error));
}

function fetchPhotos() {
  const BASE_URL = 'https://pixabay.com/api';
  const params = new URLSearchParams({
    key: '39342201-f813eddd1adb93dcbf05db88a',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
  });
  //     const url = `${BASE_URL}/?key=${API_KEY}&
  // q=yellow+flower&image_type=photo&orientation=horizontal&
  // safesearch=true&${params}`;
  const url = `${BASE_URL}/?${params}`;
  console.log(url);
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

function renderHits(arr) {
  const markup = arr
    .map(item => {
      return `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
       <div class="info">
        <p class="info-item">
            <b>Likes: ${item.likes}</b>
        </p>
        <p class="info-item">
            <b>Views: ${item.views}</b>
        </p>
        <p class="info-item">
            <b>Comments: ${item.comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${item.downloads}</b>
        </p>
        </div>
          </div>`;
    })
    .join('');

  refs.photosContainer.insertAdjacentHTML('beforeend', markup);
}

function clearPhotosContainer() {
  refs.photosContainer.innerHTML = ' ';
}
// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   postList.insertAdjacentHTML("beforeend", markup);
// }

// function toggleAlertPopup() {
//   if (isAlertVisible) {
//     return;
//   }
//   isAlertVisible = true;
//   alertPopup.classList.add("is-visible");
//   setTimeout(() => {
//     alertPopup.classList.remove("is-visible");
//     isAlertVisible = false;
//   }, 3000);
// }
