const slide = document.querySelector('.slider-content');
const slideItems = slide.querySelectorAll('.slider-item');
const maxSlide = slideItems.length;
let slideWidth = document.querySelector('.slider-item').offsetWidth;

let currSlide = 1;

function prevMove() {
  currSlide--;
  if (currSlide > 0) {
    slide.scrollLeft -= slideWidth;
  } else {
    currSlide += 1;
    slide.scrollLeft = 0;
  }
}

function nextMove() {
  currSlide++;
  if (currSlide <= maxSlide) {
    slide.scrollLeft += slideWidth;
  } else {
    currSlide = 0;
    slide.scrollLeft = 0;
  }
}

let startPoint = 0;
let endPoint = 0;

// mouse event
slide.addEventListener('mousedown', e => {
  startPoint = e.pageX;
  slide.classList.add('dragging');
});

slide.addEventListener('mouseup', e => {
  endPoint = e.pageX;
  slide.classList.remove('dragging');
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// touch event
slide.addEventListener('touchstart', e => {
  startPoint = e.touches[0].pageX;
  slide.classList.add('dragging');
  clearInterval(timerId);
});

slide.addEventListener('touchend', e => {
  endPoint = e.changedTouches[0].pageX;
  slide.classList.remove('dragging');
  timerId = setInterval(() => {
    nextMove();
  }, 4000);

  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// slide autoplay
let timerId = setInterval(() => {
  nextMove();
}, 4000);

// slide over/leave on mouse
slide.addEventListener('mouseover', () => {
  clearInterval(timerId);
});

slide.addEventListener('mouseleave', () => {
  timerId = setInterval(() => {
    nextMove();
  }, 4000);
});

window.addEventListener('resize', () => {
  slideWidth = slide.clientWidth;
  slide.scrollLeft = 0;
  currSlide = 0;
});
