const menuBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.sidebar-close-btn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

// sidebar 보이기
function openSidebar() {
  sidebar.classList.add('is-open');
  overlay.classList.add('active');
}

// sidebar 숨기기
function closeSidebar() {
  sidebar.classList.remove('is-open');
  overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);