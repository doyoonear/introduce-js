const openButton = document.getElementById("open");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay");
const closeButton = modal.querySelector("button");
// modal 복구
const openModal = () => {
    modal.classList.remove("hidden");
}

const closeModal = () => {
    modal.classList.add("hidden");
}

overlay.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);