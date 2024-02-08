// Cart
let carticon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close-cart");

// Open Cart
carticon.onclick = () => {
  cart.classList.add("active");
  hideCartCount(); 
  updateCartCounter();
};

// Close Cart
closecart.onclick = () => {
  cart.classList.remove("active");
  showCartCount(); 
};

// Cart Working Js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded",ready)
}else{
 ready();   
}

// Making Function
function ready(){
 //Remove Items From Cart 
 var removeCartButtons = document.getElementsByClassName("cart-remove")
 console.log(removeCartButtons)
 for (var i = 0; i <removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener("click", removeCartItem);


 }
//  Quantity Changes
var quantityInputs = document.getElementsByClassName("cart-quantity")
for (var i = 0; i < quantityInputs.length; i++){
    var input =quantityInputs[i]
    input.addEventListener("change",quantityChanged);
}
// Add To Cart
var addcart = document.getElementsByClassName("add-cart")
for (var i = 0; i < addcart.length; i++){
 var button = addcart[i]
 button.addEventListener("click",addcartcliked);   
 }
  //Buy Button work
  document
  .getElementsByClassName("btn-buy")[0]
  .addEventListener("click",buyButtonClicked);
}


// Remove Items From Cart 
var removeCartButtons = document.getElementsByClassName("cart-remove");
for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
}


//Buy Button
function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  cartCounter = 0; // Reset the number of items in the cart to 0
  updateCartCountInBalloon(); // Call the new function here
  updatetotal();
  updateCartCounter(); // Add this line to update the cart counter
  hideCartCount(); // Hide the badge after making a purchase or when the cart is empty
}



//Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
updatetotal();
}
let cartCounter = 0;

function updateCartCounter() {
  updateCartCountInBalloon();
}

// Add To Cart
function addcartcliked(event) {
  event.preventDefault();
  const button = event.target;
  const shopProducts = button.parentElement;
  const title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  const price = shopProducts.getElementsByClassName('price')[0].innerText;
  const productImg = shopProducts.getElementsByClassName('product-img')[0].src;

  cartShopBox = addProductToCart(title, price, productImg);
  if (cartShopBox) {
    if (cartCounter === 0) {
      showCartCount();
    }
    cartCounter++;
    updateCartCountInBalloon(); // Call the new function here
    updatetotal();
  }
}



// Add this function to hide the cart count
function hideCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
      cartCount.style.display = 'none';
  }
}

// Add this function to show the cart count
function showCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
      cartCount.style.display = 'inline-block';
  }
}


function updateCartCountInBalloon() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
      cartCount.innerText = cartCounter;

      // Add animation class (e.g., "bounce") for a brief moment
      cartCount.classList.add('bounce');
      setTimeout(() => {
          cartCount.classList.remove('bounce');
      }, 500);

      if (cartCounter <= 0) {
          hideCartCount();
      }
  }
}


// Modify the updateCartCounter function to call updateCartCountInBalloon
function updateCartCounter() {
  updateCartCountInBalloon();
}

function addProductToCart(title, price, productImg, size) {
  const newCartShopBox = document.createElement("div");
  newCartShopBox.classList.add("cart-box");

  const cartItems = document.querySelector(".cart-content");
  const cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

  for (let i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText == title) {
          alert("You have already added this item to the cart");
          return null;
      }
  }

  const cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <div class="size-buttons">
              <button class="size-button" data-size="S">S</button>
              <button class="size-button" data-size="M">M</button>
              <button class="size-button" data-size="L">L</button>
              <button class="size-button" data-size="XL">XL</button>
              <button class="size-button" data-size="XXL">XXL</button>
          </div>
          <input type="number" value="1" class="cart-quantity">
      </div>
      <!-- Remove Cart -->
      <i class='bx bxs-trash-alt cart-remove'></i>
  `;

  newCartShopBox.innerHTML = cartBoxContent;
  cartItems.append(newCartShopBox);

  const sizeButtons = newCartShopBox.querySelectorAll(".size-button");
  sizeButtons.forEach(button => {
      button.addEventListener("click", function () {
          // Handle button click, you can customize this part
          console.log(`Size ${button.dataset.size} clicked for ${title}`);
      });
  });

  newCartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);

  newCartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);

  updateCartCountInBalloon();

  return newCartShopBox;
}

// Define removeCartItem function
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  cartCounter--;
  updateCartCounter();
  updatetotal();
}


//Update Total
function updatetotal() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var parentElement = cartBox.getElementsByClassName("detail-box")[0];
        var priceElement = parentElement.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.value);

        total += price * quantity;
    }

    // Format the total without decimal places
    var formattedTotal = total.toFixed(2).replace(/\.00$/, "");

    document.getElementsByClassName("total-price")[0].innerText = "$" + formattedTotal;
}





    