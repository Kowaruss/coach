// Настройки по умолчанию
let settings = {
    cardSize: 100, // в процентах (100-140 с шагом 10)
    showTime: 3 // в секундах
};

// Элементы DOM
const cardsContainer = document.getElementById('cardsContainer');
const answerElement = document.getElementById('answer');
const scoreValueElement = document.getElementById('scoreValue');
const answerPlaceholder = document.getElementById('answerPlaceholder');
const actionBtn = document.getElementById('actionBtn');
const settingsModal = document.getElementById('settingsModal');
const settingsButton = document.getElementById('settingsBtn');
const cancelSettingsBtn = document.getElementById('cancelSettings');
const saveSettingsBtn = document.getElementById('saveSettings');
const decreaseSizeBtn = document.getElementById('decreaseSize');
const increaseSizeBtn = document.getElementById('increaseSize');
const sizeValueElement = document.getElementById('sizeValue');
const showTimeInput = document.getElementById('showTime');
const timeValueElement = document.getElementById('timeValue');

// Данные колоды
const suits = ['♥', '♦', '♣', '♠'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let currentCards = [];

// Переменная для управления таймером переворота
let flipTimer = null;

// Значения карт для BJ (стандартные правила)
const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 1 // A считается как 1, но может стать 11
};

// Функция создания колоды (6 колод)
function createDeck() {
    deck = [];
    for (let deckCount = 0; deckCount < 6; deckCount++) {
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
    }
    shuffleDeck(deck);
}

// Функция перемешивания колоды
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Функция подсчёта очков (с учётом тузов)
function calculateScore(cards) {
    let score = 0;
    let aces = 0;
    
    // Сначала считаем все карты, тузы как 1
    for (let card of cards) {
        if (card.value === 'A') {
            aces++;
            score += 1;
        } else {
            score += cardValues[card.value];
        }
    }
    
    // Превращаем тузы в 11 если это улучшает руку (не даёт перебор)
    for (let i = 0; i < aces; i++) {
        if (score + 10 <= 21) {
            score += 10; // Туз становится 11 (1 + 10)
        }
    }
    
    return score;
}

// Функция проверки запрещённых комбинаций
function isForbiddenCombination(cards) {
    // Проверяем только первые две карты
    if (cards.length < 2) return false;
    
    const firstCard = cards[0];
    const secondCard = cards[1];
    
    // Если первая карта туз - нельзя чтобы вторая была 10/J/Q/K
    if (firstCard.value === 'A') {
        const isTen = ['10', 'J', 'Q', 'K'].includes(secondCard.value);
        if (isTen) return true;
    }
    
    // Если первая карта 10/J/Q/K - нельзя чтобы вторая была туз
    if (['10', 'J', 'Q', 'K'].includes(firstCard.value)) {
        if (secondCard.value === 'A') return true;
    }
    
    return false;
}

// Функция поиска комбинации для целевого числа
function findCombinationForTarget(targetScore, numCards) {
    let attempts = 0;
    const maxAttempts = 1000;
    
    while (attempts < maxAttempts) {
        // Берём случайные карты из колоды
        const combination = [];
        const tempDeck = [...deck];
        
        for (let i = 0; i < numCards; i++) {
            if (tempDeck.length === 0) break;
            const randomIndex = Math.floor(Math.random() * tempDeck.length);
            combination.push(tempDeck.splice(randomIndex, 1)[0]);
        }
        
        // Проверяем запрещённые комбинации
        if (isForbiddenCombination(combination)) {
            attempts++;
            continue;
        }
        
        // Проверяем что сумма даёт целевое число
        const score = calculateScore(combination);
        if (score === targetScore) {
            return combination;
        }
        
        attempts++;
    }
    
    return null; // Не нашли подходящую комбинацию
}

// Функция определения цвета масти
function getSuitColor(suit) {
    return (suit === '♥' || suit === '♦') ? 'suit-red' : 'suit-black';
}

