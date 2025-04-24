function forRenderMenuesTemp(mainMenuesRef, sideDishesRef, saladsRef){
    for (let i = 0; i < fullMenu.length; i++) {
        let names = fullMenu[i].name;
        let description = fullMenu[i].description;
        let price = fullMenu[i].price.toFixed(2);
        let category = fullMenu[i].category;
        if (category === "mainMenu") {
            mainMenuesRef.innerHTML += showMenueTemp(names, description, price, i, "mainMenu");
        } else if (category === "sideDish") {
            sideDishesRef.innerHTML += showMenueTemp(names, description, price, i, "sideDish");
        } else {
            saladsRef.innerHTML += showMenueTemp(names, description, price, i, "salads");
        }
    }
};

function ifAddChoiceTemp(selectedMenu, basketItem){
    if (basketItem) {
        basketItem.count += 1;
        basketItem.amount += 1;
    } else {
        let newMenu = {...selectedMenu, count: 1, amount: 1};
        myBasket.push(newMenu);
    }
};

function forAddChoiceTemp(choiceContainerRef){
    for (let i = 0; i < myBasket.length; i++) {
        const basketMenu = myBasket[i];
        if (basketMenu) {
            choiceContainerRef.innerHTML += showChoiceTemp(basketMenu, i);
        }
    }
    for (let i = 0; i < myBasket.length; i++) {
        const countRef = document.getElementById(`count-${i}`);
        const count = myBasket[i].count;
        if (countRef) {
            countRef.innerHTML = addCountTemp(count);
        }
    }
};

function ifBasketAddTemp(i){
    let selectedMenu = myBasket[i];
    let basketIndex = myBasket.findIndex(item => item.name === selectedMenu.name);
    if (basketIndex > -1) {
        let basketInput = myBasket[basketIndex]
        if (basketInput.count > 0) {
            basketInput.count += 1;
            basketInput.amount += 1;
        }
        console.log(myBasket);
    }
};

function ifBasketRemoveTemp(i){
    let selectedMenu = myBasket[i];
    let basketIndex = myBasket.findIndex(item => item.name === selectedMenu.name);
    if (basketIndex > -1) {
        let basketInput = myBasket[basketIndex]
        if (basketInput.count > 1) {
            basketInput.count -= 1;
            basketInput.amount -= 1;
        } else {
            myBasket.splice(basketIndex, 1);
        }
    }
};

function ifDeleteItemTemp(basketIndex, actualBasketSummRef, endSummRef){
    if (basketIndex > -1) {
        myBasket.splice(basketIndex, 1);
    }
    if (myBasket.length === 0) {
        endSummRef.innerHTML = actualBasketSummRef.textContent;
    }
};