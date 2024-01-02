const board = $('.board-content');

board.each((index, item) => {
  $(item).on('click', () => {
    $(item).next().toggleClass('active');
  });
});