// Функция создания HTML карты
function createCardElement(card, index, isBack = false) {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${isBack ? 'card-back' : 'card-front'}`;
    
    // Базовые размеры карты при 100%
    const baseWidth = 80;
    const baseHeight = 120;
    
    // Наезд 70% - видимая часть 30%
    const visibleWidth = baseWidth * 0.3; // 24px видимой ширины
    const visibleHeight = baseHeight * 0.3; // 36px видимой высоты
    
    // Вторая карта по центру, остальные смещаются относительно неё
    // Для 3 карт: индексы 0,1,2 → позиции: +1, 0, -1
    // Для 4 карт: индексы 0,1,2,3 → позиции: +1, 0, -1, -2
    const positionIndex = index - 1;
    const offsetX = positionIndex * -visibleWidth; // Смещение по горизонтали
    const offsetY = index * visibleHeight; // Смещение вниз
    
    // Позиционируем от левого края контейнера
    cardElement.style.left = `calc(50% + ${offsetX}px)`;
    cardElement.style.top = `${offsetY}px`;
    cardElement.style.zIndex = index;
    
    if (!isBack) {
        cardElement.innerHTML = `
            <div class="card-corner ${getSuitColor(card.suit)}">
                ${card.value}<br>${card.suit}
            </div>
            <div class="card-suit ${getSuitColor(card.suit)}">${card.suit}</div>
            <div class="card-corner bottom ${getSuitColor(card.suit)}">
                ${card.value}<br>${card.suit}
            </div>
        `;
    }
    
    return cardElement;
}

// Функция отображения карт
function showCards() {
    cardsContainer.innerHTML = '';
    
    currentCards.forEach((card, index) => {
        const cardElement = createCardElement(card, index, false);
        cardsContainer.appendChild(cardElement);
    });
    
    // Применяем размер карт
    updateCardSize();
    
    // Останавливаем предыдущий таймер если он есть
    if (flipTimer) {
        clearTimeout(flipTimer);
        flipTimer = null;
    }
    
    // Запускаем новый таймер для переворота карт
    flipTimer = setTimeout(() => {
        flipCards();
    }, settings.showTime * 1000);
}

// Функция переворота карт (одновременно)
function flipCards() {
    const cardElements = cardsContainer.querySelectorAll('.card');
    
    // Все карты переворачиваются одновременно
    cardElements.forEach((cardElement) => {
        cardElement.classList.remove('card-front');
        cardElement.classList.add('card-back');
        cardElement.innerHTML = '';
    });
    
    // Очищаем таймер после переворота
    flipTimer = null;
}

// Функция обновления размера карт (100-140% с шагом 10)
function updateCardSize() {
    const cardElements = cardsContainer.querySelectorAll('.card');
    const scale = settings.cardSize / 100;
    
    // Базовые размеры с учетом масштаба
    const scaledWidth = 80 * scale;
    const scaledHeight = 120 * scale;
    
    // Видимая часть 30% от масштабированных размеров
    const visibleWidth = scaledWidth * 0.3;
    const visibleHeight = scaledHeight * 0.3;
    
    cardElements.forEach((cardElement, index) => {
        // Вторая карта по центру, остальные смещаются относительно неё
        const positionIndex = index - 1;
        const offsetX = positionIndex * -visibleWidth;
        const offsetY = index * visibleHeight;
        
        cardElement.style.transform = `translate(-50%, 0) scale(${scale})`;
        cardElement.style.left = `calc(50% + ${offsetX}px)`;
        cardElement.style.top = `${offsetY}px`;
    });
}

// Функция генерации нового примера
function generateNewExample() {
    createDeck();
    
    // Случайное число от 13 до 26
    const targetScore = Math.floor(Math.random() * 14) + 13; // 13-26
    
    // Случайно выбираем 3 или 4 карты
    const numCards = Math.random() < 0.5 ? 3 : 4;
    
    // Ищем комбинацию для целевого числа
    currentCards = findCombinationForTarget(targetScore, numCards);
    
    // Если не нашли, пробуем с другим количеством карт
    if (!currentCards) {
        const alternativeNumCards = numCards === 3 ? 4 : 3;
        currentCards = findCombinationForTarget(targetScore, alternativeNumCards);
    }
    
    // Если всё равно не нашли, генерируем новое число
    if (!currentCards) {
        generateNewExample();
        return;
    }
    
    showCards();
    hideAnswer();
}

// Функция показа ответа
function showAnswer() {
    const score = calculateScore(currentCards);
    
    if (score > 21) {
        scoreValueElement.textContent = 'много';
    } else {
        scoreValueElement.textContent = score;
    }
    
    answerElement.classList.add('visible');
    
    // Останавливаем таймер переворота при показе ответа
    if (flipTimer) {
        clearTimeout(flipTimer);
        flipTimer = null;
    }
}

// Функция скрытия ответа
function hideAnswer() {
    scoreValueElement.textContent = '';
    answerElement.classList.remove('visible');
}

// Инициализация ActionButton
let actionButton;

// Обработчики событий для настроек
settingsButton.addEventListener('click', function() {
    sizeValueElement.textContent = `${settings.cardSize}%`;
    showTimeInput.value = settings.showTime;
    timeValueElement.textContent = settings.showTime;
    settingsModal.style.display = 'flex';
});

cancelSettingsBtn.addEventListener('click', function() {
    settingsModal.style.display = 'none';
});

saveSettingsBtn.addEventListener('click', function() {
    settingsModal.style.display = 'none';
    updateCardSize();
});

// Управление размером карт (100-140% с шагом 10)
decreaseSizeBtn.addEventListener('click', function() {
    if (settings.cardSize > 100) {
        settings.cardSize -= 10;
        sizeValueElement.textContent = `${settings.cardSize}%`;
    }
});

increaseSizeBtn.addEventListener('click', function() {
    if (settings.cardSize < 140) {
        settings.cardSize += 10;
        sizeValueElement.textContent = `${settings.cardSize}%`;
    }
});

// Обновление значения времени
showTimeInput.addEventListener('input', function() {
    timeValueElement.textContent = this.value;
    settings.showTime = parseFloat(this.value);
});

// Закрыть модальное окно при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем экземпляр ActionButton
    actionButton = new ActionButton(
        actionBtn,
        showAnswer,         // callback для показа ответа
        generateNewExample  // callback для следующего примера
    );
    
    // Генерируем первый пример
    generateNewExample();
});
