const backBtn = document.querySelector('.back-btn');
const searchTopBtn = document.querySelector('.search-top-btn');
const searchBox = document.querySelector('.search-box');

// 검색창 보이기
function openSearchBox() {
  searchBox.classList.add('active');
}

// 검색창 숨기기
function closeSearchBox() {
  searchBox.classList.remove('active');
}

backBtn.addEventListener('click', closeSearchBox);
searchTopBtn.addEventListener('click', openSearchBox);
