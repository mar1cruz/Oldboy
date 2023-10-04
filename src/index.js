import "./scss/index.scss"

const burger = document.querySelector(".burger-menu")
const nav = document.querySelector(".header__navigation")
const body = document.querySelector("body")
const form = document.querySelector("#form")
const links = document.querySelectorAll(".navigation__link")
const popup = document.querySelector(".popup__wrapper")
const select = document.querySelector("#select")
const selectOptions = document.querySelectorAll(".select__value")
const cityName = document.querySelector(".city__name")
const app = document.querySelector(".app")
const triangle = document.querySelector(".logo__triangle")

const email = form.querySelector("#email")
const tel = form.querySelector("#tel")
const checkbox = form.querySelector("#checkbox")

const error = {
  email: false,
  tel: false,
  checkbox: false,
}

selectOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    cityName.textContent = e.target.textContent
    select.nextElementSibling.classList.remove("active")
  })
})

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active")
  })
})

select.addEventListener("click", (e) => {
  select.nextElementSibling.classList.toggle("active")
  triangle.classList.toggle("active")
})

document.addEventListener("keydown", (e) => {
  if (popup.classList.contains("active") && e.key === "Escape") {
    popup.classList.remove("active")
    app.classList.remove("blur")
  }
})

document.addEventListener("click", (e) => {
  if (!popup.contains(e.target)) {
    popup.classList.remove("active")
    app.classList.remove("blur")
  }

  if (!select.contains(e.target)) {
    select.nextElementSibling.classList.remove("active")
    triangle.classList.remove("active")
  }
})

burger.addEventListener("click", () => {
  nav.classList.toggle("active")
  burger.classList.toggle("active")
  body.classList.toggle("lock")
})

email.addEventListener("input", (e) => {
  emailValidator(e.target)
})

tel.addEventListener("blur", (e) => {
  telValidator(e.target)
})

tel.addEventListener("input", (e) => {
  telHandler(e.target)
})

checkbox.addEventListener("change", (e) => {
  agreementsValidator(e.target)
})

function emailValidator(input) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  return (error[input.getAttribute("id")] = EMAIL_REGEXP.test(input.value))
}

function telValidator(input) {
  return (error[input.getAttribute("id")] = input.value.length >= 10 && input.value.length <= 18)
}

function telHandler(input) {
  const value = input.value.replace(/[^\d+]+/g, "")
  if (value.length > 18) {
    input.value = value.slice(0, 18)
  } else {
    input.value = value
  }
}

function agreementsValidator(input) {
  return (error[input.getAttribute("id")] = input.checked)
}

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const errors = Array.from(Object.values(error))
  const isEror = errors.some((el) => el === false)

  if (isEror) return

  app.classList.add("blur")
  popup.classList.add("active")
})
