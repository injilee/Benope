const slide = $('.slider-content');
const slideItems = slide.find('.slider-item');
const maxSlide = slideItems.length;
let slideWidth = $('.slider-item').width();

let currSlide = 1;
let startPoint = 0;
let endPoint = 0;
// slide autoplay
let timerId = setInterval(nextMove, 4000);

function prevMove() {
  currSlide--;
  if (currSlide > 0) {
    slide.scrollLeft(slide.scrollLeft() - slideWidth);
  } else {
    currSlide += 1;
    slide.scrollLeft(0);
  }
}

function nextMove() {
  currSlide++;
  if (currSlide <= maxSlide) {
    slide.scrollLeft(slide.scrollLeft() + slideWidth);
  } else {
    currSlide = 0;
    slide.scrollLeft(0);
  }
}

// mouse event
slide.on('mousedown', e => {
  startPoint = e.pageX;
  slide.addClass('dragging');
});

slide.on('mouseup', e => {
  endPoint = e.pageX;
  slide.removeClass('dragging');
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// touch event
slide.on(
  'touchstart',
  e => {
    startPoint = e.touches[0].pageX;
    slide.addClass('dragging');
    clearInterval(timerId);
  },
  { passive: true },
);

slide.on('touchend', e => {
  endPoint = e.changedTouches[0].pageX;
  slide.classList.remove('dragging');
  timerId = setInterval(nextMove, 4000);

  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// slide over/leave on mouse
slide.on('mouseover', () => {
  clearInterval(timerId);
});

slide.on('mouseleave', () => {
  timerId = setInterval(nextMove, 4000);
});

$(window).on('resize', () => {
  slideWidth = slide.width();
  slide.scrollLeft(0);
  currSlide = 0;
});
