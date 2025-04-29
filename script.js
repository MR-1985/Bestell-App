function loadBasket() {
    const savedBasket = localStorage.getItem('basket-items');
    if (savedBasket) {
        myBasket = JSON.parse(savedBasket);
    }
};

function renderMenues() {
    let mainMenuesRef = document.getElementById("main-menues");
    let sideDishesRef = document.getElementById("side-dishes");
    let saladsRef = document.getElementById("salads");
    mainMenuesRef.innerHTML = "";
    sideDishesRef.innerHTML = "";
    saladsRef.innerHTML = "";
    createMenuItems(mainMenuesRef, sideDishesRef, saladsRef);
    loadBasket();
    calcAll();
};

function createMenuItems(mainMenuesRef, sideDishesRef, saladsRef){
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

function actualBasket() {
    for (let i = 0; i < myBasket.length; i++) {
        let choiceContainerRef = document.getElementById("sr-calculating-main-container");
        let basketMenuActuell = myBasket[i];
        choiceContainerRef.innerHTML += showChoiceTemp(basketMenuActuell, i);
        const count = myBasket[i].count;
        const countRef = document.getElementById(`count-${i}`);
        countRef.innerHTML = removeCountTemp(count);
    }
};

function addChoice(i) {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    let selectedMenu = fullMenu[i];
    let basketItem = myBasket.find(item => item.name === selectedMenu.name);
    localStorage.setItem('basket-items', JSON.stringify(myBasket));
    choiceContainerRef.innerHTML = "";
    changeCountAmount(selectedMenu, basketItem);
    createChoices(choiceContainerRef);
    calcBasketSumm();
    calcDeliveryCost();
    calcTotal();
};

function changeCountAmount(selectedMenu, basketItem){
    if (basketItem) {
        basketItem.count += 1;
        basketItem.amount += 1;
    } else {
        selectedMenu.count = 1;
        selectedMenu.amount = 1;
        myBasket.push(selectedMenu);
    }
};

function createChoices(choiceContainerRef){
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

function basketAdd(i) {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    innerBasketCountUpAmountUp(i)
    localStorage.setItem('basket-items', JSON.stringify(myBasket));
    choiceContainerRef.innerHTML = "";
    calcAll();
};

function innerBasketCountUpAmountUp(i){
    let selectedMenu = myBasket[i];
    let basketIndex = myBasket.findIndex(item => item.name === selectedMenu.name);
    if (basketIndex > -1) {
        let basketInput = myBasket[basketIndex]
        if (basketInput.count > 0) {
            basketInput.count += 1;
            basketInput.amount += 1;
        }
    }
};

function basketRemove(i) {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    innerBasketCountDownAmountDown(i)
    localStorage.setItem('basket-items', JSON.stringify(myBasket));
    choiceContainerRef.innerHTML = "";
    calcAll();
};

function innerBasketCountDownAmountDown(i){
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

function deleteItem(i) {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    let selectedMenu = myBasket[i];
    let basketIndex = myBasket.findIndex(item => item.name === selectedMenu.name);
    let actualBasketSummRef = document.getElementById("actual-summ");
    let endSummRef = document.getElementById("end-summ");
    innerBasketDeletItem(basketIndex, actualBasketSummRef, endSummRef);
    localStorage.setItem('basket-items', JSON.stringify(myBasket));
    choiceContainerRef.innerHTML = "";
    calcAll();
};

function innerBasketDeletItem(basketIndex, actualBasketSummRef, endSummRef){
    if (basketIndex > -1) {
        myBasket.splice(basketIndex, 1);
    }
    if (myBasket.length === 0) {
        endSummRef.innerHTML = actualBasketSummRef.textContent;
    }
};

function calcBasketSumm() {
    let actualBasketSummRef = document.getElementById("actual-summ");
    let summe = 0;
    for (let i = 0; i < myBasket.length; i++) {
        let amount = myBasket[i].amount;
        let price = myBasket[i].price;
        summe += amount * price;
    }
    actualBasketSummRef.innerHTML = summe.toFixed(2) + " €";
};

function calcDeliveryCost() {
    let actualBasketSumm = parseFloat(document.getElementById("actual-summ").textContent);
    let deliverySummRef = document.getElementById("delivery-cost");
    if (actualBasketSumm >= 25.00) {
        deliverySummRef.innerHTML = "0.00 €";
    } else if (actualBasketSumm === 0.00) {
        deliverySummRef.innerHTML = "0.00 €";
    } else {
        deliverySummRef.innerHTML = "2.50 €";
    }
};

function calcTotal() {
    let actualBasketSumm = parseFloat(document.getElementById("actual-summ").textContent);
    let deliverySumm = parseFloat(document.getElementById("delivery-cost").textContent);
    let endSummRef = document.getElementById("end-summ");
    let total = actualBasketSumm + deliverySumm;
    endSummRef.innerHTML = total.toFixed(2) + " €";
};

function calcAll() {
    actualBasket();
    calcBasketSumm();
    calcDeliveryCost();
    calcTotal();
};

function clearBasket() {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    let actualBasketSummRef = document.getElementById("actual-summ");
    let deliverySummRef = document.getElementById("delivery-cost");
    let endSummRef = document.getElementById("end-summ");
    myBasket = [];
    choiceContainerRef.innerHTML = "";
    actualBasketSummRef.innerHTML = "0.00 €";
    deliverySummRef.innerHTML = "0.00 €";
    endSummRef.innerHTML = "0.00 €";
    localStorage.clear();
    closeOverlay();
};

function showBasket() {
    let overlayRef = document.getElementById('overlay');
    let basketOverlayRef = document.getElementById('sr');
    let body = document.getElementById('body');
    overlayRef.classList.add('d-flex');
    basketOverlayRef.classList.add('basket-overlay');
    body.classList.add('overflow-y-hidden');
};

function closeOverlay() {
    let overlay = document.getElementById('overlay');
    let basketOverlayRef = document.getElementById('sr');
    let body = document.getElementById('body');
    overlay.classList.remove('d-flex');
    basketOverlayRef.classList.remove('basket-overlay');
    body.classList.remove('overflow-y-hidden');
};