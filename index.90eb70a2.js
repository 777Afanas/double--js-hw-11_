const e={searchForm:document.querySelector(".search-form"),photosContainer:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let n,o=1;function t(){const e=`https://pixabay.com/api/?${new URLSearchParams({key:"39342201-f813eddd1adb93dcbf05db88a",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:o})}`;return console.log(e),fetch(e).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))}function a(n){const o=n.map((e=>`<div class="photo-card">\n        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />\n       <div class="info">\n        <p class="info-item">\n            <b>Likes: ${e.likes}</b>\n        </p>\n        <p class="info-item">\n            <b>Views: ${e.views}</b>\n        </p>\n        <p class="info-item">\n            <b>Comments: ${e.comments}</b>\n        </p>\n        <p class="info-item">\n            <b>Downloads: ${e.downloads}</b>\n        </p>\n        </div>\n          </div>`)).join("");e.photosContainer.insertAdjacentHTML("beforeend",o)}e.searchForm.addEventListener("submit",(function(r){if(r.preventDefault(),function(){e.photosContainer.innerHTML=" "}(),o=1,n=r.currentTarget.elements.searchQuery.value,!n)return void alert("Pole puste");t().then((e=>{0!=e.hits.length?(console.log(e),a(e.hits)):alert("Sorry, there are no images matching your \n              search query. Please try again")})).catch((e=>console.log(e)))})),e.loadMoreBtn.addEventListener("click",(function(){o+=1,t().then((e=>{console.log(e),a(e.hits)})).catch((e=>console.log(e)))}));
//# sourceMappingURL=index.90eb70a2.js.map
