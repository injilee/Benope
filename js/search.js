const backBtn = $('.back-btn');
const searchTopBtn = $('.search-top-btn');
const searchFooterBtn = $('.ft-search-btn');
const searchBox = $('.search-box');
const recentContainer = $('.swiper');
const recentinner = recentContainer.find('.recent-content');
const input = $('.search-input');
const deleteBtn = $('.search-delete-btn');

const containerScrollWidth = recentinner[0].scrollWidth;
const containerClientWidth = recentinner[0].clientWidth;

let startX = 0;
let nowX = 0;
let endX = 0;
let listX = 0;

// input 검색어 삭제 버튼
deleteBtn.on('click', () => {
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
  return parseInt(recentinner.css('transform').split(/[^\-0-9]+/g)[5]);
};

const setTranslateX = x => {
  recentinner.css('transform', `translateX(${x}px)`);
};

// 최근 본 상품 swipe
function containerOnScrollStart(e) {
  startX = getClientX(e);

  $(window).on('mouseup', containerOnScrollEnd);
  $(window).on('touchend', containerOnScrollEnd);
  $(window).on('mousemove', containerOnScrollMove);
  $(window).on('touchmove', containerOnScrollMove);
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
    recentinner.css('transition', 'all 0.3s ease');
    listX = 0;
  } else if (listX < containerClientWidth - containerScrollWidth) {
    setTranslateX(containerClientWidth - containerScrollWidth);
    recentinner.css('transition', 'all 0.3s ease');
    listX = containerClientWidth - containerScrollWidth;
  }

  $(window).off('mousedown', containerOnScrollStart);
  $(window).off('touchstart', containerOnScrollStart);
  $(window).off('mousemove', containerOnScrollMove);
  $(window).off('touchmove', containerOnScrollMove);
  $(window).off('mouseup', containerOnScrollEnd);
  $(window).off('touchend', containerOnScrollEnd);
  $(window).off('click', containerOnClick);

  setTimeout(() => {
    bindEvents();
    recentinner.css('transition', '');
  }, 300);
}

function containerOnClick(e) {
  if (startX - endX !== 0) {
    e.preventDefault();
  }
}

const bindEvents = () => {
  recentinner.on('mousedown', containerOnScrollStart);
  recentinner.on('touchstart', containerOnScrollStart, { passive: true });
  recentinner.on('click', containerOnClick);
};

// 검색창 보이기
function openSearchBox() {
  searchBox.addClass('active');
  $('body').addClass('notscroll');
}

// 검색창 숨기기
function closeSearchBox() {
  searchBox.removeClass('active');
  $('body').removeClass('notscroll');
}

backBtn.on('click', closeSearchBox);
searchTopBtn.on('click', openSearchBox);
searchFooterBtn.on('click', openSearchBox);

bindEvents();
