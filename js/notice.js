const board = document.querySelectorAll('.board-content');
const panel = document.querySelectorAll('.board-desc');

board.forEach(item => {
  item.addEventListener('click', () => {
    item.nextElementSibling.classList.toggle('active');
  });
});
