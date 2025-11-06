const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav_menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

