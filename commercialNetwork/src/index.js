import "./scss/index.scss"

const burger = document.querySelector(".burger-menu")
const nav = document.querySelector(".header__navigation")

burger.addEventListener("click", () => {
  nav.classList.toggle("active")
  burger.classList.toggle("active")
})
