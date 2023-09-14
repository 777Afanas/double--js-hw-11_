
const refs = {
  searchForm: document.querySelector('.search-form'),
  photosContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");
// const alertPopup = document.querySelector(".alert");
// let isAlertVisible = false;

// Controls the group number
let page = 1;
// Controls the number of items in the group
let per_page = 5;
// // In our case total number of pages is calculated on frontend
// const totalPages = 100 / limit;
let query;


// fetchPostsBtn.addEventListener("click", () => {
//   // Check the end of the collection to display an alert
//   if (page > totalPages) {
//     return toggleAlertPopup();
//   }

//   fetchPosts()
//     .then((posts) => {
//       renderPosts(posts);
//       // Increase the group number
//       page += 1;

//       // Replace button text after first request
//       if (page > 1) {
//         fetchPostsBtn.textContent = "Fetch more posts";
//       }
//     })
//     .catch((error) => console.log(error));
// });

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();     
    // console.dir(e.currentTarget.elements.searchQuery.value);
    // const { searchQuery: { value } } = e.currentTarget.elements;
    query = e.currentTarget.elements.searchQuery.value;
    // console.log(searchQuery);
     
    if (!query) {
        alert(`Pole puste`);
        return;
    }  

  fetchPhotos()
    .then(data => {
      console.log(data);
      renderHits(data.hits);
      //   // Increase the group number
      //   page += 1;

      //   // Replace button text after first request
      //   if (page > 1) {
      //     fetchPostsBtn.textContent = "Fetch more posts";
      //   }
    })
    .catch(error => console.log(error));
}

// refs.loadMoreBtn.addEventListener('click', onLoad);

// function onLoad {
//     page += 1;

//     fetchPhotos(page).then(data)
// }

// function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: limit,
//     _page: page
//   });

//   return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

 function fetchPhotos() {     
        const BASE_URL = 'https://pixabay.com/api';         
        const params = new URLSearchParams({
            key: '39342201-f813eddd1adb93dcbf05db88a',
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page,
            page
        });         
    //     const url = `${BASE_URL}/?key=${API_KEY}&
    // q=yellow+flower&image_type=photo&orientation=horizontal&
    // safesearch=true&${params}`;
      const url = `${BASE_URL}/?${params}`; 
        return fetch(url)
            .then(
                (response) => {
                    if (!response.ok) {
                        throw new Error(response.status); 
                    }
                   
                    return response.json();                     
                });
    }


function renderHits(arr) { 
    const markup = arr
    .map(
        item => {
            return`<div class="photo-card">
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
          </div>`
        })
    .join('');     
    
    refs.photosContainer.insertAdjacentHTML("beforeend", markup);     
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
