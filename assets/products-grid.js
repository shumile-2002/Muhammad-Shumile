///////////////////////////// Product & Vairant Identification /////////////////////////////

// getting products using JSON parsing
const products = JSON.parse(document.getElementById('products').text);

// Function to get all the variants by product ID
function getVariantsByProductId(productId) {
  const product = products.find((p) => p.id === productId);
  return product ? product.variants : null
}

// Function to find the matching variant using options
function findMatchingVariant(size, color, variants) {
  return variants.find(
    (variant) => variant.options.includes(size) && variant.options.includes(color)
  );
}





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




// Custom Select Script Code
document.addEventListener('DOMContentLoaded', function() {
  var customSelects = document.querySelectorAll('.custom-select-wrapper');
  
  customSelects.forEach(function(wrapper) {
    var selectElement = wrapper.querySelector('select');
    var selectStyled = wrapper.querySelector('.select-styled');
    var selectOptions = wrapper.querySelector('.select-options');
    
    selectStyled.textContent = selectElement.options[selectElement.selectedIndex].textContent;
    
    selectStyled.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      selectOptions.style.display = this.classList.contains('active') ? 'block' : 'none';
    });
    
    selectOptions.addEventListener('click', function(e) {
      if (e.target.tagName === 'LI') {
        selectStyled.textContent = e.target.textContent;
        selectElement.value = e.target.getAttribute('rel');
        selectStyled.classList.remove('active');
        selectOptions.style.display = 'none';
        
        // Trigger change event on the select element
        var event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }
    });
    
    document.addEventListener('click', function() {
      selectStyled.classList.remove('active');
      selectOptions.style.display = 'none';
    });
  });
});