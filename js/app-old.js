var itemID = 2;

// show cart
(() => {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');
  cartInfo.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  });
})();

// add items to cart
(() => {
  const cartBtn = document.querySelectorAll('.store-item-icon');
  cartBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3;
        let partialPath = fullPath.slice(pos);

        const item = {};
        item.img = `./img-cart${partialPath}`;
        item.name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
        item.price = price.slice(1).trim();
        item.id = event.target.parentElement.parentElement.id;
        const cartItem = document.createElement('div');
        cartItem.id = itemID;
        console.log(cartItem);
        console.log(cartItem.id);
        cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
        cartItem.innerHTML = 
        `
        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="item-text">
          <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
          <span>$</span>
          <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
        </div>
        <a href="#" data-id='${item.id}' class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </a>
        `;
        itemID++;

        // Select cart
        const cart = document.getElementById('cart');
        const total = document.querySelector('.cart-total-container');
        cart.insertBefore(cartItem, total);
        
        const confirm = document.getElementById('confirmation');
        confirm.classList.add('showConfirmation');
        setTimeout(() => {
          confirm.classList.remove('showConfirmation')
        },4000);
        showTotals();
      }
    });
  });
  // Update the value shown on the cart
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach((item) => { 
      total.push(parseFloat(item.textContent));
    });
    const totalMoney = total.reduce((acc, curr) => { return acc+=curr; },0)

    document.getElementById('cart-total').textContent = totalMoney.toFixed(2);
    document.querySelector('.item-total').textContent = totalMoney.toFixed(2);
    document.getElementById('item-count').textContent = total.length;
  }
})();
/*
	deleteExpense(element) {
		let id = parseInt(element.dataset.id);
		let parent = element.parentElement.parentElement.parentElement;
		this.expenseList.removeChild(parent);
		let tempList = this.itemList.filter((item) => { return item.id !== id; });
		this.itemList = tempList;
		this.showBalance();
	}
*/

// remove items from cart
function deleteBtn(item) {
  let id = parseInt(item.parentElement.id);
  let cartItems = document.getElementById("cart");
  //let tempList = cartItems.filter((item) => { return item.id; })
  console.log(cartItems.children[id]);
  cartItems.remove(cartItems.children[id]);
  console.log(cartItems.children[id]);
  console.log(id);
  let tempList = [...cartItems.children];
  console.log(tempList[id-1]);

  //console.log(cartItems);
  //console.log(cartItems.childElementCount(id));
/*
  cartItems.removeChild(parent);
  let tempList = this.itemList.filter((item) => { return item.id !== id; });
  this.itemList = tempList;
  this.showBalance();

  btn.addEventListener('click', (event) => {
    if (event.target.parentElement.classList.contains('cart-item-remove')) {
      console.log(btn.parentElement);
    }
  });*/
};


document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart");
  cartItems.addEventListener("click", (event) => {
		if (event.target.parentElement.classList.contains('cart-item-remove')) {
			deleteBtn(event.target.parentElement);
		}
	});
});