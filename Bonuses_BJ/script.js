const player = document.getElementById("playerCards");
const dealer = document.getElementById("dealerCards");
const answer = document.getElementById("answer");
const btn = document.getElementById("btn");

const zone1 = document.getElementById("zone1");
const zone3 = document.getElementById("zone3");

const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");

const SUITS = ["♠","♥","♦","♣"];
const RANKS = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

let shoe = [];

// ---------- СОЗДАНИЕ 6 КОЛОД ----------
function createShoe() {
    shoe = [];
    for (let d = 0; d < 6; d++) {
        for (let s of SUITS) {
            for (let r of RANKS) {
                shoe.push({rank: r, suit: s});
            }
        }
    }
    shuffle(shoe);
}

// ---------- ПЕРЕМЕШИВАНИЕ ----------
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ---------- ВЗЯТЬ КАРТУ ----------
function draw() {
    if (shoe.length === 0) createShoe();
    return shoe.pop();
}

// ---------- ЗНАЧЕНИЕ ----------
function value(card) {
    if (card.rank === "A") return 11;
    if (["K","Q","J"].includes(card.rank)) return 10;
    return parseInt(card.rank);
}

// ---------- СУММА С ТУЗАМИ ----------
function sumHand(cards) {
    let sum = 0;
    let aces = 0;

    for (let c of cards) {
        sum += value(c);
        if (c.rank === "A") aces++;
    }

    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }

    return sum;
}

// ---------- ПРОВЕРКА SOFT ----------
function isSoft(cards) {
    let sum = 0;
    let aces = 0;

    for (let c of cards) {
        if (c.rank === "A") aces++;
        sum += value(c);
    }

    return aces > 0 && sum <= 21;
}

// ---------- ОТРИСОВКА ----------
function renderCard(card) {
    const el = document.createElement("div");
    el.className = "card";
    el.innerText = card.rank + card.suit;
    return el;
}

// ---------- ГЕНЕРАЦИЯ ДИЛЕРА ----------
function generateDealer() {
    const count = Math.floor(Math.random()*6)+3; // 3-8
    let cards = [];

    // генерим до <17 и без soft 17
    while (cards.length < count-1) {
        const c = draw();
        const test = [...cards, c];
        const s = sumHand(test);

        if (s < 17 && !(s === 17 && isSoft(test))) {
            cards.push(c);
        }
    }

    // последняя карта → перебор
    let last;
    do {
        last = draw();
    } while (sumHand([...cards, last]) <= 21);

    cards.push(last);

    return cards;
}

// ---------- ГЕНЕРАЦИЯ ----------
function generate() {

    player.innerHTML = "";
    dealer.innerHTML = "";
    answer.classList.add("hidden");
    btn.innerText = "Показать ответ";

    zone1.classList.add("hidden");
    zone3.classList.add("hidden");

    c1.classList.remove("active");
    c2.classList.remove("active");
    c3.classList.remove("active");

    const r = Math.floor(Math.random()*4)+1;

    // игрок
    player.appendChild(renderCard(draw()));
    player.appendChild(renderCard(draw()));

    if (r === 1) {
        c3.classList.add("active");

        const cards = generateDealer();

        cards.forEach(c => dealer.appendChild(renderCard(c)));

        const count = cards.length;

        if (count === 3 || count === 4) answer.innerText = "Ответ: 2";
        else if (count === 5) answer.innerText = "Ответ: 4";
        else if (count === 6) answer.innerText = "Ответ: 15";
        else if (count === 7) answer.innerText = "Ответ: 50";
        else if (count === 8) answer.innerText = "Ответ: 250";
    }

    else if (r === 2) {
        c2.classList.add("active");
        dealer.appendChild(renderCard(draw()));
        answer.innerText = "Ответ";
    }

    else if (r === 3) {
        c1.classList.add("active");
        dealer.appendChild(renderCard(draw()));
        answer.innerText = "Ответ";
    }

    else if (r === 4) {
        c1.classList.add("active");

        zone1.classList.remove("hidden");
        zone3.classList.remove("hidden");

        for (let i=0;i<2;i++) {
            zone1.appendChild(renderCard(draw()));
            zone3.appendChild(renderCard(draw()));
        }

        answer.innerText = "Ответ";
    }
}

// ---------- КНОПКА ----------
btn.addEventListener("click", () => {
    if (answer.classList.contains("hidden")) {
        answer.classList.remove("hidden");
        btn.innerText = "Следующий пример";
    } else {
        generate();
    }
});

// ---------- СТАРТ ----------
createShoe();
generate();
