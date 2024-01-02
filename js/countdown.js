// countdown
const countdownText = $('.countdown');

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
    countdownText.text('타임 종료');
  } else {
    countdownText.text(`${d}일 ${h}:${m}:${s} 남음`);
  }
}

const timeInterval = setInterval(updateCountdown, 1000);

updateCountdown();
