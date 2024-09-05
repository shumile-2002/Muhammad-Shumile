
///////////////////////////// Checking for gift /////////////////////////////

let shouldAddGift = false;
let cartMsg = document.getElementById('cart-msg');



// Variant Id of "Soft Winter Jacket"
const giftVariantId = 41679668707393;



///////////////////////////// Ajax Add To Cart Functionality using Fetch /////////////////////////////

document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {

  // async function to handle Promosies 
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Styles on form submission
    cartMsg.style.opacity = 1;
    form.querySelector('.cart-link').style.display = "block";

    const data = new FormData(form);

    await fetch("/cart/add", {
      method: "post",
      body: data
    });

    if (shouldAddGift) {

      // makrin FormData for gift product
      const giftData = new FormData();
      giftData.append('items[0][id]', giftVariantId);
      giftData.append('items[0][quantity]', 1);

      await fetch("/cart/add", {
        method: "post",
        body: giftData
      });
    }
    
    // fetching updated Cart Data
    const cartData = await fetch("/cart.json");
    const cartDataContents = await cartData.json();

    console.log('Updated Cart: ', cartDataContents);

    if (shouldAddGift) {
      cartMsg.textContent = `Selected Product & Gift added.  Cart now  has ${cartDataContents.item_count} items` 
    } else {
      cartMsg.textContent = `Selected Product added.  Cart now  has ${cartDataContents.item_count} items` 
    }
    
    

  })
 })




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
    let productID = Number(form.getAttribute('data-product-id'));
    console.log("Product ID: ", productID);
    const variants = getVariantsByProductId(productID);
    console.log(variants);

    // Getting Size selected by user
    const selectedSize = form.querySelector('select').value

    // Getting Color selected by user
    let currentColorOption = form.querySelector('input[name="Color"]:checked');
    let selectedColor;

    if (currentColorOption) {
      selectedColor = currentColorOption.value;
    } else {
      selectedColor = form.querySelector('input[name="Color"]').value;
    }
    
    if (selectedSize == "M" && selectedColor == "Black") {
      shouldAddGift = true;
    } else {
      shouldAddGift = false;
    }


    
    const matchingVariant = findMatchingVariant(selectedSize, selectedColor, variants);
    console.log('Matching Varaint: ', matchingVariant);

    console.log(`product-${productID}`)
    const id_input = document.getElementById(`product-${productID}`);
    if (id_input){
      id_input.value = matchingVariant.id;
    } else {
      console.log('Hidden input not found');
    }
    console.log('Updated Varaint ID: ', id_input);
    
  }
}



///////////////////////////// Product & Vairant Identification /////////////////////////////

// getting products using JSON parsing
const products = JSON.parse(document.getElementById("products").text);

// Function to get all the variants by product ID

function getVariantsByProductId(productId) {
  const product = products.find((p) => p.id === productId);
  console.log("Product", product)
  return product ? product.variants : null;
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

// PopUp open method
function openPopup(e) {
  e.currentTarget.parentNode.classList.add('active');
  document.body.addEventListener('click', closePopup)
} 

// applying popup opening function
popupBtns.forEach((btn) => {
  btn.addEventListener("click", openPopup)
})

// PopUp close method
function closePopup (e) {
  e.currentTarget.parentNode.parentNode.classList.remove('active');
    cartMsg.style.opacity = 0;
}

// apllying popup closing function 
closeBtns.forEach((btn) => {
  btn.addEventListener("click", closePopup)
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