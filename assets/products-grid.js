


///////////////////////////// Event Listener to Select and Radio Inputs /////////////////////////////

 document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
   // Listene to all select elements
   const selects = form.querySelectorAll('select');
  selects.forEach((select) => {
    select.addEventListener('change', handleChange)
  })

   // Listene to all radio inputs
   const radios = form.querySelectorAll('input[type="radio"]');
  radios.forEach((radio) => {
    radio.addEventListener('change', handleChange);
  })
 })




///////////////////////////// Options change handler Function /////////////////////////////

function handleChange(event) {
  console.log('changed');
  const form = event.target.closest('form');
  if (form) {
    let productID = form.getAttribute('data-product-id');
    console.log("Product ID: ", productID);
    const variants = getVariantsByProductId(productID);
    console.log(variants);

    // Getting Size selected by user
    const selectedSize = form.querySelector('select').value

    // Getting Color selected by user
    let currentColorOption = form.querySelector('input[name="Color"]:checked');
    let selectedColor;

    if (currentColor) {
      selectedColor = currentColorOption.value;
    } else {
      selectedColor = form.querySelector('input[name="Color"]').value;
    }
    
    console.log('Selected Color: ', selectedColor);
    console.log('Selected Size: ', selectedSize);

    const matchingVariant = findMatchingVariant(selectedSize, selectedColor, variants);
    console.log('Matching Varaint: ', matchingVariant);

    const id_input = document.getElementById(`product-${productID}`);
    id_input.value = matchingVariant.id;
    console.log('Updated Varaint ID: ', id_input);
    
  }
}



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