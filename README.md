# Benope

[Visit Benope](https://injilee.github.io/Benope/)

## Skills

- HTML5
- CSS
- Javascript
- jQuery

#### 피그마 디자인 시안

[Figma Link](https://www.figma.com/file/SjuHrFG1fru8wxtmzhHPUq/Benope?type=design&node-id=2%3A7&mode=design&t=2fDAf0bzieps8E3h-1)

## 접근성 및 퍼포먼스 검사 (Lighthouse)

<img src="https://github.com/injilee/Benope/assets/90603357/dbc5f0af-8fab-4c51-92bf-0adaa72051b8" width="550">

## CSS root style

```css
:root {
  /* color */
  --color-primary: #1a1a1a;
  --color-secondary: #1b1b1b;
  --color-tertiary: #222222;
  --color-darkgray: #4a4a4a;
  --color-gray: #838383;
  --color-border: #f2f2f2;
  --color-background: #f6f8fa;
  --color-white: #ffffff;
  --color-blue: #508bed;
  --color-orange: #ee6e38;
  --color-btngray: #f5f5f5;
  --color-footergray: #6a6a6a;
  --color-sidebar: #f8f8f8;
  --color-countdown-box: #ffece4;

  /* font */
  --font-size-12: 0.75rem;
  --font-line-height-12: 1.125rem;

  --font-size-13: 0.8125rem;
  --font-line-height-13: 1.125rem;

  --font-size-14: 0.875rem;
  --font-line-height-14: 1.5rem;

  --font-size-16: 1rem;
  --font-line-height-16: 1.5rem;

  --font-size-18: 1.125rem;
  --font-line-height-18: 1.75rem;

  --font-size-22: 1.375rem;
  --font-line-height-22: 1.75rem;

  /* size */
  --base-space: 8px;
  --border-radius-size: 10px;
}
```

## CSS classname rules

```css
/* 공통 컴포넌트 */

/* 콘텐츠 제목, 부제목 */
.t01{ title01 },
.t02{ title02 }

/* header 영역 */

/* main 영역 */
.bsr { bestseller },
.prd { product },

/* footer 영역 */
.ft-sec01{ footer-section01 },
.ft-sec02{ footer-section02 },

```

## Javascript

### 스크롤 구현과 성능 최적화

스크롤을 구현하는 수많은 방법 중 아래 2가지를 이용해 성능 테스트를 해봤습니다.

- scroll event
- throttling

#### 1. scroll event

아래는 기본적인 scroll event로 구현한 방법입니다. 코드 그대로 확인해보면 문제가 발생합니다. 스크롤을 할 때마다 이벤트가 계속해서 발생한다는 점을 알 수 있습니다.

```javascript
window.addEventListener('scroll', onScroll);

function onScroll() {
  if (scrollY < 400) {
    topBtn.classList.add('hidden');
    console.log('400 이하 : scroll 이벤트 발생');
  } else (scrollY >= 400) {
    topBtn.classList.remove('hidden');
    console.log('400 이상 : scroll 이벤트 발생');
  }
}
```

위의 이벤트 중복을 방지하기 위해 <code>isHidden</code>을 줘봤습니다. 콘솔창을 확인하니 이벤트가 무한 호출되지는 않았지만 스크롤 이벤트에 무거운 효과를 줘야 한다면 아까와 같은 상황(무한 함수 호출)이 발생하게 됩니다. 성능 개선을 위해 다른 방법을 찾아봐야 했습니다.

#### 2. throttling

```javascript
let isHidden = false;

window.addEventListener('scroll', onScroll);

function onScroll() {
  let scrollY = window.scrollY;

  if (scrollY < 400 && !isHidden) {
    topBtn.classList.add('hidden');
    isHidden = true;
    console.log('400 이하 : scroll 이벤트 발생');
  } else if (scrollY >= 400 && isHidden) {
    topBtn.classList.remove('hidden');
    isHidden = false;
    console.log('400 이상 : scroll 이벤트 발생');
  }
}
```

<code>throttling</code>을 이용하면 이벤트가 일정주기마다 발생하도록 할 수 있습니다. 함수가 호출되면 일정 시간 동안은 호출되지 않기 때문에 <code>throttling</code>으로 스크롤 이벤트를 구현했습니다.

```javascript
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
```

#### Default(scroll event)와 throttling 이벤트 호출량 비교

<img src="https://github.com/injilee/Benope/assets/90603357/19a572ab-bd33-42ec-93cd-0e9e61cbef4a" width="250">

첫 번째 방법으로 스크롤 이벤트를 구현했다면 위 이미지처럼 어마어마한 함수 호출이 있었을 것이고, 만약 무한 스크롤의 상품 페이지였다면 엄청난 비용이 발생하게 되겠죠.

스크롤 이벤트의 성능 개선을 위해 주로 <code>throttling</code>가 쓰인다면, 자동검색어 기능 같이 입력값에 따라 api를 호출해야 할 때에는 <code>debouncing</code>을 사용하면 되겠습니다. 알고 있는 것과 모르는 것의 차이는 엄청난 차이가 있으니 꼭 기억해놓고 필요한 상황에 적절히 사용해야겠습니다.

### 별점 기능

```html
<!-- html -->
<li class="prd-list">
  <div class="prd-rate-wrap">
    <div class="star-rating">
      <div class="fill-star"></div>
    </div>
    <div class="rate">
      <span>4.9</span>
    </div>
    <div class="review-count">
      <span>(639)</span>
    </div>
  </div>
</li>
```

```css
/* css */
.star-rating {
  display: inline-block;
  width: 70px;
  height: 14px;
  background-image: url('../assets/icon/base-rate.svg');
  background-repeat: no-repeat;
}

.fill-star {
  display: inline-block;
  width: 100%;
  height: 14px;
  vertical-align: top;
  background-image: url('../assets/icon/fill-rate.svg');
  background-position: left bottom;
  background-repeat: no-repeat;
}

.prd-rate-wrap {
  display: flex;
  align-items: center;
}

.rate,
.review-count {
  font-weight: 400;
  font-size: var(--font-size-12);
  line-height: var(--font-line-height-12);
  color: var(--color-tertiary);
  white-space: nowrap;
  margin-left: 6px;
}
```

```javascript
// javascript
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
```

구현한 상품 페이지에는 각 상품마다 별점이 표시되어야 합니다. 수많은 상품들의 평점에 맞춰 별점 표시를 할 수 있도록 확장성 있게 코드를 작성 했습니다.

위와 같은 html과 css를 규칙적으로 반복해서 작성한다는 가정 하에, <code>rateValue</code>의 텍스트를 가져와서 값에 따라 알맞게 퍼센트로 변환하는 계산을 거쳐 최종 <code>total</code> 값이 색이 칠해질 별의 너비가 되도록 했습니다.

하나의 함수로 대량의 별점을 표시할 수 있습니다.

---

🔖 포트폴리오용으로 제작되었습니다.
