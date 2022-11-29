const btn = document.getElementById("btn");
const nav = document.getElementById("nav");
const closed = document.getElementById("x-close");


btn.addEventListener("click", () => {
    nav.classList.toggle('active');
    btn.classList.toggle('active');

});

closed.addEventListener("click", () => {
    nav.classList.toggle('active');
    btn.classList.toggle('active');

});

// notification script

const buttons = document.getElementById("buttons");
const container = document.getElementById("container");

// buttons.addEventListener("click", ()=>{
//     createNotification();
// })


function createNotification() {
    const notif = document.createElement("div");
    notif.classList.add("toast");

    notif.innerText = "item is successfully added";

    container.appendChild(notif);

    setTimeout(()=> {
        notif.remove();
    }, 3000);
}

function noCreateNotification() {
    const notif = document.createElement("div");
    notif.classList.add("toast");

    notif.innerText = "item is already in the cart";

    container.appendChild(notif);

    setTimeout(()=> {
        notif.remove();
    }, 3000);
}

function buyCart() {
    const notif = document.createElement("div");
    notif.classList.add("toast");

    notif.innerText = "Thank you for shopping";

    container.appendChild(notif);

    setTimeout(()=> {
        notif.remove();
    }, 3000);
}

function noItem() {
    const notif = document.createElement("div");
    notif.classList.add("toast");

    notif.innerText = "Please check, There is no item in the cart";

    container.appendChild(notif);

    setTimeout(()=> {
        notif.remove();
    }, 3000);
}

// add to cart 

if(document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
}else {
    ready()
}

function ready() {

    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    console.log(removeCartItemButtons);
    for(var i=0; i< removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for(var i=0; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName("product-btn");
    console.log(addToCartButtons);
    for(var i=0;i< addToCartButtons.length; i++){

        var button = addToCartButtons[i];
        // console.log(button);
        button.addEventListener('click', addToCartClicked)
    }
    
    // purchase

    var cartitems = document.getElementsByClassName("see-the-cart-btn");
    for(var i=0;i<cartitems.length; i++){
        var carts = cartitems[i];
        carts.addEventListener('click', getCartDetails)
    }

    var purchaseItem = document.getElementsByClassName("purchase-nav");
    for(var i=0; i< purchaseItem.length; i++){
        var inputs = purchaseItem[i];
        inputs.addEventListener('click', purchaseItemCart);
    }
    

}



function removeCartItem(event) {

    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()

}

function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
    
}

function addToCartClicked(event) {
    var button = event.target;
    console.log(button);
    var shopItem = button.parentElement.parentElement.parentElement;
    console.log(shopItem);
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    // var price = shopItem.getElementsByClassName('price-text')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('image')[0].src;
    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
    // createNotification()

    
    
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    
    var cartItems = document.getElementsByClassName('cart-items')[0];
    console.log(cartItems);
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    
    
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title) {
            noCreateNotification();
            return;
        }
    }
    var cartRowContents = `<div class="cart-flex">
    <div>
        <p class="cart-item-title">${title}</p>
        <img class="cart-item-image" src="${imageSrc}" height="50" width="50">
    </div>
    <div class="cart-price-bottom">
        <p class="cart-price">${price}</p>
    </div>
    <div class="flex-carts">
        <input class="cart-quantity-input" type="number" value="1">
        <button type="button" class="btn-danger">X</button>
    </div>
</div>`;
cartRow.innerHTML = cartRowContents;
cartItems.append(cartRow);
createNotification();
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    
    var cartRows = cartItemContainer.getElementsByClassName('cart-flex');
    var total = 0;
    for(var i=0; i< cartRows.length; i++ ){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        console.log(price);
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        console.log(price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('dollar-nav')[0].innerText = '$' + total;
}

// notification of purchase

function purchaseItemCart() {
    var purchase = document.getElementsByClassName("cart-items")[0];
    
    var cartRows = purchase.getElementsByClassName('cart-flex');
    if(cartRows.length >0) {
        buyCart();
    }
    else{
        noItem();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/products').then((data) => {
        console.log(data);
        if(data.request.status === 200) {
            const products = data.data.products;
            const parentSection = document.getElementById('Products');
            products.forEach(product => {
                const productHtml = `
                
                    <div id="Products">
                    
                    <div class="title-product-div">
                        <h1 class="product-title">${product.title}</h1>
                    </div>
                    <div class="image-product-div">
                        <img class="product-image" src=${product.imageUrl}>
                    </div>
                    <div>
                        <h1 class="product-price">${product.price}</h1>
                    </div>
                    <div id="container"></div>
                        <button onClick="addToCart(${product.id})" class="product-btn"><a class="product-links" href="#">Add to cart</a></button>
                    </div>
                    </div>`
                    parentSection.innerHTML +=productHtml;
            })
        }
    })
})

function addToCart(productId){

    axios.post('http://localhost:3000/cart', {productId : productId})
    .then(response => {
        if(response.status === 200) {
            responseNotifications(response.data.message);
        }else{
            throw new Error(response.data.message);
        }
    })
    .catch((err)=> {
        console.log(err);
        responseNotifications(err);
    })

}

function responseNotifications(message) {
    const container = document.getElementById('container');
    const notif = document.createElement("div");
    notif.classList.add("toast");

    notif.innerText = `${message}`;
    container.appendChild(notif);

    setTimeout(()=> {
        notif.remove();
    }, 3000);
}




function getCartDetails(){
    axios.get('http://localhost:3000/cart')
    .then(response => {
        if(response.status === 200){
            response.data.products.forEach(product => {
                // added
                var cartRow = document.createElement('div');
                //
                const cartContainer = document.getElementsByClassName("cart-items")[0];
                var cartItemNames = cartContainer.getElementsByClassName('cart-item-title');
                for(var i=0; i<cartItemNames.length; i++){
                            if(cartItemNames[i].innerText == product.title) {
                                console.log(cartItemNames[i]);
                                console.log("item is already there");
                                // message = "item is already there";
                                responseNotifications(response.data.message)
                                // noCreateNotification()
                                return;
                            }
                        }
                        
                console.log(cartItemNames);
                cartItemNames  = `<div class="cart-flex">
                <div>
                    <p class="cart-item-title">${product.title}</p>
                    <img class="cart-item-image" src="${product.imageUrl}" height="50" width="50">
                </div>
                <div class="cart-price-bottom">
                    <p class="cart-price">${product.price}</p>
                    <p>${product.cartItem.quantity}</p>
                </div>
                <div class="flex-carts">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button type="button" class="btn-danger">X</button>
                </div>
            </div>`;
            cartRow.innerHTML = cartItemNames;
            cartContainer.append(cartRow);
            })
        }else {

            throw new Error('Something went wrong')

        }
    })
    .catch(err=>{
        responseNotifications(err);
    })
}