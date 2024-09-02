// Product detail popup script
const popupBtns = document.querySelectorAll('.product-button');

popupBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => e.currentTarget.parentNode.classList.add('active'));
})