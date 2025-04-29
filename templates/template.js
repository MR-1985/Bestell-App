function showMenueTemp(names, description, price, i, dish) {
    return `
<div class="sl-menues pt10 pb10 pl10">
    <div class=" sl-menue-name fs20">
        <span>${names}</span>
        <div class="add-button-container">
    <span class="add-button" onclick='addChoice(${i}, ${JSON.stringify(dish)})'>
        +
    </span>
</div>
    </div>
    <div class="sl-description-price">
        <span>${description}</span>
    </div>
    <div class="sl-description-price">
        <span>${price} €</span>
    </div>
</div>`
};

function showChoiceTemp(basketMenu, i) {
    return `
<div id = "placeholder" class = "d-none">
    Der warenkorb ist noch leer. <br> Wähle deine Menüs.
</div>

<div id = "sr-calculating${i}" class=" mt10">
    <div id="menue-name" >
        ${basketMenu.name} 
    </div>
    <div class="view-order">
        <div id="-button" onclick='basketRemove(${i})' class="btn mr10">
            -
        </div>
        <div id="count-${i}" >
        </div>
        <div id="+-button" onclick='basketAdd(${i})' class="btn ml10 mr10">
            +
        </div>
        <div id="price-${i}" class="mr7">
            ${basketMenu.price.toFixed(2)+" €"}
        </div>
        <div id="trash" onclick='deleteItem(${i})' class="mr10"><img src="./assets/icons/trash-bin.PNG" alt="Papierkorb">
        </div>
    </div>
</div>`
};

function returnCountTemp(count){
    return `${count}`
};
