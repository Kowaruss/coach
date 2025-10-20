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
};

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
