import { menuArray } from './data.js'
const menuPage = document.getElementById('menu-page')
const payForm = document.getElementById('pay-form')
const confirmOrderPage = document.getElementById('confirm-order-page')

let orderedItems = []

// This function will get hold of the pay button, prevent the default function of the form submit button with 'e.preventDefault()'
payForm.addEventListener('submit', function(e){
    e.preventDefault()                               
    const cardDetailsForm = new FormData(payForm)
    const buyerNameOnCard = cardDetailsForm.get('buyerNameOnCard')
    document.getElementById('order-msg').innerHTML = 
    `Thanks, ${buyerNameOnCard.charAt(0).toUpperCase()}${buyerNameOnCard.slice(1)}! Your order is on the way!`
    document.getElementById('order-msg').style.display = 'block'
    document.getElementById('pay-form').style.display = 'none'
    document.getElementById('buyerNameOnCard').value = ``
    document.getElementById('cardNumber').value = ``
    document.getElementById('cvv').value = ``
    orderedItems.splice(0, orderedItems.length)
    confirmOrderPage.innerHTML = ``   
})

// This gets hold of all the clicks except the form pay/submit button
document.addEventListener('click', function(e){
    if (e.target.dataset.addbtn) {                //this takes hold of the add item button using data attributes
        handleAddBtn(e.target.dataset.addbtn) 
        document.getElementById('order-msg').style.display = 'none'
    }
    else if (e.target.dataset.remove){            //this takes hold of the remove item button using data attributes
        handleRemoveBtn(e.target.dataset.remove)
    }
    else if (e.target.id == "complete-order-btn"){
        document.getElementById('pay-form').style.display = 'flex'
    }
})

// This function iterates over the menuArray holding the individual objects, 
// gets hold of the particular object that was clicked by matching the 'uuid' with 
// the 'uuid' that was returned when the add item button is clicked by passing the parameter, 'addBtnId'.
// Then pushes the matched object to a new array, 'orderedItems' and renders the output to the page.
function handleAddBtn(addBtnId){
    const orderBtn = menuArray.filter(function(menu){
        return menu.uuid === addBtnId
    })[0]
    orderedItems.push(orderBtn)
    render()
}

// With the 'index' parameter, the 'remove' button will get hold of the added item, 
// then it will be removed with the array slicing method.
function handleRemoveBtn(index){
    orderedItems.splice(index, 1)
    render()

// This clears the 'confirmOrderPage' when all the items has been sliced out from the 'orderedItems' array
    if (orderedItems.length === 0){
        confirmOrderPage.innerHTML = ``
    }
}

// Menu page rendering area
menuArray.forEach(function(menu){
    menuPage.innerHTML += 
    `
    <section class="menu-display">
            <div class="emoji">
                <h2>${menu.emoji}</h2>
            </div>
            <div class="menu-text">
                <h2>${menu.name}</h2>
                <p class="ingredients">${menu.ingredients}</p>
                <p>$${menu.price}</p>
            </div>
            <div class="plus-btn">
                <i class="fa-light fa-plus" data-addbtn="${menu.uuid}"></i>
            </div>
    </section>
    `
})

// This holds the html of the confirm order page
function orderedItemsLists(){
    let orderHtml = ``

    orderHtml = 
    `
    <section>
        <h2 class="your-order">Your Order</h2>
        <div class="name-area">
            <h2 id="menu-name"></h2>
            <h2 id="price"></h2>
        </div>
        <div class="total-price">
            <h2>Total price:</h2>
            <span id="total-price"></span>
        </div>
            <button id="complete-order-btn">Complete order</button>
    </section>
    `
    return orderHtml
}

// This function renders the confirm order page when called. 
// Data attribute is used to grab the remove button using the array 'index' method and 
// the index as the data id to identify the particular index of the added item.
function render(){
    let totalPrice = 0
    confirmOrderPage.innerHTML = orderedItemsLists()
    const newOrder = orderedItems.filter(function(menu, index){
        totalPrice += menu.price
        document.getElementById('menu-name').innerHTML += 
        `<h2>${menu.name}<span id="remove-btn" data-remove="${index}">remove</span></h2>`
        document.getElementById('price').innerHTML += `<h2>$${menu.price}</h2>`
        document.getElementById('total-price').innerHTML = `<h2>$${totalPrice}</h2>`
    })
    return newOrder
}