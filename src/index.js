

const refs = {
  searchForm: document.querySelector('.search-form'),
  photosContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};


// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");
// const alertPopup = document.querySelector(".alert");
// let isAlertVisible = false;

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let limit = 5;
// // In our case total number of pages is calculated on frontend
// const totalPages = 100 / limit;

// refs.searchForm.addEventListener('submit', onSearch);

refs.searchForm.addEventListener('submit', () => {

    // e.preventDefault();
    
    // console.log(fetchPhotos());

    fetchPhotos() 
        .then((gallery) => {
            console.log(dgallery);
      renderPosts(gallery);
    //   // Increase the group number
    //   page += 1;

    //   // Replace button text after first request
    //   if (page > 1) {
    //     fetchPostsBtn.textContent = "Fetch more posts";
    //   }
    })
    .catch((error) => console.log(error));


});




// function onSearch(e) {
//     e.preventDefault();
    
//     // console.log(fetchPhotos());

//     fetchPhotos() 
//         .then((data) => {
//             console.log(data.hits);
//       renderPosts();
//     //   // Increase the group number
//     //   page += 1;

//     //   // Replace button text after first request
//     //   if (page > 1) {
//     //     fetchPostsBtn.textContent = "Fetch more posts";
//     //   }
//     })
//     .catch((error) => console.log(error));



    function fetchPhotos() {
    
        const BASE_URL = 'https://pixabay.com/api';
        const API_KEY = '39342201-f813eddd1adb93dcbf05db88a';
        const params = new URLSearchParams({
            per_page: 3,
            page: 1
        });
        
        const url = `${BASE_URL}/?key=${API_KEY}&
    q=yellow+flower&image_type=photo&orientation=horizontal&
    safesearch=true&${params}`;

        return fetch(url)
            .then(
                (response) => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                   
                    return response.json();
                    console.log(response.json());
                }
            );
    }
            // .then(response =>
            //     response.json())
            // .then(({ hits }) => {
            //     this.incrementPage();
            //     console.log(hits);
            //     return hits;
            // });
    
        // console.log(renderPosts());

        function renderPosts(gallery) {
            // console.log(data);
            
            const markup = gallery
                .map(({ comments, downloads, likes, tags, views, webformatURL }) => {
                    return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
       <div class="info">
        <p class="info-item">
            <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
            <b>Views: ${views}</b>
        </p>
        <p class="info-item">
            <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${downloads}</b>
        </p>
    </div>
</div>`;
                })
                .join("");
            console.log(markup);
            // photosContainer.insertAdjacentHTML("beforeend", markup);

            photosContainer.innerHTML = markup;
        }
    

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
