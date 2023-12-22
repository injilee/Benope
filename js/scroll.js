const headerMenu = document.querySelector('.header-content');
const footerMenu = document.querySelector('.ft-nav');
const gnb = document.querySelector('.gnb');
const topBtnWrap = document.querySelector('.top-btn-wrap');
const topBtn = document.querySelector('.top-btn');

let lastScrollY = 0;
let isHidden = true;

// 상단, 하단 메뉴바 스크롤 방향에 따라 고정
function getDirectionScroll(scrollY) {
  const direction = scrollY > lastScrollY ? true : false;
  lastScrollY = scrollY;

  if (direction && scrollY !== 0) {
    headerMenu.classList.add('fixed');
    footerMenu.classList.add('hidden');
    gnb.style.opacity = '0';
    document.body.style.top = '56px';
  } else {
    headerMenu.classList.remove('fixed');
    footerMenu.classList.remove('hidden');
    gnb.style.opacity = '1';
    document.body.style.top = '0';
  }
}

// 이벤트 무한 호출 방지를 위한 throttling
function throttle(callback, delay = 100) {
  let isThrottled;

  return (...args) => {
    if (!isThrottled) {
      isThrottled = setTimeout(() => {
        isThrottled = null;
        callback(...args);
      }, delay);
    }
  };
}

// 스크롤의 위치에 따라 top-button 보이기/숨기기
function updateVisibilityButton(scrollY) {
  if (scrollY >= 400 && isHidden) {
    topBtnWrap.classList.remove('hidden');
    isHidden = false;
  } else if (scrollY < 400 && !isHidden) {
    topBtnWrap.classList.add('hidden');
    isHidden = true;
  }
}

const throttledScrollHandler = throttle(scrollY => {
  updateVisibilityButton(scrollY);
  getDirectionScroll(scrollY);
});

topBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  throttledScrollHandler(scrollY);
});

updateVisibilityButton(window.scrollY);
