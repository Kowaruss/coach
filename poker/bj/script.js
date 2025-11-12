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
let targetScore = 0;

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

// Функция генерации целевого числа (14-21)
function generateTargetScore() {
    const scores = [14, 15, 16, 17, 18, 19, 20, 21];
    // Исключаем BJ (комбинация из двух карт дающая 21)
    const validScores = scores.filter(score => score !== 21 || Math.random() > 0.3);
    targetScore = validScores[Math.floor(Math.random() * validScores.length)];
}

// Функция подсчета очков (стандартные правила блекджека)
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
    
    // Превращаем тузы в 11 если это улучшает руку
    for (let i = 0; i < aces; i++) {
        if (score + 10 <= 21) {
            score += 10; // Туз становится 11 (1 + 10)
        }
    }
    
    return score;
}

// Функция поиска комбинации из 3-4 карт для целевого числа
function findCardCombination() {
    let attempts = 0;
    const maxAttempts = 1000;
    const numCards = Math.random() < 0.5 ? 3 : 4; // Только 3 или 4 карты
    
    while (attempts < maxAttempts) {
        // Берем случайные карты из колоды
        const combination = [];
        const tempDeck = [...deck];
        
        for (let i = 0; i < numCards; i++) {
            if (tempDeck.length === 0) break;
            const randomIndex = Math.floor(Math.random() * tempDeck.length);
            combination.push(tempDeck.splice(randomIndex, 1)[0]);
        }
        
        // Проверяем что комбинация дает нужное число
        const score = calculateScore(combination);
        if (score === targetScore && 
            combination.length === numCards &&
            !(combination.length === 2 && score === 21)) {
            return combination;
        }
        
        attempts++;
    }
    
    // Если не нашли, пробуем с другим количеством карт
    console.log('Не удалось найти комбинацию, пробуем снова');
    return findCardCombination();
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
    
    // Смещение для каждой следующей карты
    const offsetX = index * -visibleWidth; // Смещение влево на видимую ширину
    const offsetY = index * visibleHeight; // Смещение вниз на видимую высоту
    
    // Первая карта смещена на 150% вправо от центра
    const firstCardOffset = baseWidth * 1.5; // 120px вправо от центра
    
    cardElement.style.left = `calc(50% + ${firstCardOffset + offsetX}px)`;
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
    
    // Через заданное время переворачиваем карты
    setTimeout(() => {
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
    
    // Смещение первой карты (150% от базовой ширины)
    const firstCardOffset = 80 * 1.5 * scale;
    
    cardElements.forEach((cardElement, index) => {
        const offsetX = index * -visibleWidth;
        const offsetY = index * visibleHeight;
        
        cardElement.style.transform = `scale(${scale})`;
        cardElement.style.left = `calc(50% + ${firstCardOffset + offsetX}px)`;
        cardElement.style.top = `${offsetY}px`;
    });
}

// Функция генерации нового примера
function generateNewExample() {
    createDeck();
    generateTargetScore();
    currentCards = findCardCombination();
    showCards();
    hideAnswer();
}

// Функция показа ответа
function showAnswer() {
    const score = calculateScore(currentCards);
    scoreValueElement.textContent = score;
    answerElement.classList.add('visible');
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
