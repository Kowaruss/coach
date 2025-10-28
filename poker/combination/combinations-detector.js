// Новые функции для поиска лучшей комбинации из 7 карт
PokerCombinations.prototype.detectCombination = function(cards) {
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
};

PokerCombinations.prototype.findBestCombination = function(cards) {
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
};

PokerCombinations.prototype.getAllCombinations = function(cards) {
    const combinations = [];
    
    // Генерируем все возможные комбинации по 5 карт из 7
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            const combination = cards.filter((_, index) => index !== i && index !== j);
            combinations.push(combination);
        }
    }
    
    return combinations;
};

PokerCombinations.prototype.getCombinationRank = function(cards) {
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
};

PokerCombinations.prototype.getCombinationName = function(cards) {
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
};

// СТАРЫЕ ФУНКЦИИ ОПРЕДЕЛЕНИЯ КОМБИНАЦИЙ
PokerCombinations.prototype.isRoyalFlush = function(cards) {
    const straightFlush = this.isStraightFlush(cards);
    if (!straightFlush) return false;
    
    const values = straightFlush.map(card => card.value).sort((a, b) => a - b);
    return values[0] === 10 && values[4] === 14;
};

PokerCombinations.prototype.isStraightFlush = function(cards) {
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
};

PokerCombinations.prototype.isFourOfAKind = function(cards) {
    const values = cards.map(card => card.value);
    const counts = {};
    values.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });
    return Object.values(counts).some(count => count === 4);
};

PokerCombinations.prototype.isFullHouse = function(cards) {
    const values = cards.map(card => card.value);
    const counts = {};
    values.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });
    
    const countsArr = Object.values(counts);
    const hasThree = countsArr.some(count => count >= 3);
    const hasTwo = countsArr.filter(count => count >= 2).length >= 2;
    
    return hasThree && hasTwo;
};

PokerCombinations.prototype.isFlush = function(cards) {
    const suits = {};
    cards.forEach(card => {
        suits[card.suit] = (suits[card.suit] || 0) + 1;
    });
    return Object.values(suits).some(count => count >= 5);
};

PokerCombinations.prototype.isStraight = function(cards) {
    return this.findStraight(cards) !== false;
};

PokerCombinations.prototype.isThreeOfAKind = function(cards) {
    const values = cards.map(card => card.value);
    const counts = {};
    values.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });
    return Object.values(counts).some(count => count === 3);
};

PokerCombinations.prototype.isTwoPairs = function(cards) {
    const values = cards.map(card => card.value);
    const counts = {};
    values.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });
    const pairs = Object.values(counts).filter(count => count === 2);
    return pairs.length >= 2;
};

PokerCombinations.prototype.isOnePair = function(cards) {
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
};

PokerCombinations.prototype.findStraight = function(cards) {
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
};
