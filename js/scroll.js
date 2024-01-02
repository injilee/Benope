const headerMenu = $('.header-content');
const footerMenu = $('.ft-nav');
const gnb = $('.gnb');
const topBtnWrap = $('.top-btn-wrap');
const topBtn = $('.top-btn');

let lastScrollY = 0;
let isHidden = true;

// 상단, 하단 메뉴바 스크롤 방향에 따라 고정
function getDirectionScroll(scrollY) {
  const direction = scrollY > lastScrollY ? true : false;
  lastScrollY = scrollY;

  if (direction && scrollY !== 0) {
    headerMenu.addClass('fixed');
    footerMenu.addClass('hidden');
    gnb.css('opacity', '0');
    $('body').css('top', '56px');
  } else {
    headerMenu.removeClass('fixed');
    footerMenu.removeClass('hidden');
    gnb.css('opacity', '1');
    $('body').css('top', '0');
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
    topBtnWrap.removeClass('hidden');
    isHidden = false;
  } else if (scrollY < 400 && !isHidden) {
    topBtnWrap.addClass('hidden');
    isHidden = true;
  }
}

const throttledScrollHandler = throttle(scrollY => {
  updateVisibilityButton(scrollY);
  getDirectionScroll(scrollY);
});

topBtn.on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
});

$(window).on('scroll', () => {
  const scrollY = $(window).scrollTop();
  throttledScrollHandler(scrollY);
});

updateVisibilityButton($(window).scrollTop());
