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
    forRenderMenuesTemp(mainMenuesRef, sideDishesRef, saladsRef);
    loadBasket();
    calcAll();
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
    ifAddChoiceTemp(selectedMenu, basketItem);
    forAddChoiceTemp(choiceContainerRef);
    calcBasketSumm();
    calcDeliveryCost();
    calcTotal();
};

function basketAdd(i) {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    ifBasketAddTemp(i)
    localStorage.setItem('basket-items', JSON.stringify(myBasket));
    choiceContainerRef.innerHTML = "";
    calcAll();
};

function basketRemove(i) {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    ifBasketRemoveTemp(i)
    localStorage.setItem('basket-items', JSON.stringify(myBasket));
    choiceContainerRef.innerHTML = "";
    calcAll();
};

function deleteItem(i) {
    let choiceContainerRef = document.getElementById("sr-calculating-main-container");
    let selectedMenu = myBasket[i];
    let basketIndex = myBasket.findIndex(item => item.name === selectedMenu.name);
    let actualBasketSummRef = document.getElementById("actual-summ");
    let endSummRef = document.getElementById("end-summ");
    ifDeleteItemTemp(basketIndex, actualBasketSummRef, endSummRef);
    localStorage.setItem('basket-items', JSON.stringify(myBasket));
    choiceContainerRef.innerHTML = "";
    calcAll();
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