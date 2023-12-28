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
