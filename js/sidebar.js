const menuBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.sidebar-close-btn');
const categoryBtn = document.querySelector('.ft-category-btn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

// sidebar 보이기
function openSidebar() {
  sidebar.classList.add('is-open');
  overlay.classList.add('active');
  document.body.classList.add('fixbody');
}

// sidebar 숨기기
function closeSidebar() {
  sidebar.classList.remove('is-open');
  overlay.classList.remove('active');
  document.body.classList.remove('fixbody');
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
categoryBtn.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);
