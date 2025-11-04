class PokerCombinations {
    constructor() {
        this.timeSlider = document.getElementById('timeSlider');
        this.timeValue = document.getElementById('timeValue');
        this.topCards = document.getElementById('topCards');
        this.bottomGroup1 = document.getElementById('bottomGroup1');
        this.bottomGroup2 = document.getElementById('bottomGroup2');
        this.answer = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettings = document.getElementById('closeSettings');
        this.decreaseSize = document.getElementById('decreaseSize');
        this.increaseSize = document.getElementById('increaseSize');
        this.sizeValue = document.getElementById('sizeValue');
        
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = [];
        this.cardSize = 100;
        this.answerShown = false;
        
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
        
        this.settingsBtn.addEventListener('click', () => {
            this.settingsModal.classList.add('show');
        });

        this.closeSettings.addEventListener('click', () => {
            this.settingsModal.classList.remove('show');
        });

        this.decreaseSize.addEventListener('click', () => {
            this.changeCardSize(-10);
        });

        this.increaseSize.addEventListener('click', () => {
            this.changeCardSize(10);
        });

        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.settingsModal.classList.remove('show');
            }
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
        
        let selectedCards;
        let attempts = 0;
        const maxAttempts = 3;

        do {
            attempts++;
            this.shuffleDeck();
            selectedCards = this.deck.slice(0, 7);
            
            const combination = this.detectCombination(selectedCards);
            const combinationRank = this.getCombinationRankFromName(combination);
            
            if (combinationRank >= 5) {
                break;
            }
            
            if (attempts === maxAttempts) {
                break;
            }
            
        } while (attempts < maxAttempts);

        this.displayCards(selectedCards);
        this.answerShown = false;
        this.startTimer();
    }
    
    getCombinationRankFromName(combinationName) {
        const rankMap = {
            "Флеш-рояль": 10,
            "Стрит-флеш": 9,
            "Каре": 8,
            "Фулл-хаус": 7,
            "Флеш": 6,
            "Стрит": 5,
            "Сет": 4,
            "Две пары": 3,
            "Пара двоек": 2, "Пара троек": 2, "Пара четвёрок": 2, "Пара пятёрок": 2,
            "Пара шестёрок": 2, "Пара семёрок": 2, "Пара восьмёрок": 2, "Пара девяток": 2,
            "Пара десяток": 2, "Пара валетов": 2, "Пара дам": 2, "Пара королей": 2, "Пара тузов": 2,
            "Нет игры": 1
        };
        
        return rankMap[combinationName] || 1;
    }
    
    displayCards(cards) {
        this.topCards.innerHTML = '';
        this.bottomGroup1.innerHTML = '';
        this.bottomGroup2.innerHTML = '';
        
        for (let i = 0; i < 2; i++) {
            const card = this.createCardElement(cards[i]);
            this.topCards.appendChild(card);
        }
        
        for (let i = 2; i < 5; i++) {
            const card = this.createCardElement(cards[i]);
            this.bottomGroup1.appendChild(card);
        }
        for (let i = 5; i < 7; i++) {
            const card = this.createCardElement(cards[i]);
            this.bottomGroup2.appendChild(card);
        }
        
        this.currentCards = cards;
        this.answer.classList.remove('show');
        this.answer.textContent = '';
        this.actionBtn.textContent = 'Покажи ответ';
        
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('inactive');
        });
        
        this.applyCardSize();
    }
    
    createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
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
            if (!this.answerShown) {
                this.flipCards();
            }
        }, time);
    }
    
    flipCards() {
        if (!this.answerShown) {
            const allCards = document.querySelectorAll('.card');
            allCards.forEach(card => {
                card.classList.add('back');
                card.classList.remove('inactive');
            });
        }
    }
    
    showCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('back');
        });
    }
    
    handleActionButton() {
        if (this.actionBtn.textContent === 'Покажи ответ') {
            this.answerShown = true;
            clearTimeout(this.timer);
            this.showCardsWithHighlight();
            const combination = this.detectCombination(this.currentCards);
            this.answer.textContent = combination;
            this.answer.classList.add('show');
            this.actionBtn.textContent = 'Следующий пример';
        } else {
            this.answerShown = false;
            clearTimeout(this.timer);
            this.generateNewExample();
        }
    }
    
    // ИСПРАВЛЕННАЯ ФУНКЦИЯ - находит именно лучшие 5 карт для комбинации
    findUsedCardsInHand(cards) {
        const numericCards = cards.map(card => this.convertToNumeric(card));
        
        // Находим лучшую комбинацию из 5 карт
        const bestCombination = this.findBestCombinationCards(numericCards);
        
        // Возвращаем только карты, входящие в лучшую комбинацию
        return bestCombination;
    }
    
    // Вспомогательная функция для конвертации
    convertToNumeric(card) {
        const rank = card.rank;
        let value;
        if (rank === 'A') value = 14;
        else if (rank === 'K') value = 13;
        else if (rank === 'Q') value = 12;
        else if (rank === 'J') value = 11;
        else value = parseInt(rank);
        
        return { value, suit: card.suit, rank: card.rank, original: card };
    }
    
    showCardsWithHighlight() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('back');
            card.classList.remove('inactive');
        });
        
        const usedCards = this.findUsedCardsInHand(this.currentCards);
        
        allCards.forEach(card => {
            card.classList.add('inactive');
        });
        
        usedCards.forEach(usedCard => {
            allCards.forEach(displayCard => {
                const displayRank = displayCard.querySelector('.card-rank').textContent;
                const displaySuit = this.getSuitFromSymbol(displayCard.querySelector('.card-suit').textContent);
                
                if (displayRank === usedCard.rank && displaySuit === usedCard.suit) {
                    displayCard.classList.remove('inactive');
                }
            });
        });
    }
    
    getSuitFromSymbol(symbol) {
        const suitMap = {
            '♥': 'hearts',
            '♦': 'diamonds', 
            '♣': 'clubs',
            '♠': 'spades'
        };
        return suitMap[symbol] || '';
    }
    
    // ИСПРАВЛЕННАЯ ФУНКЦИЯ - находит именно лучшие 5 карт
    findBestCombinationCards(cards) {
        const combinations = this.getAllCombinations(cards);
        let bestCombination = [];
        let bestRank = 0;
        let bestHighCard = 0;

        combinations.forEach(comb => {
            const rank = this.getCombinationRank(comb);
            const highCard = this.getHighCardValue(comb);
            
            if (rank > bestRank || (rank === bestRank && highCard > bestHighCard)) {
                bestRank = rank;
                bestHighCard = highCard;
                bestCombination = comb;
            }
        });

        return bestCombination;
    }
    
    // Вспомогательная функция для определения старшей карты в комбинации
    getHighCardValue(cards) {
        const sorted = [...cards].sort((a, b) => b.value - a.value);
        return sorted[0].value;
    }
    
    changeCardSize(delta) {
        this.cardSize = Math.max(60, Math.min(140, this.cardSize + delta));
        this.sizeValue.textContent = this.cardSize + '%';
        this.applyCardSize();
    }
    
    applyCardSize() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.transform = `scale(${this.cardSize / 100})`;
        });
    }
    
    getRankValue(rank) {
        if (rank === 'A') return 14;
        if (rank === 'K') return 13;
        if (rank === 'Q') return 12;
        if (rank === 'J') return 11;
        return parseInt(rank);
    }

    // === КОМБИНАЦИИ ДЕТЕКТОР ===
    detectCombination(cards) {
        const numericCards = cards.map(card => this.convertToNumeric(card));
        return this.findBestCombination(numericCards);
    }

    findBestCombination(cards) {
        const combinations = this.getAllCombinations(cards);
        let bestCombination = "Нет игры";
        let bestRank = 0;
        let bestHighCard = 0;

        combinations.forEach(comb => {
            const rank = this.getCombinationRank(comb);
            const highCard = this.getHighCardValue(comb);
            
            if (rank > bestRank || (rank === bestRank && highCard > bestHighCard)) {
                bestRank = rank;
                bestHighCard = highCard;
                bestCombination = this.getCombinationName(comb);
            }
        });

        return bestCombination;
    }

    getAllCombinations(cards) {
        const combinations = [];
        
        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                const combination = cards.filter((_, index) => index !== i && index !== j);
                combinations.push(combination);
            }
        }
        
        return combinations;
    }

    getCombinationRank(cards) {
        if (this.isRoyalFlush(cards)) return 10;
        if (this.isStraightFlush(cards)) return 9;
        if (this.isFourOfAKind(cards)) return 8;
        if (this.isFullHouse(cards)) return 7;
        if (this.isFlush(cards)) return 6;
        if (this.isStraight(cards)) return 5;
        if (this.isThreeOfAKind(cards)) return 4;
        if (this.isTwoPairs(cards)) return 3;
        if (this.isOnePair(cards)) return 2;
        return 1;
    }

    getCombinationName(cards) {
        if (this.isRoyalFlush(cards)) return "Флеш-рояль";
        if (this.isStraightFlush(cards)) return "Стрит-флеш";
        if (this.isFourOfAKind(cards)) return "Каре";
        if (this.isFullHouse(cards)) return "Фулл-хаус";
        if (this.isFlush(cards)) return "Флеш";
        if (this.isStraight(cards)) return "Стрит";
        if (this.isThreeOfAKind(cards)) return "Сет";
        if (this.isTwoPairs(cards)) return "Две пары";
        
        const onePair = this.isOnePair(cards);
        if (onePair) return onePair;
        
        return "Нет игры";
    }

    // ИСПРАВЛЕННЫЕ ФУНКЦИИ ОПРЕДЕЛЕНИЯ КОМБИНАЦИЙ
    isRoyalFlush(cards) {
        const straightFlush = this.isStraightFlush(cards);
        if (!straightFlush) return false;
        
        const values = straightFlush.map(card => card.value).sort((a, b) => a - b);
        return values[0] === 10 && values[4] === 14;
    }

    isStraightFlush(cards) {
        // Группируем по мастям и ищем стрит в каждой масти
        const suits = {};
        cards.forEach(card => {
            if (!suits[card.suit]) suits[card.suit] = [];
            suits[card.suit].push(card);
        });
        
        for (let suit in suits) {
            if (suits[suit].length >= 5) {
                const straight = this.findBestStraight(suits[suit]);
                if (straight) return straight;
            }
        }
        return false;
    }

    isFourOfAKind(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        return Object.values(counts).some(count => count === 4);
    }

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

    isFlush(cards) {
        // Ищем лучший флеш (5 старших карт одной масти)
        return this.findBestFlush(cards) !== false;
    }

    isStraight(cards) {
        // Ищем лучший стрит (самый старший)
        return this.findBestStraight(cards) !== false;
    }

    isThreeOfAKind(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        return Object.values(counts).some(count => count === 3);
    }

    isTwoPairs(cards) {
        const values = cards.map(card => card.value);
        const counts = {};
        values.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });
        const pairs = Object.values(counts).filter(count => count === 2);
        return pairs.length >= 2;
    }

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

    // НОВАЯ ФУНКЦИЯ - находит лучший флеш (5 старших карт одной масти)
    findBestFlush(cards) {
        const suits = {};
        cards.forEach(card => {
            if (!suits[card.suit]) suits[card.suit] = [];
            suits[card.suit].push(card);
        });
        
        let bestFlush = null;
        
        for (let suit in suits) {
            if (suits[suit].length >= 5) {
                // Сортируем карты масти по убыванию и берем 5 старших
                const flushCards = suits[suit].sort((a, b) => b.value - a.value).slice(0, 5);
                
                if (!bestFlush || this.getHighCardValue(flushCards) > this.getHighCardValue(bestFlush)) {
                    bestFlush = flushCards;
                }
            }
        }
        
        return bestFlush || false;
    }

    // НОВАЯ ФУНКЦИЯ - находит лучший стрит (самый старший)
    findBestStraight(cards) {
        const uniqueValues = [...new Set(cards.map(card => card.value))].sort((a, b) => a - b);
        let bestStraight = null;
        
        // Проверяем обычные стриты
        for (let i = uniqueValues.length - 1; i >= 4; i--) {
            if (uniqueValues[i] - uniqueValues[i-4] === 4) {
                const straightValues = uniqueValues.slice(i-4, i+1);
                const straightCards = this.getCardsByValues(cards, straightValues);
                bestStraight = straightCards;
                break; // Нашли самый старший стрит
            }
        }
        
        // Проверяем стрит с тузом как 1 (A,2,3,4,5)
        if (!bestStraight && uniqueValues.includes(14)) {
            const lowStraightValues = [2, 3, 4, 5];
            if (lowStraightValues.every(val => uniqueValues.includes(val))) {
                const straightCards = this.getCardsByValues(cards, [14, 2, 3, 4, 5]);
                bestStraight = straightCards;
            }
        }
        
        return bestStraight || false;
    }

    // Вспомогательная функция для получения карт по значениям
    getCardsByValues(cards, values) {
        const result = [];
        const usedIndices = new Set();
        
        values.forEach(value => {
            for (let i = 0; i < cards.length; i++) {
                if (!usedIndices.has(i) && cards[i].value === value) {
                    result.push(cards[i]);
                    usedIndices.add(i);
                    break;
                }
            }
        });
        
        return result;
    }

    // Старая функция findStraight оставлена для обратной совместимости
    findStraight(cards) {
        return this.findBestStraight(cards);
    }
}
