let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: "Iphone",
        tag: "iphone",
        price: 24000,
        inCart: 0
    },
    {
        name: "Samsung S",
        tag: "samsungs",
        price: 23000,
        inCart: 0
    },
    {
        name: "Huawey P Pro",
        tag: "huaweyppro",
        price: 22000,
        inCart: 0
    },
    {
        name: "Samsung A",
        tag: "samsunga",
        price: 15000,
        inCart: 0
    },
    {
        name: "Hisense",
        tag: "hisense",
        price: 6000,
        inCart: 0
    },
    {
        name: "Nokia G",
        tag: "nokiag",
        price: 9000,
        inCart: 0
    },
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    console.log( product)
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.tag;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product, action) {

    let cart = localStorage.getItem("totalCost");

    if (action) {
        alert('You remove ' + product.name + ' R' + product.price + '. New balance R' + (cart - product.price));
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);

    } else if (cart != null) {
        cart = parseInt(cart);
        product.price = parseInt(product.price);
        alert('Thank you for your purchase ' + product.name + ' R' + product.price + '. Your new balance will be R' + (cart + product.price))

        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

//-----------discount coupon----------//

function validate(coupon) {
    let discount = localStorage.getItem("validate");
    codes = new Object();
    codes.GoodLuck = 0.05;
    console.log(coupon);
    if (codes[coupon]) {
        window.location.reload()
        discount = parseFloat(0.05);
        window.alert("Coupon Code Accepted! Click the Order button! 5%");
        localStorage.setItem("validate", discount);
    } else {
        window.location.reload()
        discount = parseFloat(0);
        window.alert("Sorry, The Coupon Code you entered is invalid. Please copy and paste!");
        localStorage.setItem("validate", discount);
    }
}

//----------delevery option-----------//

function checkButton() {

    let package = localStorage.getItem("checkButton");
    let delivery1 = document.querySelector('#delivery1');
    let delivery2 = document.querySelector('#delivery2');
    console.log(checkButton);
    if (delivery1.checked) {
        window.location.reload()
        package = parseFloat(500);
        window.alert("Deliver in 2 weeks cost R" + package);
        localStorage.setItem("checkButton", package);
    } else if (delivery2.checked) {
        window.location.reload()
        package = parseFloat(1000);
        window.alert("Deliver in 3 days cost R" + package);
        localStorage.setItem("checkButton", package);
    } else {
        window.location.reload()
        package = parseFloat(0);
        window.alert("free collection" + package);
        localStorage.setItem("checkButton", package);
    }
}

//-----------cart page-------------//

function displayCart() {
    let VAT = 0.03;

    let discount = localStorage.getItem("validate");
    discount = parseFloat(discount);

    let package = localStorage.getItem("checkButton");
    package = parseFloat(package);


    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {

        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML +=
                `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="../images/${item.tag}.jpg" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">R${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">R${item.inCart * item.price},00</div>`;
        });

        let totalVat = cart * VAT;
        let totatIncludingVat = cart + totalVat;
        let totaldiscount = totatIncludingVat * discount;
        let afterdiscount = totatIncludingVat - totaldiscount;
        let afterdelivery = afterdiscount + package;
        productContainer.innerHTML += `
            <div class = "basketTotalContainer">
                <h4 class = "basketTotalTitle" > Total excluding Vat </h4>
                <h4 class="basketTotal"> R${cart},00 </h4>
            </div>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Vat (3%) </h4>
                <h4 class = "basketTotal"> R${totalVat},00 </h4>
            </div>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total including </h4>
                <h4 class = "basketTotal"> R${cart + totalVat},00 </h4>
            </div>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Discount (5%) </h4>
                <h4 class = "basketTotal"> R${totaldiscount},00 </h4>
            </div>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Delivery fee </h4>
                <h4 class = "basketTotal"> R${package},00 </h4>
            </div>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total </h4>
                <h4 class = "basketTotal"> R${afterdelivery},00 </h4>
            </div>
            `

    }

    deleteButtons();
    manageQuantity();

}
//------------hide and show jquery---------------------//

$(document).ready(function () {
    $("#hide").click(function () {
        $(".myform").hide();
    });
    $("#show").click(function () {
        $(".myform").show();
    });
});

jQuery(document).ready(function ($) {
    console.log(456);
});

//-------------drop down menu-------------//

$(function () { // Dropdown toggle
    $('.dropdown-toggle').mouseover(function () {
        $(this).next('.dropdown').slideToggle(3000);
    });

    $(document).mouseover(function (e) {
        let target = e.target;
        if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle'))
        //{ $('.dropdown').hide(); }
        {
            $('.dropdown').slideUp(3000);
        }
    });
});
/*-------------order confirmation------------- */
function order() {
    let generate = Math.floor(Math.random() * 10000);
    alert("Your order was successful recieve your reference number " + generate);
}

/*-------increase/decrease/remove----- */
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();

