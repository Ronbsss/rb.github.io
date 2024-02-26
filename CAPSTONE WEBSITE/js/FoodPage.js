let cartIcon =  document.querySelector('#open-cart')
let cart =  document.querySelector('.cart')
let closeCart =  document.querySelector('#close-cart')

cartIcon.onclick = () => {
  cart.classList.add("active");
}

closeCart.onclick = () => {
  cart.classList.remove("active");
}


const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[0].classList.add('active-btn');
});

allFilterBtns.forEach((a) => {
    a.addEventListener('click', () => {
        showFilteredContent(a);
    });
});

function showFilteredContent(a){
    allFilterItems.forEach((item) => {
        if(item.classList.contains(a.id)){
            resetActiveBtn();
            a.classList.add('active-btn');
              item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function resetActiveBtn(){
    allFilterBtns.forEach((a) => {
        a.classList.remove('active-btn');
    });
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('cart-remove')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
      
  } 
  var quantityInputs = document.getElementsByClassName('cart-quantity')
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('add-cart')
  for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i]
  button.addEventListener('click', addToCartClicked)
  }
}

  function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName("product-title")[0].innerText
  var price = shopItem.getElementsByClassName("price")[0].innerText
  var productImg = shopItem.getElementsByClassName("product-img")[0].src
  addItemToCart(title, price, productImg)
  updateCartTotal()
}

function addItemToCart(title, price, productImg) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-box')
  var cartItems = document.getElementsByClassName('cart-content')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-product-title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }
  var cartRowContents = `
  <img src="${productImg}" alt="" class="cart-img">
  <div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity">
  </div>
  <i class='fa-solid fa-trash cart-remove'></i>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-content')[0]
  var cartRows = cartItemContainer.getElementsByClassName("cart-box");
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
      var price = parseFloat(priceElement.innerText.replace('₱', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)

      document.getElementsByClassName('total-price')[0].innerText = '₱' + total
  }
  //total = Math.round(total * 100) / 100
  
} 
