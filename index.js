import { menuArray } from './data.js'
const menuPage = document.getElementById('menu-page')
let orderedItems = []

document.addEventListener('click', function(e){
    if (e.target.dataset.addbtn) {
        handleAddBtn(e.target.dataset.addbtn)
    }
})

function handleAddBtn(addBtnId){
    const orderBtn = menuArray.filter(function(menu){
        return menu.uuid === addBtnId
    })[0]
    orderedItems.push(orderBtn)
    render()
    renderT()
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

function renderT(){
    const newOrder = orderedItems.filter(function(menu){
        let count = 0
        document.getElementById('menu-name').innerHTML += `<h2>${menu.name}<span><button>remove</button></span></h2>`
        document.getElementById('price').innerHTML += `<h2>$${menu.price}</h2>`
        document.getElementById('total-price').innerHTML += `<h2>$${menu.price}</h2>`  
    })
    return newOrder
}

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
            <h2 id="total-price"></h2>
        </div>
            <button id="complete-order-btn">Complete order</button>
    </section>
    `
    return orderHtml
}

function render(){
    document.getElementById('confirm-order-page').innerHTML = orderedItemsLists()
}
