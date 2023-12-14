const menuBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.sidebar-close-btn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

function openSidebar() {
  sidebar.classList.add('is-open');
  overlay.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('is-open');
  overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
