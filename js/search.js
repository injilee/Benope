const backBtn = document.querySelector('.back-btn');
const searchTopBtn = document.querySelector('.search-top-btn');
const searchBox = document.querySelector('.search-box');

// 검색창 보이기
function openSearchBox() {
  searchBox.classList.add('active');
  document.body.classList.add('notscroll');
}

// 검색창 숨기기
function closeSearchBox() {
  searchBox.classList.remove('active');
  document.body.classList.remove('notscroll');
}

backBtn.addEventListener('click', closeSearchBox);
searchTopBtn.addEventListener('click', openSearchBox);
