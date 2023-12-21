// 사업자 정보 drawer
const infoName = document.querySelector('.ft-info-name');
const infoDownArrow = infoName.querySelector('img');
const infoList = document.querySelector('.ft-info');

infoName.addEventListener('click', function () {
  infoList.classList.toggle('is-open');

  if (infoList.classList.contains('is-open')) {
    infoList.style.paddingBottom = '16px';
    infoDownArrow.style.transform = 'rotate(180deg)';
  } else {
    infoList.style.paddingBottom = '0';
    infoDownArrow.style.transform = 'rotate(0deg)';
  }
});

// top btn
const topBtnWrap = document.querySelector('.top-btn-wrap');
const topBtn = document.querySelector('.top-btn');

let isHidden = true;

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

const throttledScrollHandler = throttle(scrollY => updateVisibilityButton(scrollY));

topBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  throttledScrollHandler(scrollY);
});

updateVisibilityButton(window.scrollY);
