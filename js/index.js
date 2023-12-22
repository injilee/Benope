// 별점 점수에 따라 자동으로 fill-rate width 값 변경하는 함수
const rate = document.querySelectorAll('.rate');

function updateStarRating() {
  rate.forEach(item => {
    const starElement = item.previousElementSibling.lastElementChild;
    const rateValue = item.textContent.trim();
    const defaultRate = 5;
    const fillPercent = Math.floor((defaultRate - rateValue) * 100);
    const total = 100 - fillPercent + 10;

    if (rateValue > 0) {
      starElement.style.width = `${total}%`;
    } else {
      starElement.style.width = '0%';
    }
  });
}

updateStarRating();

// countdown
const countdownText = document.querySelector('.countdown');

function updateCountdown() {
  const countdownDate = Date.parse('2024/01/31 24:00:00');
  const now = new Date();
  const diff = countdownDate - now;

  const timeDown = Math.floor(diff / 1000);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const s = seconds - minutes * 60;
  const m = minutes - hours * 60;
  const h = hours - days * 24;
  const d = days;

  if (timeDown <= 0) {
    clearInterval(timeInterval);
    countdownText.textContent = '타임 종료';
  } else {
    countdownText.textContent = `${d}일 ${h}:${m}:${s} 남음`;
  }
}

const timeInterval = setInterval(updateCountdown, 1000);

updateCountdown();

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
