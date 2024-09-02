
// Product detail popup script
const popupBtns = document.querySelectorAll('.product-button');
const closeBtns = document.querySelectorAll('.popup-close');


popupBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => e.currentTarget.parentNode.classList.add('active'));
})
// need to remove class active from over parent above 
closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => e.currentTarget.parentNode.parentNode.classList.remove('active'));
})