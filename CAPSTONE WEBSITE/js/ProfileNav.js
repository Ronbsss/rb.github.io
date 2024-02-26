/* =========== Show Navbar =========== */
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});


let subMenu = document.getElementById('subMenu');

function toggleMenu() {
    subMenu.classList.toggle("open-menu");
}
