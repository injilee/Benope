// 별점 점수에 따라 자동으로 fill-rate width 값 변경하는 함수
const rate = $('.rate');

function updateStarRating() {
  rate.each((index, item) => {
    const starElement = $(item).prev().find(':last-child')[0];
    const rateValue = $(item).text().trim();
    const defaultRate = 5;
    const fillPercent = Math.floor((defaultRate - rateValue) * 100);
    const total = 100 - fillPercent + 10;

    if (rateValue > 0) {
      $(starElement).css('width', `${total}%`);
    } else {
      $(starElement).css('width', '0%');
    }
  });
}

updateStarRating();

// 사업자 정보 drawer
const infoName = $('.ft-info-name');
const infoDownArrow = infoName.find('img');
const infoList = $('.ft-info');

infoName.on('click', function () {
  infoList.toggleClass('is-open');

  if (infoList.hasClass('is-open')) {
    infoList.css('padding-bottom', '16px');
    infoDownArrow.css('transform', 'rotate(180deg)');
  } else {
    infoList.css('padding-bottom', '0');
    infoDownArrow.css('transform', 'rotate(0deg)');
  }
});
