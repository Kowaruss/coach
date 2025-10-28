class PokerCombinations {
    constructor() {
        this.timeSlider = document.getElementById('timeSlider');
        this.timeValue = document.getElementById('timeValue');
        this.topCards = document.getElementById('topCards');
        this.bottomGroup1 = document.getElementById('bottomGroup1');
        this.bottomGroup2 = document.getElementById('bottomGroup2');
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
        
        const strategy = Math.random();
        let selectedCards = [];
        
        if (strategy < 0.25) {
            selectedCards = this.generateStraight();
        } else if (strategy < 0.45) {
            selectedCards = this.generateFlush();
        } else if (strategy < 0.55) {
            selectedCards = this.generateFullHouse();
        } else if (strategy < 0.60) {
            selectedCards = this.generateFourOfAKind();
        } else if (strategy < 0.70) {
            selectedCards = this.generateStraightFlush();
        } else if (strategy < 0.72) {
            selectedCards = this.generateRoyalFlush();
        } else if (strategy < 0.82) {
            selectedCards = this.generatePair();
        } else if (strategy < 0.92) {
            selectedCards = this.generateTwoPairs();
        } else {
            selectedCards = this.generateNoGame();
        }
        
        this.displayCards(selectedCards);
        this.startTimer();
    }
    
    displayCards(cards) {
        this.topCards.innerHTML = '';
        this.bottomGroup1.innerHTML = '';
        this.bottomGroup2.innerHTML = '';
        
        // Верхние 2 карты
        for (let i = 0; i < 2; i++) {
            const card = this.createCardElement(cards[i]);
            this.topCards.appendChild(card);
        }
        
        // Нижние 5 карт (3 + 2)
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
    
    getRankValue(rank) {
        if (rank === 'A') return 14;
        if (rank === 'K') return 13;
        if (rank === 'Q') return 12;
        if (rank === 'J') return 11;
        return parseInt(rank);
    }

    // === КОМБИНАЦИИ ДЕТЕКТОР ===
    detectCombination(cards) {
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
        
        // Ищем лучшую комбинацию из всех возможных 5 карт из 7
        return this.findBestCombination(numericCards);
    }

    findBestCombination(cards) {
        const combinations = this.getAllCombinations(cards);
        let bestCombination = "Нет игры";
        let bestRank = 0;

        combinations.forEach(comb => {
            const rank = this.getCombinationRank(comb);
            if (rank > bestRank) {
                bestRank = rank;
                bestCombination = this.getCombinationName(comb);
            }
        });

        return bestCombination;
    }

    getAllCombinations(cards) {
        const combinations = [];
        
        // Генерируем все возможные комбинации по 5 карт из 7
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
        return 1; // Нет игры
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

    // Основные функции определения комбинаций
    isRoyalFlush(cards) {
        const straightFlush = this.isStraightFlush(cards);
        if (!straightFlush) return false;
        
        const values = straightFlush.map(card => card.value).sort((a, b) => a - b);
        return values[0] === 10 && values[4] === 14;
    }

    isStraightFlush(cards) {
        const suits = {};
        cards.forEach(card => {
            if (!suits[card.suit]) suits[card.suit] = [];
            suits[card.suit].push(card);
        });
        
        for (let suit in suits) {
            if (suits[suit].length >= 5) {
                const straight = this.findStraight(suits[suit]);
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
        const suits = {};
        cards.forEach(card => {
            suits[card.suit] = (suits[card.suit] || 0) + 1;
        });
        return Object.values(suits).some(count => count >= 5);
    }

    isStraight(cards) {
        return this.findStraight(cards) !== false;
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

    findStraight(cards) {
        const uniqueValues = [...new Set(cards.map(card => card.value))].sort((a, b) => a - b);
        
        for (let i = 0; i <= uniqueValues.length - 5; i++) {
            if (uniqueValues[i + 4] - uniqueValues[i] === 4) {
                const straightCards = cards.filter(card => 
                    card.value >= uniqueValues[i] && card.value <= uniqueValues[i + 4]
                );
                return straightCards.slice(0, 5);
            }
        }
        
        if (uniqueValues.includes(14)) {
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

    // === ГЕНЕРАТОР КОМБИНАЦИЙ ===
    generateStraight() {
        const startRank = Math.floor(Math.random() * 9) + 2;
        const straightRanks = [];
        for (let i = 0; i < 5; i++) {
            straightRanks.push(startRank + i);
        }
        
        const straightCards = [];
        straightRanks.forEach(rank => {
            const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
            const rankStr = rank === 11 ? 'J' : rank === 12 ? 'Q' : rank === 13 ? 'K' : rank === 14 ? 'A' : rank.toString();
            straightCards.push({ rank: rankStr, suit });
        });
        
        const remainingDeck = this.deck.filter(card => 
            !straightCards.some(sc => sc.rank === card.rank && sc.suit === card.suit)
        );
        
        return [...straightCards, ...remainingDeck.slice(0, 2)];
    }

    generateFlush() {
        const flushSuit = this.suits[Math.floor(Math.random() * this.suits.length)];
        const flushCards = this.deck.filter(card => card.suit === flushSuit).slice(0, 5);
        
        const remainingDeck = this.deck.filter(card => 
            !flushCards.some(fc => fc.rank === card.rank && fc.suit === card.suit)
        );
        
        return [...flushCards, ...remainingDeck.slice(0, 2)];
    }

    generateFullHouse() {
        const tripleRank = Math.floor(Math.random() * 13) + 2;
        let pairRank = Math.floor(Math.random() * 13) + 2;
        while (pairRank === tripleRank) {
            pairRank = Math.floor(Math.random() * 13) + 2;
        }
        
        const tripleCards = this.deck.filter(card => {
            const rankValue = this.getRankValue(card.rank);
            return rankValue === tripleRank;
        }).slice(0, 3);
        
        const pairCards = this.deck.filter(card => {
            const rankValue = this.getRankValue(card.rank);
            return rankValue === pairRank;
        }).slice(0, 2);
        
        const remainingDeck = this.deck.filter(card => 
            ![...tripleCards, ...pairCards].some(fc => fc.rank === card.rank && fc.suit === card.suit)
        );
        
        return [...tripleCards, ...pairCards, ...remainingDeck.slice(0, 2)];
    }

    generateFourOfAKind() {
        const fourRank = Math.floor(Math.random() * 13) + 2;
        const fourCards = this.deck.filter(card => {
            const rankValue = this.getRankValue(card.rank);
            return rankValue === fourRank;
        }).slice(0, 4);
        
        const remainingDeck = this.deck.filter(card => 
            !fourCards.some(fc => fc.rank === card.rank && fc.suit === card.suit)
        );
        
        return [...fourCards, ...remainingDeck.slice(0, 3)];
    }

    generateStraightFlush() {
        const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
        const startRank = Math.floor(Math.random() * 9) + 2;
        
        const straightFlushCards = [];
        for (let i = 0; i < 5; i++) {
            const rank = startRank + i;
            const rankStr = rank === 11 ? 'J' : rank === 12 ? 'Q' : rank === 13 ? 'K' : rank === 14 ? 'A' : rank.toString();
            straightFlushCards.push({ rank: rankStr, suit });
        }
        
        const remainingDeck = this.deck.filter(card => 
            !straightFlushCards.some(sfc => sfc.rank === card.rank && sfc.suit === card.suit)
        );
        
        return [...straightFlushCards, ...remainingDeck.slice(0, 2)];
    }

    generateRoyalFlush() {
        const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
        const royalFlushCards = [
            { rank: '10', suit },
            { rank: 'J', suit },
            { rank: 'Q', suit },
            { rank: 'K', suit },
            { rank: 'A', suit }
        ];
        
        const remainingDeck = this.deck.filter(card => 
            !royalFlushCards.some(rfc => rfc.rank === card.rank && rfc.suit === card.suit)
        );
        
        return [...royalFlushCards, ...remainingDeck.slice(0, 2)];
    }

    generatePair() {
        const pairRank = Math.floor(Math.random() * 13) + 2;
        const pairCards = this.deck.filter(card => {
            const rankValue = this.getRankValue(card.rank);
            return rankValue === pairRank;
        }).slice(0, 2);
        
        const remainingDeck = this.deck.filter(card => 
            !pairCards.some(pc => pc.rank === card.rank && pc.suit === card.suit)
        );
        
        return [...pairCards, ...remainingDeck.slice(0, 5)];
    }

    generateTwoPairs() {
        const pair1Rank = Math.floor(Math.random() * 13) + 2;
        let pair2Rank = Math.floor(Math.random() * 13) + 2;
        while (pair2Rank === pair1Rank) {
            pair2Rank = Math.floor(Math.random() * 13) + 2;
        }
        
        const pair1Cards = this.deck.filter(card => {
            const rankValue = this.getRankValue(card.rank);
            return rankValue === pair1Rank;
        }).slice(0, 2);
        
        const pair2Cards = this.deck.filter(card => {
            const rankValue = this.getRankValue(card.rank);
            return rankValue === pair2Rank;
        }).slice(0, 2);
        
        const remainingDeck = this.deck.filter(card => 
            ![...pair1Cards, ...pair2Cards].some(pc => pc.rank === card.rank && pc.suit === card.suit)
        );
        
        return [...pair1Cards, ...pair2Cards, ...remainingDeck.slice(0, 3)];
    }

    generateNoGame() {
        const highCards = this.deck.filter(card => {
            const rank = card.rank;
            return rank === 'A' || rank === 'K' || rank === 'Q' || rank === 'J' || rank === '10';
        }).slice(0, 7);
        
        return highCards.length === 7 ? highCards : this.deck.slice(0, 7);
    }
}
