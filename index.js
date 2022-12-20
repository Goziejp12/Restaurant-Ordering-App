import { menuArray } from './data.js'
const menuPage = document.getElementById('menu-page')

let orderedItems = []

document.addEventListener('click', function(e){
    if (e.target.dataset.addbtn) {
        handleAddBtn(e.target.dataset.addbtn) 
    }
    else if (e.target.id == "remove-btn"){
        handleRemoveBtn()
    }
    else if (e.target.id == "complete-order-btn"){
        document.getElementById('pay-form').style.display = 'flex'
    }
    else if (e.target.id == "pay-btn"){
        console.log('pay')
    }
})

function handleAddBtn(addBtnId){
    const orderBtn = menuArray.filter(function(menu){
        return menu.uuid === addBtnId
    })[0]
    orderedItems.push(orderBtn)
    render() 
}

function handleRemoveBtn(){
    console.log('remove')
}

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

function orderedItemsLists(){
    let orderHtml = ``

    orderHtml = 
    `
    <section class="confirm-order">
        <h2 class="your-order">Your Order</h2>
        <div class="name-area" id="name-area">
            <h2 id="menu-name"></h2>
            <h2 class="price" id="price"></h2>
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

function render(){
    let totalPrice = 0
    document.getElementById('confirm-order-page').innerHTML = orderedItemsLists()
    const newOrder = orderedItems.filter(function(menu){
        totalPrice += menu.price
        document.getElementById('menu-name').innerHTML += `<h2>${menu.name}<span><button id="remove-btn">remove</button></span></h2>`
        document.getElementById('price').innerHTML += `<h2>$${menu.price}</h2>`
        document.getElementById('total-price').innerHTML = `<h2>$${totalPrice}</h2>`
    })
    return newOrder
}




