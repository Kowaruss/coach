class PokerCombinations {
    constructor() {
        this.timeSlider = document.getElementById('timeSlider');
        this.timeValue = document.getElementById('timeValue');
        this.topCards = document.getElementById('topCards');
        this.middleGroup1 = document.getElementById('middleGroup1');
        this.middleGroup2 = document.getElementById('middleGroup2');
        this.answer = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = [];
        
        this.setupEventListeners();
        this.generateNewExample();
    }
    
    setupEventListeners() {
        this.timeSlider.addEventListener('input', () => {
            this.timeValue.textContent = this.timeSlider.value;
        });
        
        this.actionBtn.addEventListener('click', () => {
            this.handleActionButton();
        });
    }
    
    generateDeck() {
        this.deck = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.deck.push({ rank, suit });
            }
        }
    }
    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    generateNewExample() {
        this.generateDeck();
        this.shuffleDeck();
        
        const selectedCards = this.deck.slice(0, 7);
        this.displayCards(selectedCards);
        this.startTimer();
    }
    
    displayCards(cards) {
        // Очищаем предыдущие карты
        this.topCards.innerHTML = '';
        this.middleGroup1.innerHTML = '';
        this.middleGroup2.innerHTML = '';
        
        // Верхние 2 карты
        for (let i = 0; i < 2; i++) {
            const card = this.createCardElement(cards[i]);
            this.topCards.appendChild(card);
        }
        
        // Средние 5 карт (3 + 2)
        for (let i = 2; i < 5; i++) {
            const card = this.createCardElement(cards[i]);
            this.middleGroup1.appendChild(card);
        }
        for (let i = 5; i < 7; i++) {
            const card = this.createCardElement(cards[i]);
            this.middleGroup2.appendChild(card);
        }
        
        this.currentCards = cards;
        this.answer.classList.remove('show');
        this.answer.textContent = '';
        this.actionBtn.textContent = 'Покажи ответ';
    }
    
    createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // Используем символы мастей
        const suitSymbols = {
            'hearts': '♥',
            'diamonds': '♦', 
            'clubs': '♣',
            'spades': '♠'
        };
        
        cardElement.innerHTML = `
            <div class="card-content">
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit">${suitSymbols[card.suit]}</div>
            </div>
        `;
        
        // Добавляем класс цвета масти
        if (card.suit === 'hearts' || card.suit === 'diamonds') {
            cardElement.classList.add('red');
        } else {
            cardElement.classList.add('black');
        }
        
        return cardElement;
    }
    
    startTimer() {
        const time = parseInt(this.timeSlider.value) * 1000;
        
        this.timer = setTimeout(() => {
            this.flipCards();
        }, time);
    }
    
    flipCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.add('back');
        });
    }
    
    showCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('back');
        });
    }
    
    handleActionButton() {
        if (this.actionBtn.textContent === 'Покажи ответ') {
            this.showCards();
            const combination = this.detectCombination(this.currentCards);
            this.answer.textContent = combination;
            this.answer.classList.add('show');
            this.actionBtn.textContent = 'Следующий пример';
        } else {
            clearTimeout(this.timer);
            this.generateNewExample();
        }
    }

    detectCombination(cards) {
        // Конвертируем карты в числовые значения для анализа
        const numericCards = cards.map(card => {
            const rank = card.rank;
            let value;
            if (rank === 'A') value = 14;
            else if (rank === 'K') value = 13;
            else if (rank === 'Q') value = 12;
            else if (rank === 'J') value = 11;
            else value = parseInt(rank);
            
            return { value, suit: card.suit, rank: card.rank };
        });
        
        // Проверяем комбинации от самой старшей к младшей
        const royalFlush = this.isRoyalFlush(numericCards);
        if (royalFlush) return "Флеш-рояль";
        
        const straightFlush = this.isStraightFlush(numericCards);
        if (straightFlush) return "Стрит-флеш";
        
        const fourOfAKind = this.isFourOfAKind(numericCards);
        if (fourOfAKind) return "Каре";
        
        const fullHouse = this.isFullHouse(numericCards);
        if (fullHouse) return "Фулл-хаус";
        
        const flush = this.isFlush(numericCards);
        if (flush) return "Флеш";
        
        const straight = this.isStraight(numericCards);
        if (straight) return "Стрит";
        
        const threeOfAKind = this.isThreeOfAKind(numericCards);
        if (threeOfAKind) return "Сет";
        
        const twoPairs = this.isTwoPairs(numericCards);
        if (twoPairs) return "Две пары";
        
        const onePair = this.isOnePair(numericCards);
        if (onePair) return onePair;
        
        return "Нет игры";
    }

    // Флеш-рояль: 10,J,Q,K,A одной масти
    isRoyalFlush(cards) {
        const straightFlush = this.isStraightFlush(cards);
        if (!straightFlush) return false;
        
        // Проверяем, что стрит-флеш содержит A, K, Q, J, 10
        const values = straightFlush.map(card => card.value).sort((a, b) => a - b);
        return values[0] === 10 && values[4] === 14;
    }

    // Стрит-флеш: 5 последовательных карт одной масти
    isStraightFlush(cards) {
        // Группируем карты по мастям
        const suits = {};
        cards.forEach(card => {
            if (!suits[card.suit]) suits[card.suit] = [];
            suits[card.suit].push(card);
        });
        
        // Ищем стрит в каждой масти
        for (let suit in suits) {
            if (suits[suit].length >= 5) {
                const straight = this.findStraight(suits[suit]);
                if (straight) return straight;
            }
        }
        return false;
    }

    // Каре: 4 карты одного достоинства
    isFourOfAKind(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        return Object.values(counts).some(count => count === 4);
    }

    // Фулл-хаус: сет + пара
    isFullHouse(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        
        const countsArr = Object.values(counts);
        const hasThree = countsArr.some(count => count >= 3);
        const hasTwo = countsArr.filter(count => count >= 2).length >= 2;
        
        return hasThree && hasTwo;
    }

    // Флеш: 5 карт одной масти
    isFlush(cards) {
        const suits = {};
        cards.forEach(card => {
            suits[card.suit] = (suits[card.suit] || 0) + 1;
        });
        return Object.values(suits).some(count => count >= 5);
    }

    // Стрит: 5 последовательных карт
    isStraight(cards) {
        return this.findStraight(cards) !== false;
    }

    // Сет: 3 карты одного достоинства
    isThreeOfAKind(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        return Object.values(counts).some(count => count === 3);
    }

    // Две пары
    isTwoPairs(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        const pairs = Object.values(counts).filter(count => count === 2);
        return pairs.length >= 2;
    }

    // Одна пара с указанием достоинства
    isOnePair(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        
        for (let value in counts) {
            if (counts[value] === 2) {
                const rankNames = {
                    2: 'двоек', 3: 'троек', 4: 'четвёрок', 5: 'пятёрок',
                    6: 'шестёрок', 7: 'семёрок', 8: 'восьмёрок', 9: 'девяток',
                    10: 'десяток', 11: 'валетов', 12: 'дам', 13: 'королей', 14: 'тузов'
                };
                return `Пара ${rankNames[value]}`;
            }
        }
        return false;
    }

    // Вспомогательная функция для поиска стрита
    findStraight(cards) {
        // Убираем дубликаты и сортируем
        const uniqueValues = [...new Set(cards.map(card => card.value))].sort((a, b) => a - b);
        
        // Проверяем обычный стрит
        for (let i = 0; i <= uniqueValues.length - 5; i++) {
            if (uniqueValues[i + 4] - uniqueValues[i] === 4) {
                // Нашли стрит из 5 карт
                const straightCards = cards.filter(card => 
                    card.value >= uniqueValues[i] && card.value <= uniqueValues[i + 4]
                );
                return straightCards.slice(0, 5);
            }
        }
        
        // Проверяем стрит с тузом как 1 (A,2,3,4,5)
        if (uniqueValues.includes(14)) { // есть туз
            const lowStraight = [2, 3, 4, 5].every(val => uniqueValues.includes(val));
            if (lowStraight) {
                const straightCards = cards.filter(card => 
                    card.value === 14 || (card.value >= 2 && card.value <= 5)
                );
                return straightCards.slice(0, 5);
            }
        }
        
        return false;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new PokerCombinations();
});
