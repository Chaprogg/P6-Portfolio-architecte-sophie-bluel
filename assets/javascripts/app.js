//Ajout d'une class "js-modal" dans tous les liens domHtml qui doive ouvrir une modal

let modal = null

const openModal = function (event) {
    event.preventDefault()
    const target = document.querySelector(event.target.getAttribute("href"))
    target.style.display = null;
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}
const closeModal = function (event) {
    if (modal === null) return
    event.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    target.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (event) {
    event.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach (a =>{
    addEventListener("click", openModal)
})

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "esc") {
        closeModal(event)
    }
})
// Session loged and Logout buttons Modal

const logged = window.sessionStorage.logged
const login = document.querySelector("header nav .login")
const logout = document.querySelector("header nav .logout")
const containerModal = document.querySelector("#mainModal")

if (logged == true) {
    login.textContent = "logout"
    logout.addEventListener("click", () => {
        window.sessionStorage.logged = false
    })
}
// Display Modal at click on Modifier Button
login.addEventListener("click", () => {
    containerModal.style.display = "flex"
})