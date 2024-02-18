// 모달창
const searchBox = $('.search-box');

// 모달창 닫기 버튼
const backBtn = $('.back-btn');

// 모달창 열기 버튼
const searchTopBtn = $('.search-top-btn');
const searchFooterBtn = $('.ft-search-btn');

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
let focusedElementModal;

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
  recentinner.on('touchstart', containerOnScrollStart);
  recentinner.on('click', containerOnClick);
};

// 검색창 보이기
function openSearchBox() {
  focusedElementModal = document.activeElement;

  // // 포커스 가능한 요소들
  let focusableEls = $(searchBox).find(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contentditable]',
  );
  focusableEls = Array.prototype.slice.call(focusableEls);
  searchBox.on('keydown', trapTabKey);

  const firstTabStop = focusableEls[0];
  const lastTabStop = focusableEls[focusableEls.length - 1];
  firstTabStop.focus();

  searchBox.addClass('active');
  $('body').addClass('notscroll');
  searchBox.attr('aria-hidden', 'false');

  // 포커스 트랩 이벤트
  function trapTabKey(e) {
    // check Tab key
    if (e.keyCode === 9) {
      if (document.activeElement === firstTabStop && e.shiftKey) {
        e.preventDefault();
        lastTabStop.focus();
      } else if (document.activeElement === lastTabStop && !e.shiftKey) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      closeSearchBox();
    }
  }
}

// 검색창 숨기기
function closeSearchBox() {
  searchBox.removeClass('active');
  $('body').removeClass('notscroll');
  searchBox.attr('aria-hidden', 'true');
  focusedElementModal.focus();
}

backBtn.on('click', closeSearchBox);
searchTopBtn.on('click', openSearchBox);
searchFooterBtn.on('click', openSearchBox);

bindEvents();
