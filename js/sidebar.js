const menuBtn = $('.menu');
const closeBtn = $('.sidebar-close-btn');
const categoryBtn = $('.ft-category-btn');
const sidebar = $('.sidebar');
const overlay = $('.overlay');

// sidebar 보이기
function openSidebar() {
  sidebar.addClass('is-open');
  overlay.addClass('active');
  $('body').addClass('fixbody');
}

// sidebar 숨기기
function closeSidebar() {
  sidebar.removeClass('is-open');
  overlay.removeClass('active');
  $('body').removeClass('fixbody');
}

menuBtn.on('click', openSidebar);
closeBtn.on('click', closeSidebar);
categoryBtn.on('click', openSidebar);
overlay.on('click', closeSidebar);
