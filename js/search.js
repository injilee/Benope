const backBtn = document.querySelector('.back-btn');
const searchTopBtn = document.querySelector('.search-top-btn');
const searchFooterBtn = document.querySelector('.ft-search-btn');
const searchBox = document.querySelector('.search-box');
const recentContainer = document.querySelector('.swiper');
const recentinner = recentContainer.querySelector('.recent-content');
const input = document.querySelector('.search-input');
const deleteBtn = document.querySelector('.search-delete-btn');

const containerScrollWidth = recentinner.scrollWidth;
const containerClientWidth = recentinner.clientWidth;

let startX = 0;
let nowX = 0;
let endX = 0;
let listX = 0;

// input 검색어 삭제 버튼
deleteBtn.addEventListener('click', () => {
  let inputText = input.value;
  if (!inputText) {
    return;
  }
  input.value = null;
});

// swiper 관련 함수 선언
const getClientX = e => {
  const isTouches = e.touches ? true : false;
  return isTouches ? e.changedTouches[0].clientX : e.clientX;
};

const getTranslateX = () => {
  return parseInt(getComputedStyle(recentinner).transform.split(/[^\-0-9]+/g)[5]);
};

const setTranslateX = x => {
  recentinner.style.transform = `translateX(${x}px)`;
};

// 최근 본 상품 swipe
function containerOnScrollStart(e) {
  startX = getClientX(e);

  window.addEventListener('mouseup', containerOnScrollEnd);
  window.addEventListener('touchend', containerOnScrollEnd);
  window.addEventListener('mousemove', containerOnScrollMove);
  window.addEventListener('touchmove', containerOnScrollMove);
}

function containerOnScrollMove(e) {
  nowX = getClientX(e);
  setTranslateX(listX + nowX - startX);
}

function containerOnScrollEnd(e) {
  endX = getClientX(e);
  listX = getTranslateX();

  if (listX > 0) {
    setTranslateX(0);
    recentinner.style.transition = 'all 0.3s ease';
    listX = 0;
  } else if (listX < containerClientWidth - containerScrollWidth) {
    setTranslateX(containerClientWidth - containerScrollWidth);
    recentinner.style.transition = 'all 0.3s ease';
    listX = containerClientWidth - containerScrollWidth;
  }

  window.removeEventListener('mousedown', containerOnScrollStart);
  window.removeEventListener('touchstart', containerOnScrollStart);
  window.removeEventListener('mousemove', containerOnScrollMove);
  window.removeEventListener('touchmove', containerOnScrollMove);
  window.removeEventListener('mouseup', containerOnScrollEnd);
  window.removeEventListener('touchend', containerOnScrollEnd);
  window.removeEventListener('click', containerOnClick);

  setTimeout(() => {
    bindEvents();
    recentinner.style.transition = '';
  }, 300);
}

function containerOnClick(e) {
  if (startX - endX !== 0) {
    e.preventDefault();
  }
}

const bindEvents = () => {
  recentinner.addEventListener('mousedown', containerOnScrollStart);
  recentinner.addEventListener('touchstart', containerOnScrollStart);
  recentinner.addEventListener('click', containerOnClick);
};

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
searchFooterBtn.addEventListener('click', openSearchBox);

bindEvents();
