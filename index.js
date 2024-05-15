import { menuArray } from './data.js';

const menuContainer = document.getElementById("menu-container");
const orderedItemContainer = document.getElementById("ordered-item-container");
const orderContainer = document.getElementById("order-container");

const orderTotalContainer = document.getElementById("order-total-container");
const cardDetailsContainer = document.getElementById("card-details-container");
const successMessage = document.getElementById("success-message");
const cardDetailsForm = document.getElementById("card-details-form")


let arrayOfOrders = [];



document.addEventListener("click", function(event){
    
    if(event.target.dataset.add){
      
        arrayOfOrders.push(selectedItem(event.target.dataset.item))
        
        orderedItemContainer.innerHTML = renderOrderedItems(arrayOfOrders);
        orderTotalContainer.innerHTML = `  
                                        <p class="total-price-title"           id="total-price-title">Total Price:</p>
                                                <p class="total-price" id="total-price">
                                                $${getTotalOfYourOrder(arrayOfOrders)}
                                            </p>`
        
    }
    
    else if(event.target.dataset.remove){
        
       const itemIdToRemove = event.target.dataset.remove;
        removeItemFromOrder(itemIdToRemove);
      
    }
    
    else if(event.target.dataset.completeBtn){
        
        if(arrayOfOrders.length > 0){
            cardDetailsContainer.style.display = "block";
        } 
        
        
    }
    
    else if(event.target.dataset.pay){
        // not able to get rid of form after it is submitted and show succes message
       
        event.preventDefault();
        const formData = new FormData(cardDetailsForm);
        // console.log(`Your order is complete and its on its way, ${formData.get("name")}`);
        successMessage.innerHTML = `Your order is complete and on its way, ${formData.get("name")}`
        successMessage.style.display='block';
        cardDetailsContainer.style.display = "none";
        orderContainer.innerHTML = ``;
        
    }
})





function removeItemFromOrder(itemIdToRemove) {
    // Find the index of the item with the matching ID
    const indexToRemove = arrayOfOrders.findIndex(item => item.id === Number(itemIdToRemove));
    
    // If the item is found, remove it from the array
    if (indexToRemove !== -1) {
        arrayOfOrders.splice(indexToRemove, 1);
        
        // Update the UI
        orderedItemContainer.innerHTML = renderOrderedItems(arrayOfOrders);
        if(arrayOfOrders.length > 0){
            orderTotalContainer.innerHTML = `  
                                        <p class="total-price-title"           id="total-price-title">Total Price:</p>
                                                <p class="total-price" id="total-price">
                                                $${getTotalOfYourOrder(arrayOfOrders)}
                                            </p>`;
        }
        else{
           orderTotalContainer.innerHTML = ``; 
        }
        
    }
}




function selectedItem(itemId){
    const selectedItemObj = menuArray.filter(function(item){
        
        return item.id === Number(itemId);
    })[0];
    return selectedItemObj;
}





function getTotalOfYourOrder(arr){
    const totalAmount = arr.reduce(function(total, current){
        return total + current.price;
    },0)
    
    return totalAmount;
    
    
    
    
}



function renderOrderedItems(array){
    let orderHtml = " ";
    
    array.forEach(function(item){
        const {name, ingredients, id, price, emoji} = item;
        orderHtml += `
                      <div class="ordered-item" id="ordered-item">
                            <div class="itemAndRemoveBtn">
                                <p class="item-name" id="item-name">${name}</p>
                                <button class="remove-btn" id="remove-btn" data-remove= "${id}">remove</button>
                            </div>
                        
                        <p class="item-price" id="item-price">$${price}</p>
                      </div>`
    })
    
    return orderHtml;
    
}



function itemsToSell(){
    const itemsToRender = menuArray.map(function(item){
        const {name, ingredients, id, price, emoji} = item;
        return ` 
            <div class="item-container">
                <div class="menu-item">${emoji}</div>
                <div class="item-desc">
                    <h2 class="item">${name}</h2>
                    <p class="item-ingredients">${ingredients.join(",")}</p>
                    <p class="item-price">$${price}</p>
                </div>
                <div>
                    <button class="add-btn" data-item="${id}" data-add="${id}">+</button>
                </div> 
            </div>
            <hr>
        `;
    }).join("");
    return itemsToRender;
}

menuContainer.innerHTML = itemsToSell();