// Cart
let carticon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close-cart");
// Open Cart
carticon.onclick = () => {
    cart.classList.add("active");
};
// Close Cart
closecart.onclick = () => {
    cart.classList.remove("active");
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
    button.addEventListener("click", removeCartItems);


 }
//  Quantity Changes
var quantityInputs = document.getElementsByClassName("cart-quantity")
for (var i = 0; i < quantityInputs.length; i++){
    var input =quantityInputs[i]
    input.addEventListener("change",quantityChanged);
}
// Add To Cart
var addcart = document.getElementsByClassName('add-cart')
for (var i = 0; i < addcart.length; i++){
 var button = addcart[i]
 button.addEventListener("click",addcartcliked);   
 }
  //Buy Button work
  document
  .getElementsByClassName("btn-buy")[0]
  .addEventListener("click",buyButtonClicked);
}
//Buy Button
function buyButtonClicked(){
  alert("Your Order is placed")
  var cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal(); 
}

//Remove Items From Cart 
function removeCartItems(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updatetotal();
}

//Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
updatetotal();
}

let cartShopBox;

// Add To Cart
function addcartcliked(event) {
  const button = event.target;
  const shopProducts = button.parentElement;
  const title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  const price = shopProducts.getElementsByClassName("price")[0].innerText;
  const productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  cartShopBox = addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  const newCartShopBox = document.createElement("div");
  newCartShopBox.classList.add("cart-box");

  const cartItems = document.getElementsByClassName("cart-content")[0];
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
      <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- Remove Cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>
  `;
  newCartShopBox.innerHTML = cartBoxContent;
  cartItems.append(newCartShopBox);
  newCartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  newCartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  return newCartShopBox;
}

// Define removeCartItem function
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
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



    